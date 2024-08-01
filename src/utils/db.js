import mongoose from 'mongoose';
import Profile from '@/models/profile'; // Assuming the Profile model is in this path

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function getProfiles(search, offset = 0) {
  const query = search
    ? { $or: [{ 'candidateInfo.name': { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] }
    : {};

  const profiles = await Profile.find(query).skip(offset).limit(5).exec();
  const totalProfiles = await Profile.countDocuments(query).exec();

  const newOffset = profiles.length >= 5 ? offset + 5 : null;

  return {
    profiles,
    newOffset,
    totalProfiles,
  };
}
