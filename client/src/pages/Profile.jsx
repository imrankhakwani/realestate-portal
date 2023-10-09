import { useSelector } from 'react-redux'

export default function Profile() {

  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <img 
          className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2'
          src={currentUser.avatar} 
          alt='profile' 
        />
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
        <span className='text-red-700 cursor-pointer mt-5'>Delete</span>
        <span className='text-red-700 cursor-pointer mt-5'>Sign out</span>
      </div>
    </div>
  )
}
