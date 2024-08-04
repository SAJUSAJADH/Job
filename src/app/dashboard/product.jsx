'use client'

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell,
} from '../../components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../../components/ui/button'

export function UsersTable({ profiles, offset, totalProfiles }) {
  let router = useRouter()
  let profilesPerPage = 5

  function prevPage() {
    router.back()
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Manage your users and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex overflow-x-auto'>
        <div className='min-w-full'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className='sr-only'>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile?.userId}>
                  <TableCell>
                    {profile?.role === 'candidate'
                      ? profile.candidateInfo?.name
                      : profile.recruiterInfo?.name}
                  </TableCell>
                  <TableCell>{profile?.email}</TableCell>
                  <TableCell>{profile?.role}</TableCell>
                  <TableCell>
                    {profile?.active === true ? 'Active' : 'Suspended'}
                  </TableCell>
                  <TableCell>{/* Add actions here if needed */}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter>
        <form className='flex items-center w-full justify-between'>
          <div className='text-xs text-muted-foreground'>
            Showing{' '}
            <strong>
              {Math.min(offset - profilesPerPage, totalProfiles) + 1}-{offset}
            </strong>{' '}
            of <strong>{totalProfiles}</strong> profiles
          </div>
          <div className='flex'>
            <Button
              formAction={prevPage}
              variant='ghost'
              size='sm'
              type='submit'
              disabled={offset === profilesPerPage}
            >
              <ChevronLeft className='mr-2 h-4 w-4' />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant='ghost'
              size='sm'
              type='submit'
              disabled={offset + profilesPerPage > totalProfiles}
            >
              Next
              <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  )
}
