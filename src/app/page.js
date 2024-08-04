import { fetchProfileAction } from '@/actions'
import TypeAnime from '@/components/type-animation'
import { currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import HomepageButtonControls from '@/components/homepage-button-controls'
import About from '@/components/about'
import Chatbot from '@/components/chatbot'

async function Home() {
  const user = await currentUser()
  const profileInfo = await fetchProfileAction(user?.id)

  if (user && !profileInfo?._id) redirect('/onboard')

  const handleSearch = async (data) => {
    'use server'
    const search = data.get('search')
    if (search) {
      redirect('/search/' + search)
    }
  }

  return (
    <>
      <section className='container relative mt-20 flex flex-col justify-center gap-2 items-center'>
        <Image
          src='/apple.gif'
          alt=''
          width={50}
          height={50}
          className='hidden lg:block absolute top-0 left-36 -rotate-45'
          unoptimized
        />
        <Image
          src='/spotify.gif'
          alt=''
          width={50}
          height={50}
          className='hidden lg:block absolute bottom-0 right-36'
          unoptimized
        />
        <Image
          src='/twitter.gif'
          alt=''
          width={50}
          height={50}
          className='hidden lg:block absolute top-0 right-36 scale-x-[-1]'
          unoptimized
        />
        <Image
          src='/netfix.gif'
          alt=''
          width={50}
          height={50}
          className='hidden lg:block absolute bottom-0 left-36'
          unoptimized
        />
        <h1 className='text-3xl lg:text-7xl font-bold text-center'>
          Find your remote job <br />
          <TypeAnime />
        </h1>
        <p className='text-center text-sm lg:text-base text-gray-600 mt-2 px-4 lg:px-80'>
          Build your best job community starting from here. One Stop Solution to
          Find Jobs.
        </p>
        <form
          action={handleSearch}
          className='flex gap-2 mt-4 max-w-md mx-auto'
        >
          <input
            type='search'
            name='search'
            className='border border-gray-400 w-full lg:w-96 py-2 px-3 rounded-md outline-none'
            placeholder='Search phrase..'
          />
          <button
            type='submit'
            className='bg-blue-600 text-white py-2 px-4 rounded-md'
          >
            Search
          </button>
        </form>
        <div className='w-full mt-6 flex items-center text-white justify-center gap-2'>
          <HomepageButtonControls
            user={JSON.parse(JSON.stringify(user))}
            profileInfo={profileInfo}
          />
        </div>
        <Link
          href='/'
          className='mt-2 text-center text-base leading-loose text-gray-600 px-4 lg:px-80'
        >
          www.jobportalengine.com
        </Link>
      </section>
      <About />
      <div className='flex justify-end items-center'>
        <Chatbot />
      </div>
    </>
  )
}

export default Home
