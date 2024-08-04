import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['/'],
  async afterAuth(auth, req, evt) {
    const path = req.nextUrl.pathname
    if (
      auth.userId &&
      auth.userId === process.env.NEXT_PUBLIC_ADMIN_ID &&
      !path.startsWith('/dashboard')
    ) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    if (
      auth.userId &&
      auth.userId !== process.env.NEXT_PUBLIC_ADMIN_ID &&
      path.startsWith('/dashboard')
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  },
})

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
