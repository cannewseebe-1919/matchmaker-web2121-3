import './globals.css' // Tailwind 글로벌 스타일
import { ReactNode } from 'react'

export const metadata = {
  title: '중매쟁이 서비스',
  description: '지인 관리 및 매칭 서비스',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 min-h-screen font-sans">
        {/* 헤더 */}
        <header className="bg-indigo-600 text-white py-4 shadow-md">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">중매쟁이 서비스</h1>
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
