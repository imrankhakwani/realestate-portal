import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Signin() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = ((e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  })

  const handleSubmit = (async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signin',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if(data.success === false) {
        setError(data.message)
        setLoading(false)
        return
      }

      setLoading(false)
      setError(null)
      navigate('/')

    } catch(error) {
      setLoading(false)
      setError(error.message)
    }
  })

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In
      </h1>
      <form 
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}>
        <input 
          type='email' 
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input 
          type='password' 
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <button 
          className='bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80'
          disabled={loading}
        >
          {loading? 'loading...': 'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
          <p>Do not have an account?</p>
          <Link to={'/signup'}>
            <span className='text-blue-700'>Sign in</span>
          </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
