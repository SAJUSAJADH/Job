import { EnableAccounts, suspendAccounts } from '@/actions'
import { Add, Remove } from '@/components/remove'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell,
} from '@/components/ui/table'
import { getRecruiters } from '@/utils/db'
import { ChevronLeft, ShieldMinus, Trash2Icon } from 'lucide-react'
import { redirect } from 'next/dist/server/api-utils'

export default async function RecruitersPage() {
  let profilesPerPage = 5
  const search = { role: 'recruiter' }
  const offset = 0
  const { recruiters, newOffset, totalProfiles } = await getRecruiters(
    search,
    Number(offset)
  )
  async function prevPage() {
    'use server'
  }
  async function nextPage() {
    'use server'
  }

  async function suspendAccount(identifier) {
    'use server'
    await suspendAccounts(identifier, '/dashboard/recruiters')
  }

  async function EnableAccount(identifier) {
    'use server'
    await EnableAccounts(identifier, '/dashboard/recruiters')
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recruiters</CardTitle>
          <CardDescription>View all Recruiters.</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardContent className='flex overflow-x-auto'>
          <div className='min-w-full'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Block/Unblock</TableHead>
                  <TableHead>
                    <span className='sr-only'>Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recruiters.map((profile) => (
                  <TableRow key={profile?.userId}>
                    <TableCell>{profile.recruiterInfo?.name}</TableCell>
                    <TableCell>{profile?.email}</TableCell>
                    <TableCell>
                      {profile?.active === true ? (
                        <Remove
                          suspendAccount={suspendAccount}
                          id={profile?.userId}
                        />
                      ) : (
                        <Add
                          EnableAccount={EnableAccount}
                          id={profile?.userId}
                        />
                      )}
                    </TableCell>
                    <TableCell>{/* Add actions here if needed */}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {/* <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.min(offset - profilesPerPage, totalProfiles) + 1}-{offset}
            </strong>{' '}
            of <strong>{totalProfiles}</strong> profiles
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === profilesPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + profilesPerPage > totalProfiles}
            >
              Next
              <ChevronLeft className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter> */}
      </Card>
    </>
  )
}
