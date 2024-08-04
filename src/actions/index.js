'use server'

import connectToDB from '@/database'
import Application from '@/models/application'
import Feed from '@/models/feed'
import Job from '@/models/job'
import Profile from '@/models/profile'
import { currentUser } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

//check account status

export async function CheckAccuntStats(id) {
  await connectToDB()
  const account = await Profile.findOne({ userId: id })
  if (account) {
    return account.active
  }
  return false
}

//create profile action
export async function createProfileAction(formData, pathToRevalidate) {
  await connectToDB()
  await Profile.create(formData)
  revalidatePath(pathToRevalidate)
}

export async function fetchProfileAction(id) {
  await connectToDB()
  const result = await Profile.findOne({ userId: id })

  return JSON.parse(JSON.stringify(result))
}

//create job action

export async function postNewJobAction(formData, pathToRevalidate) {
  // const user = await currentUser()
  const stat = await CheckAccuntStats(formData.recruiterId)
  if (stat === false) {
    redirect('/suspended')
    return
  }
  await connectToDB()

  await Job.create(formData)
  revalidatePath(pathToRevalidate)
}

//update job

export async function updateJobAction(formData, pathToRevalidate, id) {
  const user = await currentUser()
  const stat = await CheckAccuntStats(user?.id)
  if (stat === false) {
    redirect('/suspended')
    return
  }
  await connectToDB()
  await Job.findByIdAndUpdate(id, formData)
  revalidatePath(pathToRevalidate)
}

//delete job

export async function deleteJobAction(pathToRevalidate, id) {
  const stat = await CheckAccuntStats(formData.userId)
  if (stat === false) {
    redirect('/suspended')
    return
  }
  await connectToDB()
  await Job.findByIdAndDelete(id)
  revalidatePath(pathToRevalidate)
}

//fetch job action
//recruiter
export async function fetchJobsForRecruiterAction(id) {
  await connectToDB()
  const result = await Job.find({ recruiterId: id })

  return JSON.parse(JSON.stringify(result))
}
//candidate
export async function fetchJobsForCandidateAction(filterParams = {}) {
  await connectToDB()
  let updatedParams = {}
  Object.keys(filterParams).forEach((filterKey) => {
    updatedParams[filterKey] = { $in: filterParams[filterKey].split(',') }
  })
  console.log(updatedParams, 'updatedParams')
  const result = await Job.find(
    filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
  )

  return JSON.parse(JSON.stringify(result))
}

//create job application

export async function createJobApplicationAction(data, pathToRevalidate) {
  const user = await currentUser()
  const stat = await CheckAccuntStats(user?.id)
  if (stat === false) {
    console.log('blocked')
    redirect('/suspended')
    return
  }
  await connectToDB()
  await Application.create(data)
  revalidatePath(pathToRevalidate)
}

//fetch job applications - candidate
export async function fetchJobApplicationsForCandidate(candidateID) {
  await connectToDB()
  const result = await Application.find({ candidateUserID: candidateID })

  return JSON.parse(JSON.stringify(result))
}

//fetch job applications - recruiter

export async function fetchJobApplicationsForRecruiter(recruiterID) {
  await connectToDB()
  const result = await Application.find({ recruiterUserID: recruiterID })

  return JSON.parse(JSON.stringify(result))
}

//update job application
export async function updateJobApplicationAction(data, pathToRevalidate) {
  const user = await currentUser()
  const stat = await CheckAccuntStats(user?.id)
  if (stat === false) {
    redirect('/suspended')
    return
  }
  await connectToDB()
  const {
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    _id,
    jobAppliedDate,
  } = data
  await Application.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jobAppliedDate,
    },
    { new: true }
  )
  revalidatePath(pathToRevalidate)
}

//get candidate detAils by candidate ID
export async function getCandidateDetailsByIDAction(currentCandidateID) {
  await connectToDB()
  const result = await Profile.findOne({ userId: currentCandidateID })

  return JSON.parse(JSON.stringify(result))
}

//create filter categories
export async function createFilterCategoryAction() {
  await connectToDB()
  const result = await Job.find({})

  return JSON.parse(JSON.stringify(result))
}

//update profile action
export async function updateProfileAction(data, pathToRevalidate) {
  const user = await currentUser()
  const stat = await CheckAccuntStats(user?.id)
  if (stat === false) {
    redirect('/suspended')
    return
  }
  await connectToDB()
  const {
    userId,
    role,
    email,
    isPremiumUser,
    memberShipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,
    _id,
  } = data

  await Profile.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      userId,
      role,
      email,
      isPremiumUser,
      memberShipType,
      memberShipStartDate,
      memberShipEndDate,
      recruiterInfo,
      candidateInfo,
    },
    { new: true }
  )

  revalidatePath(pathToRevalidate)
}

//create post action
export async function createFeedPostAction(data, pathToRevalidate) {
  const user = await currentUser()
  const stat = await CheckAccuntStats(user?.id)
  if (stat === false) {
    redirect('/suspended')
    return
  }
  await connectToDB()
  await Feed.create(data)
  revalidatePath(pathToRevalidate)
}

//fetch all posts action
export async function fetchAllFeedPostsAction() {
  await connectToDB()
  const result = await Feed.find({})

  return JSON.parse(JSON.stringify(result))
}

//update post action
export async function updateFeedPostAction(data, pathToRevalidate) {
  const user = await currentUser()
  const stat = await CheckAccuntStats(user?.id)
  if (stat === false) {
    redirect('/suspended')
    return
  }
  await connectToDB()
  const { userId, userName, message, image, likes, _id } = data
  await Feed.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      userId,
      userName,
      image,
      message,
      likes,
    },
    { new: true }
  )

  revalidatePath(pathToRevalidate)
}

//delete feed

export async function deleteFeedPostAction(id, pathToRevalidate) {
  const user = await currentUser()
  const stat = await CheckAccuntStats(user?.id)
  if (stat === false) {
    redirect('/suspended')
    return
  }
  await connectToDB()
  await Feed.findByIdAndDelete(id)
  revalidatePath(pathToRevalidate)
}

//suspend account

export async function suspendAccounts(identifier, repath) {
  await connectToDB()
  await Profile.findOneAndUpdate({ userId: identifier }, { active: false })
  revalidatePath(repath)
}

//enable account

export async function EnableAccounts(identifier, repath) {
  await connectToDB()
  await Profile.findOneAndUpdate({ userId: identifier }, { active: true })
  revalidatePath(repath)
}
