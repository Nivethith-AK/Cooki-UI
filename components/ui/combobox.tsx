"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MagnifyingGlass, CaretUpDown, Check } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface ComboboxContextValue<T = any> {
  items: readonly T[] | T[]
  value?: T
  selectedValue?: T
  query: string
  setQuery: (q: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  filteredItems: T[]
  selectItem: (item: T) => void
  containerRef: React.RefObject<HTMLDivElement | null>
  inputRef: React.RefObject<HTMLInputElement | null>
}

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null)

function useComboboxContext<T = any>() {
  const context = React.useContext(ComboboxContext)
  if (!context) {
    throw new Error("Combobox components must be used within a <Combobox /> provider")
  }
  return context as ComboboxContextValue<T>
}

export interface ComboboxProps<T = any> {
  items: readonly T[] | T[]
  value?: T
  defaultValue?: T
  onValueChange?: (value: T) => void
  filter?: (item: T, query: string) => boolean
  className?: string
  children: React.ReactNode
}

export function Combobox<T = any>({
  items,
  value: controlledValue,
  defaultValue,
  onValueChange,
  filter,
  className,
  children,
}: ComboboxProps<T>) {
  const [internalValue, setInternalValue] = React.useState<T | undefined>(defaultValue)
  const [query, setQuery] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const selectedValue = controlledValue !== undefined ? controlledValue : internalValue

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return items as T[]
    if (filter) {
      return (items as T[]).filter((item) => filter(item, query))
    }
    const lowerQuery = query.toLowerCase()
    return (items as T[]).filter((item) => {
      if (typeof item === "string") {
        return item.toLowerCase().includes(lowerQuery)
      }
      if (typeof item === "object" && item !== null) {
        return Object.values(item).some(
          (val) => typeof val === "string" && val.toLowerCase().includes(lowerQuery)
        )
      }
      return String(item).toLowerCase().includes(lowerQuery)
    })
  }, [items, query, filter])

  const selectItem = React.useCallback(
    (item: T) => {
      if (controlledValue === undefined) {
        setInternalValue(item)
      }
      onValueChange?.(item)
      setQuery("")
      setIsOpen(false)
    },
    [controlledValue, onValueChange]
  )

  // Close on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <ComboboxContext.Provider
      value={{
        items,
        value: controlledValue,
        selectedValue,
        query,
        setQuery,
        isOpen,
        setIsOpen,
        filteredItems,
        selectItem,
        containerRef,
        inputRef,
      }}
    >
      <div ref={containerRef} className={cn("relative w-full max-w-sm", isOpen && "z-30", className)}>
        {children}
       </div>
     </ComboboxContext.Provider>
  )
}

export interface ComboboxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string
}

export const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>(
  ({ className, wrapperClassName, placeholder = "Search...", ...props }, forwardedRef) => {
    const { query, setQuery, isOpen, setIsOpen, selectedValue, inputRef } = useComboboxContext()

    React.useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement)

    const displayValue = isOpen
      ? query
      : query || (selectedValue ? String(selectedValue) : "")

    const effectivePlaceholder = (selectedValue && isOpen) ? String(selectedValue) : placeholder

    return (
      <div
        className={cn(
          "relative flex items-center rounded-xl border border-zinc-200/90 dark:border-white/10 bg-white/90 dark:bg-zinc-900/90 shadow-xs backdrop-blur-md transition-all duration-200 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20",
          wrapperClassName
        )}
        onClick={() => {
          inputRef.current?.focus()
          setIsOpen(true)
        }}
      >
        <MagnifyingGlass
          size={16}
          weight="bold"
          className="ml-3.5 shrink-0 text-zinc-400 dark:text-zinc-500"
        />
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          placeholder={effectivePlaceholder}
          onChange={(e) => {
            setQuery(e.target.value)
            if (!isOpen) setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsOpen(false)
            }
          }}
          className={cn(
            "w-full bg-transparent px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-white dark:placeholder:text-zinc-500",
            className
          )}
          {...props}
        />
        <CaretUpDown
          size={16}
          weight="bold"
          className={cn(
            "mr-3 shrink-0 text-zinc-400 transition-transform duration-200 dark:text-zinc-500 cursor-pointer",
            isOpen && "rotate-180 text-zinc-700 dark:text-zinc-300"
          )}
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
        />
      </div>
    )
  }
)
ComboboxInput.displayName = "ComboboxInput"

export interface ComboboxContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ComboboxContent({ className, children, ...props }: ComboboxContentProps) {
  const { isOpen } = useComboboxContext()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(
            "absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 p-1.5 shadow-xl backdrop-blur-xl",
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export interface ComboboxEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ComboboxEmpty({ className, children = "No items found.", ...props }: ComboboxEmptyProps) {
  const { filteredItems } = useComboboxContext()

  if (filteredItems.length > 0) return null

  return (
    <div
      className={cn(
        "py-6 text-center text-xs font-mono text-zinc-400 dark:text-zinc-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface ComboboxListProps<T = any>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  children?: React.ReactNode | ((item: T, index: number) => React.ReactNode)
}

export function ComboboxList<T = any>({
  className,
  children,
  ...props
}: ComboboxListProps<T>) {
  const { filteredItems } = useComboboxContext<T>()

  return (
    <div
      className={cn("max-h-56 overflow-y-auto overflow-x-hidden space-y-0.5 scrollbar-thin", className)}
      {...props}
    >
      {typeof children === "function"
        ? filteredItems.map((item, idx) => (children as (item: T, index: number) => React.ReactNode)(item, idx))
        : children}
    </div>
  )
}

export interface ComboboxItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: any
  disabled?: boolean
}

export function ComboboxItem({
  value,
  disabled = false,
  className,
  children,
  ...props
}: ComboboxItemProps) {
  const { selectedValue, selectItem } = useComboboxContext()

  const isSelected = selectedValue === value || String(selectedValue) === String(value)

  return (
    <div
      onClick={() => {
        if (!disabled) {
          selectItem(value)
        }
      }}
      className={cn(
        "group relative flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white select-none",
        isSelected && "bg-indigo-50 font-medium text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
        disabled && "pointer-events-none opacity-40",
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
      {isSelected && (
        <Check size={14} weight="bold" className="shrink-0 text-indigo-600 dark:text-indigo-400" />
      )}
    </div>
  )
}
