import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

function CommonCard({
  title,
  icon,
  description,
  footerContent,
  location,
  type,
}) {
  return (
    <div className='rounded-md w-full bg-white my-4 px-4 py-4 shadow-md transition transform duration-500 cursor-pointer'>
      <div className='flex flex-col justify-start'>
        <div className='flex justify-between items-center w-96'>
          <div className='text-lg font-semibold text-bookmark-blue flex space-x-1 items-center mb-2'>
            <svg
              className='w-7 h-7 text-gray-700'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z'
                clipRule='evenodd'
              />
              <path d='M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z' />
            </svg>
            {title ? <span>{title}</span> : <></>}
          </div>
        </div>
        <div className='text-sm text-gray-500 flex gap-3 space-x-1 items-center'>
          <svg
            className='w-6 h-6'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
              clipRule='evenodd'
            />
          </svg>
          {location ? <span>{location}</span> : <></>}
          {type && (
            <span className='bg-green-500 rounded-full uppercase text-white text-sm px-4 py-1 font-bold shadow-xl'>
              {' '}
              {type ? type : ''}{' '}
            </span>
          )}
        </div>
        <div>
          <div className='mt-5'>
            <CardFooter className='p-0'>{footerContent}</CardFooter>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommonCard
