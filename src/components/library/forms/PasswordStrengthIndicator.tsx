import React, { useState } from 'react'
import { Check, X, Eye, EyeSlash, LockKey } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

export interface PasswordStrengthIndicatorProps {
  className?: string
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ className }) => {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const hasLength = password.length >= 8
  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)

  const score = [hasLength, hasUpper, hasNumber, hasSpecial].filter(Boolean).length

  const strengthLabels = ['Empty', 'Weak', 'Moderate', 'Strong', 'Cryptographic']
  const strengthColors = ['bg-zinc-800', 'bg-rose-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500']

  return (
    <div className={cn('w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-950 p-5 font-mono text-xs text-white shadow-2xl', className)}>
      <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-white/5 mb-3">
        <span className="text-[10px] uppercase tracking-widest">SECURITY TELEMETRY</span>
        <span className="text-zinc-500 text-[10px]">ENTROPY METER</span>
      </div>

      <div className="relative flex items-center">
        <LockKey size={16} className="absolute left-3 text-zinc-500" />
        <input
          type={show ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter secret token..."
          className="w-full rounded-xl border border-white/10 bg-zinc-900/80 py-2.5 pl-9 pr-10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white/30"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 text-zinc-400 hover:text-white"
        >
          {show ? <EyeSlash size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {/* Strength Bars */}
      <div className="mt-3 flex gap-1.5 h-1.5 w-full">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className={`h-full flex-1 rounded-full transition-all duration-300 ${
              score > idx ? strengthColors[score] : 'bg-zinc-800'
            }`}
          />
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px]">
        <span className="text-zinc-500">Security Strength:</span>
        <span className={score === 4 ? 'text-emerald-400 font-bold' : 'text-zinc-300'}>
          {strengthLabels[score]}
        </span>
      </div>

      {/* Rules Grid */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">
        <div className={`flex items-center gap-1.5 ${hasLength ? 'text-emerald-400' : 'text-zinc-500'}`}>
          {hasLength ? <Check size={12} weight="bold" /> : <X size={12} />}
          <span>8+ Characters</span>
        </div>
        <div className={`flex items-center gap-1.5 ${hasUpper ? 'text-emerald-400' : 'text-zinc-500'}`}>
          {hasUpper ? <Check size={12} weight="bold" /> : <X size={12} />}
          <span>Uppercase [A-Z]</span>
        </div>
        <div className={`flex items-center gap-1.5 ${hasNumber ? 'text-emerald-400' : 'text-zinc-500'}`}>
          {hasNumber ? <Check size={12} weight="bold" /> : <X size={12} />}
          <span>Numeric [0-9]</span>
        </div>
        <div className={`flex items-center gap-1.5 ${hasSpecial ? 'text-emerald-400' : 'text-zinc-500'}`}>
          {hasSpecial ? <Check size={12} weight="bold" /> : <X size={12} />}
          <span>Symbol [!@#]</span>
        </div>
      </div>
    </div>
  )
}
