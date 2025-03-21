'use client'

import type { ChangeEvent, InputHTMLAttributes } from 'react'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { cn } from '@/utils'
import { Button } from '@/components/ui/button'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  maxFiles?: number
  accept?: string
  className?: string
  value?: File[]
  onChange?: (files: File[]) => void
}

const FileUpload = forwardRef<HTMLInputElement, Props>(
  ({
    maxFiles = 1,
    accept = 'image/*',
    className,
    ...props
  }, ref) => {
    const [files, setFiles] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFiles = Array.from(e.target.files)
        const newFiles = [...files, ...selectedFiles].slice(0, maxFiles)
        setFiles(newFiles)

        // Generate previews for the files
        const newPreviews = newFiles.map(file => URL.createObjectURL(file))

        // Revoke old preview URLs to avoid memory leaks
        previews.forEach(url => URL.revokeObjectURL(url))
        setPreviews(newPreviews)

        props.onChange?.(newFiles)
      }
    }

    const handleRemoveFile = (index: number) => {
      const newFiles = [...files]
      newFiles.splice(index, 1)
      setFiles(newFiles)

      // Revoke the URL for the removed preview
      URL.revokeObjectURL(previews[index])

      const newPreviews = [...previews]
      newPreviews.splice(index, 1)
      setPreviews(newPreviews)

      props.onChange?.(newFiles)
    }

    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    }

    // Clean up preview URLs when component unmounts
    useEffect(() => {
      return () => {
        previews.forEach(url => URL.revokeObjectURL(url))
      }
    }, [previews])

    useImperativeHandle(ref, () => fileInputRef.current as HTMLInputElement)

    return (
      <div className={cn('space-y-4', className)}>
        <div className="flex flex-wrap gap-4">
          {/* File cards with previews */}
          {previews.map((preview, index) => (
            <div key={preview} className="relative h-32 w-32 rounded-md border border-border bg-card overflow-hidden group">
              <Image src={preview} alt={`Preview ${index}`} fill className="object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-5 w-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveFile(index)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          ))}

          {/* Upload card */}
          {files.length < maxFiles && (
            <div
              onClick={handleClick}
              className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted/50 text-muted-foreground hover:bg-muted transition-colors"
            >
              <Upload className="mb-2 h-6 w-6" />
              <span className="text-xs">Upload</span>
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
                multiple={maxFiles > 1}
              />
            </div>
          )}
        </div>
      </div>
    )
  },
)

FileUpload.displayName = 'FileUpload'

export default FileUpload
