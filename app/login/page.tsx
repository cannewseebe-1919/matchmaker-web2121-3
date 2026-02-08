'use client'

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
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h1>중매쟁이 되기</h1>

      <input
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={handleLogin} disabled={loading}>
          로그인
        </button>

        <button
          onClick={handleSignUp}
          disabled={loading}
          style={{ marginLeft: 10 }}
        >
          회원가입
        </button>
      </div>
    </div>
  )
}
