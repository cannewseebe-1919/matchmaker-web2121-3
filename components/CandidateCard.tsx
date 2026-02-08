export default function CandidateCard({ candidate }: any) {
    const photos = candidate.candidate_photos

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex space-x-2 mt-2">
                {photos?.map((p: any) => (
                    <img
                        key={p.photo_url}
                        src={p.photo_url}   // publicUrl
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
    )
}
