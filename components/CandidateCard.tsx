'use client';
import { useState } from 'react';

export default function CandidateCard({ candidate }: any) {
    const photos = candidate.candidate_photos;
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    return (
        <>
            <div
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                onClick={openModal}
            >
                <div className="flex space-x-2 mt-2 p-2">
                    {photos?.map((p: any) => (
                        <img
                            key={p.photo_url}
                            src={p.photo_url}
                            className="w-24 h-24 object-cover rounded-lg"
                            alt="candidate photo"
                        />
                    ))}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-bold">{candidate.name}</h3>
                    <p>{candidate.job_detail}</p>
                    <p>{candidate.region_lv1} {candidate.region_lv2}</p>
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
                        <button className="float-right text-gray-500" onClick={closeModal}>✕</button>
                        <h2 className="text-2xl font-bold mb-4">{candidate.name}</h2>
                        <p><strong>성별:</strong> {candidate.gender}</p>
                        <p><strong>출생 연도:</strong> {candidate.birth_year}</p>
                        <p><strong>지역:</strong> {candidate.region_lv1} {candidate.region_lv2}</p>
                        <p><strong>직업:</strong> {candidate.job_lv1} - {candidate.job_detail}</p>
                        <p><strong>소개:</strong> {candidate.intros}</p>
                        <p><strong>이상형:</strong> {candidate.ideal_type}</p>
                        {candidate.candidate_photos && candidate.candidate_photos.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                {candidate.candidate_photos.map((p: any) => (
                                    <img key={p.photo_url} src={p.photo_url} alt="candidate photo" className="w-full h-24 object-cover rounded" />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
