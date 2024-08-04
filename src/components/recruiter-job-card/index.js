'use client'

import { useState } from 'react'
import CommonCard from '../common-card'
import JobIcon from '../job-icon'
import JobApplicants from '../job-applicants'
import { postNewJobFormControls } from '@/utils'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import CommonForm from '../common-form'
import { deleteJobAction, updateJobAction } from '@/actions'
import { Trash2Icon } from 'lucide-react'

function RecruiterJobCard({ jobItem, jobApplications }) {
  const initialPostNewJobFormData = {
    companyName: jobItem?.companyName,
    title: jobItem?.title,
    type: jobItem?.type,
    location: jobItem?.location,
    experience: jobItem?.experience,
    description: jobItem?.description,
    skills: jobItem?.skills,
  }
  const [showApplicantsDrawer, setShowApplicantsDrawer] = useState(false)
  const [currentCandidateDetails, setCurrentCandidateDetails] = useState(null)
  const [
    showCurrentCandidateDetailsModal,
    setShowCurrentCandidateDetailsModal,
  ] = useState(false)
  const [showJobDialog, setShowJobDialog] = useState(false)
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: jobItem?.companyName,
  })
  function handlePostNewBtnValid() {
    return Object.keys(jobFormData).every(
      (control) => jobFormData[control].trim() !== ''
    )
  }

  async function updateJob() {
    await updateJobAction(
      {
        ...jobFormData,
      },
      '/jobs',
      jobItem._id
    )

    setJobFormData({
      ...initialPostNewJobFormData,
      companyName: jobItem?.companyName,
    })
    setShowJobDialog(false)
  }

  function handleAddNewJob() {
    setShowJobDialog(true)
  }

  console.log(jobItem)

  return (
    <div>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false)
          setJobFormData({
            ...initialPostNewJobFormData,
            companyName: jobItem?.companyName,
          })
        }}
      >
        <DialogContent className='sm:max-w-screen-md h-[600px] overflow-auto'>
          <DialogHeader>
            <DialogTitle>Update the job info</DialogTitle>
            <div className='grid gap-4 py-4'>
              <CommonForm
                buttonText={'update'}
                formData={jobFormData}
                setFormData={setJobFormData}
                formControls={postNewJobFormControls}
                isBtnDisabled={!handlePostNewBtnValid()}
                action={updateJob}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <CommonCard
        icon={<JobIcon />}
        title={jobItem?.title}
        location={jobItem?.location}
        type={jobItem?.type}
        footerContent={
          <>
            <button
              onClick={() => setShowApplicantsDrawer(true)}
              className=' mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer'
              disabled={
                jobApplications.filter((item) => item.jobID === jobItem?._id)
                  .length === 0
              }
            >
              {
                jobApplications.filter((item) => item.jobID === jobItem?._id)
                  .length
              }{' '}
              Applicants
            </button>
            <button
              onClick={handleAddNewJob}
              className=' mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer'
            >
              update
            </button>
            <button
              onClick={() => deleteJobAction('/jobs', jobItem._id)}
              className=' mr-2 my-1 uppercase tracking-wider px-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer'
            >
              <Trash2Icon />
            </button>
          </>
        }
      />
      <JobApplicants
        showApplicantsDrawer={showApplicantsDrawer}
        setShowApplicantsDrawer={setShowApplicantsDrawer}
        showCurrentCandidateDetailsModal={showCurrentCandidateDetailsModal}
        setShowCurrentCandidateDetailsModal={
          setShowCurrentCandidateDetailsModal
        }
        currentCandidateDetails={currentCandidateDetails}
        setCurrentCandidateDetails={setCurrentCandidateDetails}
        jobItem={jobItem}
        jobApplications={jobApplications.filter(
          (jobApplicantItem) => jobApplicantItem.jobID === jobItem?._id
        )}
      />
    </div>
  )
}

export default RecruiterJobCard
