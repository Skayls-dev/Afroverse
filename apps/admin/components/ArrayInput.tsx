'use client'

import { useState, KeyboardEvent } from 'react'

interface ArrayInputProps {
  name: string
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
  label?: string
}

export default function ArrayInput({ name, value, onChange, placeholder, label }: ArrayInputProps) {
  const [input, setInput] = useState('')

  function addTag(raw: string) {
    const tags = raw.split(',').map((t) => t.trim()).filter(Boolean)
    const next = [...value]
    for (const tag of tags) {
      if (!next.includes(tag)) next.push(tag)
    }
    onChange(next)
    setInput('')
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    }
  }

  function remove(tag: string) {
    onChange(value.filter((v) => v !== tag))
  }

  return (
    <div>
      {label && <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">{label}</p>}
      <input type="hidden" name={name} value={JSON.stringify(value)} />
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-2 focus-within:border-orange-500 transition-colors">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {value.map((tag) => (
            <span key={tag} className="flex items-center gap-1 bg-slate-700 text-slate-200 text-xs px-2 py-1 rounded-md">
              {tag}
              <button type="button" onClick={() => remove(tag)} className="text-slate-400 hover:text-red-400 transition-colors ml-0.5">
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => { if (input.trim()) addTag(input) }}
          placeholder={placeholder ?? 'Ajouter (Entrée ou virgule)'}
          className="w-full bg-transparent text-sm text-slate-200 placeholder-slate-600 outline-none"
        />
      </div>
    </div>
  )
}
