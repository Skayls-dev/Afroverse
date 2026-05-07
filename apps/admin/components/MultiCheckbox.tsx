'use client'

interface MultiCheckboxProps {
  name: string
  options: readonly string[]
  value: string[]
  onChange: (v: string[]) => void
  label?: string
}

export default function MultiCheckbox({ name, options, value, onChange, label }: MultiCheckboxProps) {
  function toggle(opt: string) {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt))
    } else {
      onChange([...value, opt])
    }
  }

  return (
    <div>
      {label && <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">{label}</p>}
      <input type="hidden" name={name} value={JSON.stringify(value)} />
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              value.includes(opt)
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
