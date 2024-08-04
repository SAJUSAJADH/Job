'use client'

import CandidateJobCard from '../candidate-job-card'

function FeaturedJobs({ profileInfo, jobList, featured, jobApplications }) {
  return (
    <div>
      <div className='mx-auto max-w-7xl min-h-[70vh]'>
        <div className='flex items-baseline dark:border-white justify-between border-b border-gray-200 pb-6 pt-24'>
          <h1 className='text-xl dark:text-white font-bold tracking-tight text-gray-900'>
            "Explore Featured Jobs"
          </h1>
        </div>
        <div className='pt-6 pb-24'>
          <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3'>
            <div className='lg:col-span-4'>
              <div className='container mx-auto p-0 space-y-8'>
                <div className='grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3'>
                  {featured && featured.length > 0
                    ? featured.map((feature) => (
                        <CandidateJobCard
                          profileInfo={profileInfo}
                          jobItem={feature}
                          jobApplications={jobApplications}
                        />
                      ))
                    : jobList.map((jobItem) => (
                      <CandidateJobCard
                        profileInfo={profileInfo}
                        jobItem={jobItem}
                        jobApplications={jobApplications}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedJobs
