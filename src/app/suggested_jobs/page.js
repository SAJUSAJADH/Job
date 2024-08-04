import React from 'react'
import {
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidateAction,
  fetchJobsForRecruiterAction,
  fetchProfileAction,
} from '@/actions'
import { currentUser } from '@clerk/nextjs'
import FeaturedJobs from '@/components/featuredJobs'
import axios from 'axios'

async function SuggestedJobs({ searchParams }) {
  console.log(searchParams, 'searchParams')
  const user = await currentUser()
  const profileInfo = await fetchProfileAction(user?.id)

  const jobList =
    profileInfo?.role === 'candidate'
      ? await fetchJobsForCandidateAction(searchParams)
      : await fetchJobsForRecruiterAction(user?.id)

  const getJobApplicationList =
    profileInfo?.role === 'candidate'
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForRecruiter(user?.id)

    const recommendedJobsResponse = await fetch('http://127.0.0.1:8000/api/recommend_jobs', {
        method: 'POST',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            user_id: user?.id,
            jobs: jobList
          }),
    })

    const data = await recommendedJobsResponse.json()

    console.log('result: - ',data)

  return (
    <FeaturedJobs
      profileInfo={profileInfo}
      jobList={jobList}
      featured={data}
      jobApplications={getJobApplicationList}
    />
  )
}

export default SuggestedJobs
