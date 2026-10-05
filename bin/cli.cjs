#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')
const readline = require('readline')

const REGISTRY_HOST = 'https://cooki-ui.vercel.app'
const VERSION = '1.0.0'

// Utility: HTTP GET helper that follows redirects
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http
    client.get(url, { headers: { 'User-Agent': 'Cooki-UI-CLI/' + VERSION } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location))
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP status ${res.statusCode} for ${url}`))
      }
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => resolve(data))
    }).on('error', reject)
  })
}

// Utility: get registry items (local file if inside repo, remote otherwise)
async function getRegistryManifest() {
  const localRegistry = path.resolve(__dirname, '..', 'registry.json')
  if (fs.existsSync(localRegistry)) {
    try {
      return JSON.parse(fs.readFileSync(localRegistry, 'utf8'))
    } catch (_) {}
  }
  const jsonStr = await fetchUrl(`${REGISTRY_HOST}/registry.json`)
  return JSON.parse(jsonStr)
}

// Utility: get component item
async function getComponentData(slug) {
  const localItem = path.resolve(__dirname, '..', 'public', 'r', `${slug}.json`)
  if (fs.existsSync(localItem)) {
    try {
      return JSON.parse(fs.readFileSync(localItem, 'utf8'))
    } catch (_) {}
  }
  const jsonStr = await fetchUrl(`${REGISTRY_HOST}/r/${slug}.json`)
  return JSON.parse(jsonStr)
}

// ---------------------------------------------------------------------------
// CLI COMMANDS
// ---------------------------------------------------------------------------

async function cmdList(categoryFilter) {
  try {
    const manifest = await getRegistryManifest()
    let items = manifest.items || []
    if (categoryFilter) {
      items = items.filter(i => (i.category || '').toLowerCase() === categoryFilter.toLowerCase())
    }
    console.log(`\nCooki UI Components (${items.length} available):\n`)
    items.forEach(item => {
      console.log(`  • \x1b[36m${item.name.padEnd(32)}\x1b[0m [${item.category || 'general'}] ${item.title}`)
      if (item.description) {
        console.log(`    \x1b[90m${item.description}\x1b[0m`)
      }
    })
    console.log(`\nTo install a component, run: \x1b[32mnpx cooki-ui add <name>\x1b[0m\n`)
  } catch (err) {
    console.error('Error fetching component list:', err.message)
    process.exit(1)
  }
}

async function cmdAdd(slug, customTarget) {
  if (!slug) {
    console.error('Error: Please specify a component name. Example: npx cooki-ui add magnetic-button')
    process.exit(1)
  }

  try {
    console.log(`Fetching component \x1b[36m${slug}\x1b[0m from Cooki UI registry...`)
    const data = await getComponentData(slug)

    if (!data.files || data.files.length === 0) {
      console.error(`Error: No files found for component "${slug}"`)
      process.exit(1)
    }

    const file = data.files[0]
    const targetFile = customTarget || file.target || path.join('components', 'ui', `${slug}.tsx`)
    const targetDir = path.dirname(targetFile)

    fs.mkdirSync(targetDir, { recursive: true })
    fs.writeFileSync(targetFile, file.content, 'utf8')

    console.log(`\x1b[32m✔ Created ${targetFile}\x1b[0m`)

    if (data.dependencies && data.dependencies.length > 0) {
      console.log(`\n\x1b[33mRequired dependencies:\x1b[0m`)
      console.log(`  npm install ${data.dependencies.join(' ')}`)
      console.log(`  # or: pnpm add ${data.dependencies.join(' ')}`)
      console.log(`  # or: bun add ${data.dependencies.join(' ')}\n`)
    }

    console.log(`\x1b[90mEnsure you have the @/lib/utils cn() helper configured.\x1b[0m\n`)
  } catch (err) {
    console.error(`Error installing "${slug}":`, err.message)
    process.exit(1)
  }
}

// ---------------------------------------------------------------------------
// MODEL CONTEXT PROTOCOL (MCP) SERVER OVER STDIO
// ---------------------------------------------------------------------------

function startMcpServer() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })

  function sendResponse(response) {
    const json = JSON.stringify(response)
    process.stdout.write(json + '\n')
  }

  const TOOLS = [
    {
      name: 'list_components',
      description: 'List all available components in the Cooki UI registry with their category, title, and dependencies.',
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'Optional category filter (e.g. "buttons", "cards", "backgrounds", "navigation", "forms", "typography")'
          }
        }
      }
    },
    {
      name: 'search_components',
      description: 'Search for Cooki UI components by keyword, technology, or visual feature.',
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search term (e.g. "button", "spring", "particles", "glow", "card")'
          }
        },
        required: ['query']
      }
    },
    {
      name: 'get_component_source',
      description: 'Fetch the raw TypeScript/React source code for a specific Cooki UI component.',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The slug name of the component (e.g. "magnetic-button", "perspective-card-3d")'
          }
        },
        required: ['name']
      }
    },
    {
      name: 'get_component_dependencies',
      description: 'Get the list of npm dependencies required for a specific Cooki UI component.',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The slug name of the component'
          }
        },
        required: ['name']
      }
    },
    {
      name: 'install_component',
      description: 'Directly install a Cooki UI component into the current project repository under components/ui/.',
      inputSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The slug name of the component to install'
          },
          targetPath: {
            type: 'string',
            description: 'Optional destination file path (default: components/ui/<name>.tsx)'
          }
        },
        required: ['name']
      }
    }
  ]

  async function handleToolCall(toolName, args) {
    switch (toolName) {
      case 'list_components': {
        const manifest = await getRegistryManifest()
        let items = manifest.items || []
        if (args && args.category) {
          items = items.filter(i => (i.category || '').toLowerCase() === args.category.toLowerCase())
        }
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                items.map(i => ({
                  name: i.name,
                  title: i.title,
                  category: i.category,
                  description: i.description,
                  dependencies: i.dependencies
                })),
                null,
                2
              )
            }
          ]
        }
      }

      case 'search_components': {
        const q = (args?.query || '').toLowerCase()
        const manifest = await getRegistryManifest()
        const matched = (manifest.items || []).filter(item => {
          return (
            item.name.toLowerCase().includes(q) ||
            item.title.toLowerCase().includes(q) ||
            (item.description && item.description.toLowerCase().includes(q)) ||
            (item.category && item.category.toLowerCase().includes(q))
          )
        })
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(
                matched.map(i => ({
                  name: i.name,
                  title: i.title,
                  category: i.category,
                  description: i.description
                })),
                null,
                2
              )
            }
          ]
        }
      }

      case 'get_component_source': {
        const slug = args?.name
        if (!slug) throw new Error('Missing "name" argument')
        const data = await getComponentData(slug)
        const file = data.files && data.files[0]
        if (!file || !file.content) throw new Error(`Source content not found for ${slug}`)
        return {
          content: [
            {
              type: 'text',
              text: file.content
            }
          ]
        }
      }

      case 'get_component_dependencies': {
        const slug = args?.name
        if (!slug) throw new Error('Missing "name" argument')
        const data = await getComponentData(slug)
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(data.dependencies || [], null, 2)
            }
          ]
        }
      }

      case 'install_component': {
        const slug = args?.name
        if (!slug) throw new Error('Missing "name" argument')
        const data = await getComponentData(slug)
        const file = data.files && data.files[0]
        if (!file || !file.content) throw new Error(`Source content not found for ${slug}`)

        const targetFile = args?.targetPath || file.target || path.join('components', 'ui', `${slug}.tsx`)
        const targetDir = path.dirname(targetFile)

        fs.mkdirSync(targetDir, { recursive: true })
        fs.writeFileSync(targetFile, file.content, 'utf8')

        return {
          content: [
            {
              type: 'text',
              text: `Successfully installed "${slug}" into "${targetFile}".\nDependencies to install: ${(data.dependencies || []).join(' ') || 'none'}`
            }
          ]
        }
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`)
    }
  }

  rl.on('line', async (line) => {
    line = line.trim()
    if (!line || !line.startsWith('{')) return

    try {
      const msg = JSON.parse(line)
      const { id, method, params } = msg

      if (method === 'initialize') {
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            serverInfo: {
              name: 'cooki-ui',
              version: VERSION
            },
            capabilities: {
              tools: {}
            }
          }
        })
      } else if (method === 'notifications/initialized') {
        // Notification, no response required
      } else if (method === 'ping') {
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: {}
        })
      } else if (method === 'tools/list') {
        sendResponse({
          jsonrpc: '2.0',
          id,
          result: {
            tools: TOOLS
          }
        })
      } else if (method === 'tools/call') {
        try {
          const res = await handleToolCall(params.name, params.arguments)
          sendResponse({
            jsonrpc: '2.0',
            id,
            result: res
          })
        } catch (callErr) {
          sendResponse({
            jsonrpc: '2.0',
            id,
            error: {
              code: -32603,
              message: callErr.message
            }
          })
        }
      } else {
        // Unknown method
        if (id !== undefined) {
          sendResponse({
            jsonrpc: '2.0',
            id,
            error: {
              code: -32601,
              message: `Method not found: ${method}`
            }
          })
        }
      }
    } catch (parseErr) {
      // JSON parse error
    }
  })
}

// ---------------------------------------------------------------------------
// MAIN ENTRY POINT
// ---------------------------------------------------------------------------

function printHelp() {
  console.log(`
Cooki UI CLI — Source-First Component Library & MCP Server

Usage:
  npx cooki-ui <command> [options]

Commands:
  add <component> [target]    Install component source code into your project
  list [category]             List all available components in the registry
  mcp                         Start the Model Context Protocol (MCP) stdio server
  help                        Show this help message

Examples:
  npx cooki-ui add magnetic-button
  npx cooki-ui add perspective-card-3d
  npx cooki-ui list
  npx cooki-ui list buttons
  npx cooki-ui mcp

Learn more at: https://cooki-ui.vercel.app
`)
}

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'add':
      await cmdAdd(args[1], args[2])
      break
    case 'list':
      await cmdList(args[1])
      break
    case 'mcp':
      startMcpServer()
      break
    case 'help':
    case '--help':
    case '-h':
    case undefined:
      printHelp()
      break
    default:
      console.log(`Unknown command: ${command}`)
      printHelp()
      process.exit(1)
  }
}

main()
