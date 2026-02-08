'use client'

import { useEffect, useState } from 'react'
import { fetchCandidates } from '@/lib/fetchCandidates'
import CandidateCard from '@/components/CandidateCard'

export default function CandidatesPage() {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCandidates().then(data => {
      setList(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="text-center mt-20">불러오는 중...</div>
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {list.map(c => (
        <CandidateCard key={c.id} candidate={c} />
      ))}
    </div>
  )
}
