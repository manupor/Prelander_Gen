'use client'

import { useState, useEffect, useRef } from 'react'
import { Pencil, Check, X } from 'lucide-react'

interface EditableField {
  id: string
  label: string
  value: string | number
  type: 'text' | 'number'
  x: number
  y: number
  width: number
  height: number
}

interface InlineEditorProps {
  iframeRef: React.RefObject<HTMLIFrameElement | null>
  onUpdate: (fieldId: string, value: string | number) => void
  fields: {
    headline: string
    gameBalance: number
    popupTitle: string
    popupMessage: string
    popupPrize: string
  }
}

export function InlineEditor({ iframeRef, onUpdate, fields }: InlineEditorProps) {
  const [editableFields, setEditableFields] = useState<EditableField[]>([])
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>('')
  const [iframeScale, setIframeScale] = useState(1)
  const inputRef = useRef<HTMLInputElement>(null)

  // Detectar elementos editables en el iframe
  useEffect(() => {
    const detectEditableElements = () => {
      const iframe = iframeRef.current
      if (!iframe || !iframe.contentWindow) return

      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
        if (!iframeDoc) return

        const iframeRect = iframe.getBoundingClientRect()
        const fields: EditableField[] = []

        // Detectar Game Title/Headline
        const headlineSelectors = [
          'h1:not([style*="display: none"])',
          'h2:not([style*="display: none"])',
          '[data-editable="headline"]',
          '.headline',
          '.game-title'
        ]
        
        for (const selector of headlineSelectors) {
          const element = iframeDoc.querySelector(selector)
          if (element && element.textContent?.trim()) {
            const rect = element.getBoundingClientRect()
            fields.push({
              id: 'headline',
              label: 'Game Title',
              value: element.textContent.trim(),
              type: 'text',
              x: iframeRect.left + rect.left,
              y: iframeRect.top + rect.top,
              width: rect.width,
              height: rect.height
            })
            break
          }
        }

        // Detectar Balance
        const balanceElements = iframeDoc.querySelectorAll('*')
        balanceElements.forEach(el => {
          const text = el.textContent?.trim() || ''
          // Buscar patrones de balance: "$1,000", "1000", "BALANCE: $1,000"
          if ((text.includes('BALANCE') || text.includes('$')) && 
              text.match(/[\$€£]?\s?\d{1,3}(,\d{3})*(\.\d{2})?/) &&
              el.children.length === 0) {
            const rect = el.getBoundingClientRect()
            if (rect.width > 0 && rect.height > 0) {
              // Extract numeric value from text
              const numMatch = text.match(/\d{1,3}(,\d{3})*(\.\d{2})?/)
              const numericValue = numMatch ? parseInt(numMatch[0].replace(/,/g, '')) : 1000
              
              fields.push({
                id: 'gameBalance',
                label: 'Game Balance',
                value: numericValue,
                type: 'number',
                x: iframeRect.left + rect.left,
                y: iframeRect.top + rect.top,
                width: rect.width,
                height: rect.height
              })
            }
          }
        })

        setEditableFields(fields)
      } catch (error) {
        console.log('Could not access iframe content (CORS):', error)
      }
    }

    // Detectar después de que el iframe cargue
    const iframe = iframeRef.current
    if (iframe) {
      iframe.addEventListener('load', detectEditableElements)
      detectEditableElements()
    }

    // Redetectar cuando cambian los fields
    const timer = setTimeout(detectEditableElements, 500)

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', detectEditableElements)
      }
      clearTimeout(timer)
    }
  }, [iframeRef, fields])

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
    <div className="absolute inset-0 pointer-events-none z-10">
      {editableFields.map((field) => (
        <div
          key={field.id}
          className="absolute pointer-events-auto"
          style={{
            left: field.x,
            top: field.y,
            width: field.width,
            height: field.height,
          }}
        >
          {editingField === field.id ? (
            // Editing Mode
            <div className="relative w-full h-full">
              <div className="absolute -inset-2 bg-blue-500/20 border-2 border-blue-500 rounded-lg animate-pulse" />
              <div className="absolute -top-20 left-0 right-0 z-50">
                <div className="bg-gray-900 border border-blue-500 rounded-lg p-3 shadow-2xl">
                  <label className="block text-xs font-semibold text-blue-400 mb-2">
                    {field.label}
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
                      title="Save"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                      title="Cancel"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Press Enter to save, Esc to cancel
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // View Mode with Edit Button
            <button
              onClick={() => handleEdit(field)}
              className="absolute -right-8 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-110 group"
              title={`Edit ${field.label}`}
              data-tour={field.id === 'headline' ? 'inline-edit-headline' : undefined}
            >
              <Pencil size={14} />
              <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Edit {field.label}
              </span>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
