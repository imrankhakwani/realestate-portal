import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleGoogleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        })
      })

      const data = await res.json()
      dispatch(signInSuccess(data))
      navigate('/')

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <button 
      type='button'
      onClick={handleGoogleSignin}
      className='bg-orange-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
      continue with google
    </button>
  )
}
