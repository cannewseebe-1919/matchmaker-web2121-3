'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (!user) return <p>로딩중...</p>

  return (
    <div className="p-6">
      <div className="bg-gray-100 p-2 text-right mb-4 rounded">
        로그인된 아이디: {user.email}
      </div>
      <h1 className="text-2xl font-bold mb-4">대시보드</h1>
      <p className="mb-4">로그인한 이메일: {user.email}</p>
      <div className="flex space-x-4 mb-4">
        <Link href="/candidates" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          지인목록
        </Link>
        <Link href="/candidates/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          지인등록
        </Link>
      </div>
      <button onClick={handleLogout} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
        로그아웃
      </button>
    </div>
  )
}
