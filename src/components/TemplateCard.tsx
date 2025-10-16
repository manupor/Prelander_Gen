import { BrandConfig, TemplateId } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

interface TemplateCardProps {
  id: TemplateId
  name: string
  description: string
  preview: string
  selected: boolean
  onSelect: (id: TemplateId) => void
  onPreview?: (id: TemplateId) => void
}

export function TemplateCard({ id, name, description, preview, selected, onSelect, onPreview }: TemplateCardProps) {
  return (
    <div
      className={`border-2 rounded-lg p-6 transition-all relative group ${
        selected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
        <img
          src={preview}
          alt={`${name} template preview`}
          className="w-full h-full object-cover"
        />
        {onPreview && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPreview(id)
            }}
            className="absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            title="Preview Template"
          >
            <Eye size={16} />
          </button>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex gap-2">
        <Button
          variant={selected ? 'default' : 'outline'}
          size="sm"
          className="flex-1"
          onClick={() => onSelect(id)}
        >
          {selected ? 'Selected' : 'Select Template'}
        </Button>
        {onPreview && (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onPreview(id)
            }}
            className="px-3"
          >
            <Eye size={16} />
          </Button>
        )}
      </div>
    </div>
  )
}
