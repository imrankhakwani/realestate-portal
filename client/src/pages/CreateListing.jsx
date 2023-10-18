import { useRef, useState, useEffect } from 'react'

export default function CreateListing() {
  const [formData, setFormData] = useState({})
  const [files, setFiles] = useState(null)

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  return (
    <main className='max-w-4xl p-3 mx-auto'>
      <h1 
        className='text-3xl font-semibold text-center my-7'
      >
        Create a Listing
      </h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input 
            type="text" 
            placeholder='Name' 
            id='name' 
            className='border p-3 rounded-lg'
            maxLength='65'
            minLength='15'
            required
            onChange={handleChange}
          />
          <textarea 
            type='text' 
            placeholder='Description' 
            id='description' 
            className='border p-3 rounded-lg'
            required
            onChange={handleChange}
          />
          <input 
            type='text'
            placeholder='Address'
            id='address' 
            className='border p-3 rounded-lg'
            required
            onChange={handleChange}
          />
          <div className='flex flex-wrap gap-6'>
            <div className='flex gap-2'>
              <input type='checkbox' id='sale' className='w-5' />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='rent' className='w-5' />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='parking' className='w-5' />
              <span>Parking Area</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='furnished' className='w-5' />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input 
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type='number'
                id='regularPrice'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Regular Price</p>
                <span className='text-xs'>($/month)</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='discountPrice'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
              />
              <div className='flex flex-col items-center'>
                <p>Discounted Price</p>
                <span className='text-xs'>($/month)</span>
              </div>
            </div>
          </div>
          </div>
          <div className='flex flex-col flex-1'>
            <div className='flex flex-col flex-1 gap-4'>
            <p className='font-semibold'>
              Images:
              <span className='font-normal text-gray-600 ml-2'>
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className='flex gap-4'>
              <input
                onChange={(e) => setFiles(e.target.files)}
                className='p-3 border border-gray-300 rounded w-full'
                type='file'
                id='images'
                accept='image/*'
                multiple
              />
              <button
                type='button'
                className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              >
                Upload
              </button>
            </div>
          </div>
          <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
          <button
            // disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            Create listing
          </button>
        </div>
      </form>
    </main>
  )
}
