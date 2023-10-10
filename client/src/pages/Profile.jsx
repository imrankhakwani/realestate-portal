import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase.js'

export default function Profile() {

  const [file, setFile] = useState(undefined)
  const [uploadProg, setUploadProg] = useState(0)
  const [uploadError, setUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const fileRef = useRef(null)
  const { currentUser } = useSelector((state) => state.user)

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
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
          placeholder='username'
          className='border p-3 rounded-lg'
        />
        <input 
          type='text'
          id='email'
          placeholder='email'
          className='border p-3 rounded-lg'
        />
        <input 
          type='text'
          id='password'
          placeholder='password'
          className='border p-3 rounded-lg'
        />
        <button
          className='bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95'
        >
          update
        </button>
      </form>
      <div className='flex justify-between'>
        <span className='text-red-700 cursor-pointer mt-5 hover:opacity-80'>Delete</span>
        <span className='text-red-700 cursor-pointer mt-5 hover:opacity-80'>Sign out</span>
      </div>
    </div>
  )
}
