import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <>
      <div className='pt-10 flex justify-center items-center w-full min-h-[70vh]'>
        <SignUp />
      </div>
    </>
  )
}
