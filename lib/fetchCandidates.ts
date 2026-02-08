import { supabase } from './supabaseClient'

export async function fetchCandidates() {
  const { data, error } = await supabase
    .from('candidates')
    .select('*, candidate_photos(photo_url)') // 사진 join
console.log(data)
  if (error) throw new Error(error.message)
  return data
}