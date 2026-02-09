'use client'

import { useEffect, useState, useMemo } from 'react'
import { fetchCandidates } from '@/lib/fetchCandidates'
import CandidateCard from '@/components/CandidateCard'

export default function CandidatesPage() {
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // filter states
  const [birthMin, setBirthMin] = useState<string>('')
  const [birthMax, setBirthMax] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [regionLv1, setRegionLv1] = useState<string>('')
  const [regionLv2, setRegionLv2] = useState<string>('')
  const [jobLv1, setJobLv1] = useState<string>('')

  useEffect(() => {
    fetchCandidates().then(data => {
      setList(data)
      setLoading(false)
    })
  }, [])

  // derive dynamic filter options from fetched data
  const regionLv1Options = useMemo(() => {
    const set = new Set<string>()
    list.forEach(c => c.region_lv1 && set.add(c.region_lv1))
    return Array.from(set)
  }, [list])

  const regionLv2Options = useMemo(() => {
    if (!regionLv1) return []
    const set = new Set<string>()
    list.forEach(c => {
      if (c.region_lv1 === regionLv1 && c.region_lv2) set.add(c.region_lv2)
    })
    return Array.from(set)
  }, [list, regionLv1])

  const jobLv1Options = useMemo(() => {
    const set = new Set<string>()
    list.forEach(c => c.job_lv1 && set.add(c.job_lv1))
    return Array.from(set)
  }, [list])

  const birthYearRange = useMemo(() => {
    if (list.length === 0) return { min: '', max: '' }
    const years = list.map(c => c.birth_year).filter(Boolean)
    return { min: Math.min(...years), max: Math.max(...years) }
  }, [list])

  const filtered = useMemo(() => {
    return list.filter(c => {
      if (birthMin && c.birth_year < Number(birthMin)) return false
      if (birthMax && c.birth_year > Number(birthMax)) return false
      if (gender && c.gender !== gender) return false
      if (regionLv1 && c.region_lv1 !== regionLv1) return false
      if (regionLv1 && regionLv1 !== '그 외' && regionLv2 && c.region_lv2 !== regionLv2) return false
      if (regionLv1 === '그 외' && regionLv2 && c.region_lv2 !== regionLv2) return false
      if (jobLv1 && c.job_lv1 !== jobLv1) return false
      return true
    })
  }, [list, birthMin, birthMax, gender, regionLv1, regionLv2, jobLv1])

  if (loading) return <div className="text-center mt-20">불러오는 중...</div>

  return (
    <div className="p-8">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-gray-500 mb-1">출생 연도 (최소)</label>
          <input
            type="number"
            value={birthMin}
            onChange={e => setBirthMin(e.target.value)}
            placeholder={birthYearRange.min?.toString()}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-gray-500 mb-1">출생 연도 (최대)</label>
          <input
            type="number"
            value={birthMax}
            onChange={e => setBirthMax(e.target.value)}
            placeholder={birthYearRange.max?.toString()}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-gray-500 mb-1">성별</label>
          <select
            value={gender}
            onChange={e => setGender(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">전체</option>
            <option value="male">남자</option>
            <option value="female">여자</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-500 mb-1">직군</label>
          <select
            value={jobLv1}
            onChange={e => setJobLv1(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">전체</option>
            {jobLv1Options.map(j => (
              <option key={j} value={j}>{j}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-500 mb-1">지역 (시/도)</label>
          <select
            value={regionLv1}
            onChange={e => { setRegionLv1(e.target.value); setRegionLv2('') }}
            className="w-full border rounded p-2"
          >
            <option value="">전체</option>
            {regionLv1Options.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-500 mb-1">지역 (구/군)</label>
          {regionLv1 && regionLv2Options.length > 0 ? (
            <select
              value={regionLv2}
              onChange={e => setRegionLv2(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="">전체</option>
              {regionLv2Options.map(r2 => (
                <option key={r2} value={r2}>{r2}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={regionLv2}
              onChange={e => setRegionLv2(e.target.value)}
              placeholder="직접 입력"
              className="w-full border rounded p-2"
            />
          )}
        </div>
      </div>
      {/* Candidate Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(c => (
          <CandidateCard key={c.id} candidate={c} />
        ))}
      </div>
    </div>
  )
}
