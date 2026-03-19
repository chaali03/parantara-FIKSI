"use client"

import { Upload, CheckCircle2, X } from "lucide-react"
import { useRef, useState, useCallback } from "react"

interface RobustFileUploadProps {
  id: string
  label: string
  file: File | null
  onFileChange: (file: File | null) => void
  accept?: string
  required?: boolean
}

export function RobustFileUpload({ 
  id, 
  label, 
  file, 
  onFileChange, 
  accept = ".jpg,.jpeg,.png,.pdf",
  required = true 
}: RobustFileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [key, setKey] = useState(0) // Force re-render key

  // Use useCallback to prevent function recreation on every render
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('📁 File input changed:', e.target.files)
    const selectedFile = e.target.files?.[0] || null
    if (selectedFile) {
      console.log('✅ File selected:', selectedFile.name)
    }
    onFileChange(selectedFile)
    // Reset input and force re-render
    e.target.value = ''
    setKey(prev => prev + 1)
  }, [onFileChange])

  // Multiple strategies to trigger file input
  const triggerFileInput = useCallback(() => {
    console.log('🖱️ Triggering file input...')
    
    // Strategy 1: Direct click
    if (inputRef.current) {
      inputRef.current.click()
      return
    }
    
    // Strategy 2: Create new input if ref is null
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept
    input.style.display = 'none'
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement
      const selectedFile = target.files?.[0] || null
      if (selectedFile) {
        console.log('✅ File selected via fallback:', selectedFile.name)
        onFileChange(selectedFile)
      }
      document.body.removeChild(input)
    }
    document.body.appendChild(input)
    input.click()
  }, [accept, onFileChange])

  const handleRemove = useCallback(() => {
    onFileChange(null)
    setKey(prev => prev + 1)
  }, [onFileChange])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      console.log('📁 File dropped:', droppedFile.name)
      onFileChange(droppedFile)
    }
  }, [onFileChange])

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Hidden file input with key to force re-render */}
      <input
        key={`file-input-${id}-${key}`}
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {!file ? (
        <div 
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all bg-white cursor-pointer ${
            isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-500'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <Upload className={`w-12 h-12 mx-auto mb-3 transition-colors ${
            isDragging ? 'text-blue-600' : 'text-gray-400'
          }`} />
          <p className="text-sm font-medium text-gray-700 mb-3">
            {isDragging ? 'Lepaskan file di sini...' : 'Klik untuk pilih file dari device'}
          </p>
          
          {/* Additional button for extra reliability */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              triggerFileInput()
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
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