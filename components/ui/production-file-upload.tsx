"use client"

import { Upload, CheckCircle2, X, Eye, FileText, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"

interface ProductionFileUploadProps {
  id: string
  label: string
  file: File | null
  onFileChange: (file: File | null) => void
  accept?: string
  required?: boolean
  placeholder?: string
}

export function ProductionFileUpload({
  id,
  label,
  file,
  onFileChange,
  accept = ".jpg,.jpeg,.png,.pdf",
  required = true,
  placeholder,
}: ProductionFileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showFullPreview, setShowFullPreview] = useState(false)
  const [inputId] = useState(`file-input-${id}-${Date.now()}`)

  useEffect(() => {
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [file])

  useEffect(() => {
    const existing = document.getElementById(inputId)
    if (existing) existing.remove()

    const input = document.createElement("input")
    input.type = "file"
    input.id = inputId
    input.accept = accept
    input.style.display = "none"
    input.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement
      const selected = target.files?.[0] || null
      if (selected) processFile(selected)
      target.value = ""
    })
    document.body.appendChild(input)

    return () => {
      const el = document.getElementById(inputId)
      if (el) el.remove()
    }
  }, [inputId, accept])

  const processFile = (selected: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    if (!allowedTypes.includes(selected.type)) {
      toast.error("Format file harus JPG, PNG, atau PDF", { duration: 4000 })
      return
    }
    if (selected.size > 5 * 1024 * 1024) {
      toast.error(`Ukuran file maksimal 5MB. File Anda: ${(selected.size / 1024 / 1024).toFixed(2)}MB`, { duration: 4000 })
      return
    }
    onFileChange(selected)
    toast.success("File berhasil diupload", { duration: 2000 })
  }

  const triggerFileInput = () => {
    const input = document.getElementById(inputId) as HTMLInputElement
    if (input) {
      input.click()
    } else {
      const tmp = document.createElement("input")
      tmp.type = "file"
      tmp.accept = accept
      tmp.style.display = "none"
      tmp.onchange = (e) => {
        const target = e.target as HTMLInputElement
        const selected = target.files?.[0] || null
        if (selected) processFile(selected)
        document.body.removeChild(tmp)
      }
      document.body.appendChild(tmp)
      tmp.click()
    }
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    onFileChange(null)
  }

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true) }
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false) }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped) processFile(dropped)
  }

  const isPdf = file?.type === "application/pdf"

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {!file ? (
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all bg-white ${
            isDragging
              ? "border-blue-500 bg-blue-50 cursor-copy"
              : "border-gray-300 hover:border-blue-500 cursor-pointer"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <Upload className={`w-10 h-10 mx-auto mb-3 transition-colors ${isDragging ? "text-blue-600" : "text-gray-400"}`} />
          <p className="text-sm font-medium text-gray-700 mb-3">
            {isDragging ? "Lepaskan file di sini..." : (placeholder || "Klik untuk pilih file dari device")}
          </p>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); triggerFileInput() }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            Pilih File
          </button>
          <p className="text-xs text-gray-500 mt-3">Format: JPG, PNG, PDF (Max 5MB)</p>
        </div>
      ) : (
        <div className="border-2 border-green-500 bg-green-50 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3 min-w-0">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0 ml-2">
              {previewUrl && (
                <button type="button" onClick={() => setShowFullPreview(true)} className="p-1.5 hover:bg-blue-100 rounded-full transition-colors" title="Lihat preview">
                  <Eye className="w-4 h-4 text-blue-600" />
                </button>
              )}
              <button type="button" onClick={handleRemove} className="p-1.5 hover:bg-red-100 rounded-full transition-colors" title="Hapus file">
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>

          {previewUrl && (
            <div className="border-t border-green-200 bg-white cursor-pointer" onClick={() => setShowFullPreview(true)}>
              <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover hover:opacity-90 transition-opacity" />
              <p className="text-center text-xs text-gray-400 py-1">Klik untuk lihat penuh</p>
            </div>
          )}

          {isPdf && (
            <div className="border-t border-green-200 bg-white p-4 flex items-center justify-center gap-2 text-gray-500">
              <FileText className="w-8 h-8 text-red-500" />
              <span className="text-sm">File PDF</span>
            </div>
          )}
        </div>
      )}

      {showFullPreview && previewUrl && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4" onClick={() => setShowFullPreview(false)}>
          <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors" onClick={() => setShowFullPreview(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
          <img src={previewUrl} alt="Preview" className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          <p className="absolute bottom-4 text-white text-sm opacity-70">{file?.name}</p>
        </div>
      )}
    </div>
  )
}
