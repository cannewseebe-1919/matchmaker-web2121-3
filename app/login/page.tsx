'use client'
// React import removed as it's unnecessary with Next.js 13+ and React 19
// removed duplicate import

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!error) router.push('/dashboard')
    else alert(error.message)
    setLoading(false)
  }

  const handleSignUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (!error) {
      alert('회원가입 완료! 로그인 해주세요.')
    } else {
      alert(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">중매쟁이 되기</h1>

      <input
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleLogin}
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          로그인
        </button>

        <button
          onClick={handleSignUp}
          disabled={loading}
          className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          회원가입
        </button>
      </div>
    </div>
  )
}
