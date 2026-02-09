import { supabase } from './supabaseClient'

// Compress image to max 500KB using canvas
async function compressImage(file: File, maxSizeKB = 500): Promise<File> {
  if (file.size / 1024 <= maxSizeKB) return file
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      // keep aspect ratio, limit width to 1024px
      const maxDim = 1024
      let { width, height } = img
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = (maxDim / width) * height
          width = maxDim
        } else {
          width = (maxDim / height) * width
          height = maxDim
        }
      }
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
      // initial quality
      let quality = 0.7
      const toBlob = (q: number) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file)
              return
            }
            if (blob.size / 1024 <= maxSizeKB || q <= 0.3) {
              const compressedFile = new File([blob], file.name, { type: blob.type })
              resolve(compressedFile)
            } else {
              // reduce quality and try again
              toBlob(q - 0.1)
            }
          },
          file.type,
          q
        )
      }
      toBlob(quality)
    }
    img.onerror = () => resolve(file)
    img.src = URL.createObjectURL(file)
  })
}

export async function uploadPhotos(files: File[], candidateId: number) {
    const urls: string[] = []

    for (const file of files) {
        const compressed = await compressImage(file)
        const ext = compressed.name.split('.').pop()
        const fileName = `${crypto.randomUUID()}.${ext}`
        const filePath = `${candidateId}/${fileName}`

        const { error } = await supabase.storage
            .from('candidate-photos')
            .upload(filePath, compressed, { cacheControl: '3600', upsert: false, contentType: compressed.type })

        if (error) throw error

        const { data } = supabase.storage
            .from('candidate-photos')
            .getPublicUrl(filePath)

        urls.push(data.publicUrl)
    }

    return urls
}
