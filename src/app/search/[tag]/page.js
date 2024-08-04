import JobCard from '@/components/jobCard'
import Job from '@/models/job'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

async function Search({ params }) {
  let { tag } = params
  const user = await currentUser()
  tag = decodeURIComponent(tag)
  const regexPattern = new RegExp(tag, 'i')

  const jobsDocs = await Job.find({ title: { $regex: regexPattern } })
  const fullJobs = await Job.find({})

  return (
    <div className='pb-10'>
      <div className='container px-3 lg:px-16'>
        <h1 className='text-xl lg:text-2xl font-sans font-bold my-6'>
          {jobsDocs ? `SEARCH RESULT FOR - ${tag}` : 'No jobs found'}
        </h1>
      </div>
      {jobsDocs &&
        jobsDocs.map((job, index) => (
          <JobCard key={index} job={job} user={user} />
        ))}
      <div className='container px-3 lg:px-16'>
        <p className='text-lg py-4'>People also search for </p>
      </div>
      {fullJobs &&
        fullJobs.map((job, index) => (
          <JobCard key={index} job={job} user={user} />
        ))}
    </div>
  )
}

export default Search
