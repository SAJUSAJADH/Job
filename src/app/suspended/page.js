'use client'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'

function Suspended() {
  useEffect(() => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-red-500 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className='flex-1 w-0 p-4'>
          <div className='flex items-start'>
            <div className='flex-shrink-0 pt-0.5'>
              {/* Add any icon or image here if you want */}
            </div>
            <div className='ml-3 flex-1'>
              <p className='text-sm font-medium text-white'></p>
              <p className='mt-1 text-sm text-white'>
                This is Account is suspended.
              </p>
            </div>
          </div>
        </div>
      </div>
    ))
  }, [])

  return (
    <div className='min-h-[70vh] flex justify-center items-center'>
      This account is Suspended
    </div>
  )
}

export default Suspended
