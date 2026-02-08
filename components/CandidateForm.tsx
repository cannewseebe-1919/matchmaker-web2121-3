'use client'

import { useState } from 'react'
import { createCandidate } from '@/lib/createCandidate'

export default function CandidateForm() {
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        birth_year: '',
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
    // 파일 input 변화
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files)
            setPhotos(filesArray)
        }
    }
    const handleSubmit = async () => {
        if (photos.length < 2) {
            alert('사진은 최소 2장 필요')
            return
        }

        try {
            await createCandidate(formData, photos)
            alert('등록 완료!')
            setFormData({
                name: '',
                gender: '',
                birth_year: '',
                region_lv1: '',
                region_lv2: '',
                job_lv1: '',
                job_detail: '',
                intros: '',
                ideal_type: ''
            })
            setPhotos([])
        } catch (e) {
            console.error(e)
            alert('저장 실패 😢')
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
            <h1 className="text-2xl font-bold mb-6">지인 등록</h1>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-500 mb-1">이름</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-500 mb-1">성별</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value="">선택</option>
                        <option value="male">남자</option>
                        <option value="female">여자</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-500 mb-1">출생연도</label>
                    <input
                        name="birth_year"
                        type="number"
                        value={formData.birth_year}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-500 mb-1">지역 (시/도)</label>
                    <input
                        name="region_lv1"
                        value={formData.region_lv1}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-500 mb-1">지역 (구/군)</label>
                    <input
                        name="region_lv2"
                        value={formData.region_lv2}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-500 mb-1">직군</label>
                    <input
                        name="job_lv1"
                        value={formData.job_lv1}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-500 mb-1">직업 상세</label>
                    <input
                        name="job_detail"
                        value={formData.job_detail}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-gray-500 mb-1">소개</label>
                <textarea
                    name="intros"
                    value={formData.intros}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 h-24"
                />
            </div>

            <div className="mt-4">
                <label className="block text-gray-500 mb-1">이상형</label>
                <textarea
                    name="ideal_type"
                    value={formData.ideal_type}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 h-24"
                />
            </div>

            <div className="mt-4">
                <label className="block text-gray-500 mb-2">사진 업로드 (2장 이상)</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border rounded-lg p-2 w-full"
                />
                {photos.length > 0 && (
                    <div className="flex mt-2 space-x-2 overflow-x-auto">
                        {photos.map((file, idx) => (
                            <img
                                key={idx}
                                src={URL.createObjectURL(file)}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                        ))}
                    </div>
                )}
            </div>
            <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-500 transition"
            >
                저장하기
            </button>
        </div>
    )
}
