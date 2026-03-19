"use client"

import { Upload, CheckCircle2, X } from "lucide-react"
import { useRef, useState } from "react"

interface SimpleFileUploadProps {
  id: string
  label: string
  file: File | null
  onFileChange: (file: File | null) => void
  accept?: string
  required?: boolean
}

export function SimpleFileUpload({ 
  id, 
  label, 
  file, 
  onFileChange, 
  accept = ".jpg,.jpeg,.png,.pdf",
  required = true 
}: SimpleFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('📁 File input changed:', e.target.files)
    const selectedFile = e.target.files?.[0] || null
    if (selectedFile) {
      console.log('✅ File selected:', selectedFile.name)
    }
    onFileChange(selectedFile)
    // Reset input
    e.target.value = ''
  }

  const handleButtonClick = () => {
    console.log('🖱️ Button clicked, triggering file input')
    inputRef.current?.click()
  }

  const handleRemove = () => {
    onFileChange(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      console.log('📁 File dropped:', droppedFile.name)
      onFileChange(droppedFile)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        key={`file-input-${id}`} // Force re-render to avoid HMR issues
      />

      {!file ? (
        <div 
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all bg-white ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className={`w-12 h-12 mx-auto mb-3 transition-colors ${
            isDragging ? 'text-blue-600' : 'text-gray-400'
          }`} />
          <p className="text-sm font-medium text-gray-700 mb-3">
            {isDragging ? 'Lepaskan file di sini...' : 'Pilih file dari device Anda'}
          </p>
          
          {/* Click button to trigger file input */}
          <button
            type="button"
            onClick={handleButtonClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Pilih File
          </button>
          
          <p className="text-xs text-gray-500 mt-3">
            Format: JPG, PNG, PDF (Max 5MB)
          </p>
          <p className="text-xs text-blue-600">
            Atau drag & drop file ke area ini
          </p>
        </div>
      ) : (
        <div className="border-2 border-green-500 bg-green-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1 hover:bg-red-50 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}