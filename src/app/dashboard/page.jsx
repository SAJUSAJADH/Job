import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs'
import { getProfiles } from '@/utils/db'
import { UsersTable } from './product'

export default async function UsersPage({ searchParams }) {
  console.log(searchParams - 'identifier')
  const search = searchParams.q ?? ''
  const offset = searchParams.offset ?? 0
  const { profiles, newOffset, totalProfiles } = await getProfiles(
    search,
    Number(offset)
  )

  return (
    <Tabs defaultValue='all'>
      <div className='flex items-center'>
        <TabsList>
          <TabsTrigger value='all'>All</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value='all'>
        <UsersTable
          profiles={profiles}
          offset={newOffset ?? 0}
          totalProfiles={totalProfiles}
        />
      </TabsContent>
    </Tabs>
  )
}
