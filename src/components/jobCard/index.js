import Link from 'next/link'
import Helper from '../helper'
import {
  createFilterCategoryAction,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction,
} from '@/actions'

async function JobCard({ job, user }) {
  const isAdmin = user && job.recruiterId === user._id
  const searchParams = { title: job.title }
  const profileInfo = await fetchProfileAction(user?.id)
  const jobList =
    profileInfo?.role === 'candidate'
      ? await fetchJobsForCandidateAction(searchParams)
      : await fetchJobsForRecruiterAction(user?.id)

  const getJobApplicationList =
    profileInfo?.role === 'candidate'
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForRecruiter(user?.id)

  const fetchFilterCategories = await createFilterCategoryAction()

  return (
    <div className='xl:mx-40 mb-4'>
      <div className='grid lg:flex justify-between items-center px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103'>
        <div className='flex flex-col items-start gap-3'>
          <h1 className='text-lg font-semibold'>{job.title}</h1>
          <div className='grid lg:flex lg:gap-2'>
            <p>
              {job.location} &#x2022; {job.type} &#x2022; {job.skills}{' '}
            </p>
            {isAdmin && (
              <>
                {' '}
                &middot; <Link href={'/jobs/edit/' + job._id}>Edit</Link>{' '}
                &middot;{' '}
                <button
                  type='button'
                  className='text-start lg:text-center'
                  onClick={async () => {
                    await fetch('/api/jobs?id=' + job._id, {
                      method: 'DELETE',
                      cache: 'no-store',
                    })
                    window.location.reload()
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <Helper
            profileInfo={profileInfo}
            jobItem={job}
            jobApplications={getJobApplicationList}
          />
        </div>
      </div>
    </div>
  )
}

export default JobCard
