import { supabase } from './supabaseClient'
import { uploadPhotos } from './uploadPhotos'

interface CandidateData {
  name: string
  gender: string
  birth_year: number
  region_lv1: string
  region_lv2: string
  job_lv1: string
  job_detail: string
  intros: string
  ideal_type: string
}

export async function createCandidate(
  data: CandidateData,
  photos: File[]
) {
  // 1️⃣ 로그인한 유저 확인
  const { data: sessionData } = await supabase.auth.getSession()
  const userId = sessionData?.session?.user?.id
  if (!userId) throw new Error('로그인 필요')

  // 2️⃣ 후보자 DB insert
  const { data: candidate, error: insertError } = await supabase
    .from('candidates')
    .insert({ ...data, created_by: userId })
    .select()
    .single()

  if (insertError) throw new Error(insertError.message)

  // 3️⃣ 사진 업로드
  const urls = await uploadPhotos(photos, candidate.id)

  // 4️⃣ 사진 URL DB insert
  const { error: photoError } = await supabase
    .from('candidate_photos')
    .insert(urls.map(url => ({ candidate_id: candidate.id, photo_url: url })))

  if (photoError) throw new Error(photoError.message)

  return candidate
}
