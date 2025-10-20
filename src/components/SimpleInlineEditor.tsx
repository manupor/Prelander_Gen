'use client'

import { useState, useRef, useEffect } from 'react'
import { Pencil, Check, X } from 'lucide-react'

interface EditableField {
  id: string
  label: string
  value: string | number
  type: 'text' | 'number'
  icon: string
}

interface SimpleInlineEditorProps {
  onUpdate: (fieldId: string, value: string | number) => void
  fields: {
    headline: string
    gameBalance: number
    popupTitle: string
    popupMessage: string
    popupPrize: string
  }
}

export function SimpleInlineEditor({ onUpdate, fields }: SimpleInlineEditorProps) {
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const editableFields: EditableField[] = [
    {
      id: 'headline',
      label: 'Game Title',
      value: fields.headline,
      type: 'text',
      icon: '📝'
    },
    {
      id: 'gameBalance',
      label: 'Game Balance',
      value: fields.gameBalance,
      type: 'number',
      icon: '💰'
    },
    {
      id: 'popupTitle',
      label: 'Win Popup Title',
      value: fields.popupTitle,
      type: 'text',
      icon: '🎉'
    },
    {
      id: 'popupMessage',
      label: 'Win Popup Message',
      value: fields.popupMessage,
      type: 'text',
      icon: '💬'
    },
    {
      id: 'popupPrize',
      label: 'Prize Display',
      value: fields.popupPrize,
      type: 'text',
      icon: '🎁'
    }
  ]

  // Auto-focus input when editing starts
  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingField])

  const handleEdit = (field: EditableField) => {
    setEditingField(field.id)
    setEditValue(field.value.toString())
  }

  const handleSave = () => {
    if (editingField) {
      const field = editableFields.find(f => f.id === editingField)
      if (field) {
        const value = field.type === 'number' ? parseInt(editValue) || 0 : editValue
        onUpdate(editingField, value)
      }
      setEditingField(null)
      setEditValue('')
    }
  }

  const handleCancel = () => {
    setEditingField(null)
    setEditValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
      {editableFields.map((field) => (
        <div key={field.id} className="relative">
          {editingField === field.id ? (
            // Editing Mode
            <div className="bg-gray-900 border-2 border-blue-500 rounded-lg p-4 shadow-2xl min-w-[300px]">
              <label className="block text-xs font-semibold text-blue-400 mb-2">
                {field.icon} {field.label}
              </label>
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type={field.type}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
                <button
                  onClick={handleSave}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                  title="Save (Enter)"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                  title="Cancel (Esc)"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Press Enter to save, Esc to cancel
              </p>
            </div>
          ) : (
            // View Mode with Edit Button
            <button
              onClick={() => handleEdit(field)}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all hover:scale-105 group min-w-[200px]"
              title={`Edit ${field.label}`}
              data-tour={field.id === 'headline' ? 'inline-edit-headline' : undefined}
            >
              <Pencil size={16} className="flex-shrink-0" />
              <div className="flex-1 text-left">
                <div className="text-xs font-semibold">{field.icon} {field.label}</div>
                <div className="text-xs opacity-75 truncate">{field.value}</div>
              </div>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
