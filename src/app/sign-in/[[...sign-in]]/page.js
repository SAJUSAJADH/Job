import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className='pt-10 flex justify-center items-center w-full min-h-[70vh]'>
      <SignIn />
    </div>
  )
}
