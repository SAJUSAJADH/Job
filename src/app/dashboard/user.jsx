import { Button } from '../../components/ui/button'

import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'
import Link from 'next/link'

export async function User() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='overflow-hidden rounded-full'
        >
          <Image
            src={false?.image ?? '/placeholder-user.jpg'}
            width={36}
            height={36}
            alt='Avatar'
            className='overflow-hidden rounded-full'
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>
          <Link href='/dashboard'>Admin account</Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href='/dashboard/candidates'>Candidates</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href='/dashboard/recruiters'>Recruiters</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {true ? (
          <DropdownMenuItem>
            <form>
              <button type='submit'>Sign Out</button>
            </form>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href='/login'>Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
