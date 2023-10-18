import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase.js'
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure
} from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'

export default function Profile() {

  const [file, setFile] = useState(undefined)
  const [uploadProg, setUploadProg] = useState(0)
  const [uploadError, setUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if(file) {
      handleFileUpload(file)
    }

  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadProg(Math.round(progress))
      },
      (error) => {
        setUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        )
      }
    )
  }


  const handleDeleteUser = async() => {
    try {
      dispatch(deleteUserStart())

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      })

      const data = await res.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return
      }

      dispatch(deleteUserSuccess(data))

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignout = async() => {
    try {
      dispatch(signoutUserStart())
      const res = fetch('/api/auth/signout')
      const data = await res.json()

      if (data.success === false) {
        dispatch(signoutUserFailure(data.message))
        return
      }

      dispatch(signoutUserSuccess(data))
    } catch (error) {
      dispatch(signoutUserFailure(error.message))
    }
  }

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }

      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <input
          type="file"
          onClick={(e) => setFile(e.target.files[0])}
          ref={ fileRef }
          accept='image/*'
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {uploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : uploadProg > 0 && uploadProg < 100 ? (
            <span className='text-slate-700'>{`Uploading ${uploadProg}%`}</span>
          ) : uploadProg === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input 
          type='text'
          id='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
          placeholder='username'
          className='border p-3 rounded-lg'
        />
        <input 
          type='text'
          id='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
          placeholder='email'
          className='border p-3 rounded-lg'
        />
        <input 
          type='password'
          id='password'
          placeholder='password'
          className='border p-3 rounded-lg'
        />
        <button
        disabled={loading}
          className='bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95'
          onClick={handleSubmit}
        >
          { loading ? 'loading...' : 'update'}
        </button>
        <Link
          className='bg-green-700 text-white p-3 rounded-lg upercase text-center hover:opacity-95'
          to='/create-listing'
        >
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between'>
        <span 
          onClick={handleDeleteUser}
          className='text-red-600 cursor-pointer mt-5 hover:opacity-80'
        >
          Delete
        </span>
        <span 
          onClick={handleSignout}
          className='text-red-600 cursor-pointer mt-5 hover:opacity-80'>Sign out</span>
      </div>
      <p className='text-red-500 mt-5'>{ error ? error : '' }</p>
      <p className='text-green-500 mt-5'>{ updateSuccess ? 'User successfully updated' : '' }</p>
    </div>
  )
}
