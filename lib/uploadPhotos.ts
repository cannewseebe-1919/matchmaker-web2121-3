import { supabase } from './supabaseClient'

export async function uploadPhotos(files: File[], candidateId: number) {
    const urls: string[] = []

    for (const file of files) {
        const ext = file.name.split('.').pop()
        const fileName = `${crypto.randomUUID()}.${ext}`
        const filePath = `${candidateId}/${fileName}`

        const { error } = await supabase.storage
            .from('candidate-photos')
            .upload(filePath, file, { cacheControl: '3600', upsert: false, contentType: file.type })

        if (error) throw error

        const { data } = supabase.storage
            .from('candidate-photos')
            .getPublicUrl(filePath)

        urls.push(data.publicUrl)
    }

    return urls
}
