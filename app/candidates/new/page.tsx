'use client'

import { useState } from 'react'
import { createCandidate } from '@/lib/createCandidate'
const region_data={
  "level1": [
    {
      "name": "서울",
      "level2": [
        "강남구",
        "강동구",
        "강북구",
        "강서구",
        "관악구",
        "광진구",
        "구로구",
        "금천구",
        "노원구",
        "도봉구",
        "동대문구",
        "동작구",
        "마포구",
        "서대문구",
        "서초구",
        "성동구",
        "성북구",
        "송파구",
        "양천구",
        "영등포구",
        "용산구",
        "은평구",
        "종로구",
        "중구",
        "중랑구"
      ]
    },
    {
      "name": "경기남부",
      "level2": [
        "수원시",
        "성남시",
        "안양시",
        "부천시",
        "안산시",
        "고양시",
        "용인시",
        "광명시",
        "평택시",
        "과천시",
        "오산시",
        "시흥시",
        "군포시",
        "의왕시",
        "하남시",
        "이천시",
        "안성시",
        "김포시",
        "화성시",
        "광주시",
        "여주시",
        "양평군",
        "동탄신도시"
      ]
    },
    {
      "name": "경기북부",
      "level2": [
        "의정부시",
        "동두천시",
        "양주시",
        "포천시",
        "연천군",
        "가평군",
        "구리시",
        "남양주시",
        "양평군"
      ]
    },
    {
      "name": "그 외",
      "level2": [
        "직접입력"
      ]
    }
  ]
}
export default function CandidateForm() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birth_year: 1990,
    region_lv1: '',
    region_lv2: '',
    job_lv1: '',
    job_detail: '',
    intros: '',
    ideal_type: ''
  })

  const [photos, setPhotos] = useState<File[]>([])

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files))
    }
  }

  const handleSubmit = async () => {
    if (photos.length < 2) {
      alert('사진은 최소 2장 이상 필요')
      return
    }

    try {
      await createCandidate(formData, photos)
      alert('등록 완료!')
      setFormData({
        name: '',
        gender: '',
        birth_year: 1990,
        region_lv1: '',
        region_lv2: '',
        job_lv1: '',
        job_detail: '',
        intros: '',
        ideal_type: ''
      })
      setPhotos([])
    } catch (e: any) {
      console.error(e)
      alert('저장 실패: ' + e.message)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6">지인 등록</h1>

      <div className="grid grid-cols-2 gap-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="이름" className="border rounded p-2"/>
        <select name="gender" value={formData.gender} onChange={handleChange} className="border rounded p-2">
          <option value="">성별 선택</option>
          <option value="male">남자</option>
          <option value="female">여자</option>
        </select>
        <input name="birth_year" type="number" value={formData.birth_year} onChange={handleChange} placeholder="출생연도" className="border rounded p-2"/>
        <select name="region_lv1" value={formData.region_lv1} onChange={handleChange} className="border rounded p-2">
          <option value="">지역 선택</option>
          {region_data.level1.map((lvl) => (
            <option key={lvl.name} value={lvl.name}>
              {lvl.name}
            </option>
          ))}
        </select>
        {formData.region_lv1 && formData.region_lv1 !== "그 외" ? (
          <select name="region_lv2" value={formData.region_lv2} onChange={handleChange} className="border rounded p-2">
            <option value="">구/군 선택</option>
            {(region_data.level1.find((lvl) => lvl.name === formData.region_lv1) || { level2: [] }).level2.map((lv2) => (
              <option key={lv2} value={lv2}>
                {lv2}
              </option>
            ))}
          </select>
        ) : (
          <input name="region_lv2" value={formData.region_lv2} onChange={handleChange} placeholder="지역(Level2)" className="border rounded p-2"/>
        )}
        <input name="job_lv1" value={formData.job_lv1} onChange={handleChange} placeholder="직군(Level1)" className="border rounded p-2"/>
        <input name="job_detail" value={formData.job_detail} onChange={handleChange} placeholder="직업 상세" className="border rounded p-2"/>
      </div>

      <textarea name="intros" value={formData.intros} onChange={handleChange} placeholder="소개" className="w-full border rounded p-2 mt-4"/>
      <textarea name="ideal_type" value={formData.ideal_type} onChange={handleChange} placeholder="이상형" className="w-full border rounded p-2 mt-4"/>

      <div className="mt-4">
        <label className="block text-gray-500 mb-2">사진 업로드 (2장 이상)</label>
        <input type="file" multiple accept="image/*" onChange={handleFileChange} className="border rounded p-2 w-full"/>
        {photos.length > 0 && (
          <div className="flex mt-2 space-x-2 overflow-x-auto">
            {photos.map((file, idx) => (
              <img key={idx} src={URL.createObjectURL(file)} className="w-24 h-24 object-cover rounded-lg"/>
            ))}
          </div>
        )}
      </div>

      <button onClick={handleSubmit} className="mt-6 w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-500 transition">
        저장하기
      </button>
    </div>
  )
}
