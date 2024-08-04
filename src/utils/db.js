import mongoose from 'mongoose'
import Profile from '@/models/profile' // Assuming the Profile model is in this path
import connectToDB from '@/database'
import Job from '@/models/job'

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export async function getProfiles(search, offset = 0) {
  const query = {
    $and: [
      { role: { $ne: 'admin' } },
      search
        ? {
            $or: [
              { 'candidateInfo.name': { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
            ],
          }
        : {},
    ],
  }

  const profiles = await Profile.find(query).skip(offset).limit(5).exec()
  const totalProfiles = await Profile.countDocuments(query).exec()

  const newOffset = profiles.length >= 5 ? offset + 5 : null

  return {
    profiles,
    newOffset,
    totalProfiles,
  }
}

export async function getRecruiters(search, offset = 0) {
  await connectToDB()

  const query = search

  // Fetch recruiters based on the query with pagination
  const recruiters = await Profile.find(query).skip(offset).limit(5).exec()
  const totalRecruiters = await Profile.countDocuments(query).exec()

  // Calculate the new offset
  const newOffset = recruiters.length >= 5 ? offset + 5 : null

  return {
    recruiters,
    newOffset,
    totalRecruiters,
  }
}
