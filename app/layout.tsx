'use client'
import './globals.css' // Tailwind 글로벌 스타일
import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

const metadata = {
  title: '중매쟁이 서비스',
  description: '지인 관리 및 매칭 서비스',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserEmail(data.user.email ?? '')
    })
  }, [])

  return (
    <html lang="ko">
      <body className="bg-gray-100 min-h-screen font-sans">
        {/* 헤더 */}
        <header className="bg-indigo-600 text-white py-4 shadow-md">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <Link href="/dashboard" className="text-xl font-bold hover:underline">40🐮</Link>
            {userEmail && (
              <span className="text-sm bg-indigo-500 px-2 py-1 rounded">{userEmail}</span>
            )}
            <nav>
              <a href="/candidates" className="hover:underline mr-4">
                지인 목록
              </a>
              <a href="/candidates/new" className="hover:underline">
                지인 등록
              </a>
            </nav>
          </div>
        </header>

        {/* 본문 */}
        <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>

        {/* 푸터 */}
        <footer className="bg-gray-200 text-gray-700 py-4 mt-10 text-center">
          &copy; 2026 중매쟁이 서비스
        </footer>
      </body>
    </html>
  )
}
