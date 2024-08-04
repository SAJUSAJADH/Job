'use client'

import { Fragment, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent } from '../ui/dialog'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { CirclePlus, Heart, Trash2Icon } from 'lucide-react'
import { Input } from '../ui/input'
import { createClient } from '@supabase/supabase-js'
import {
  createFeedPostAction,
  deleteFeedPostAction,
  updateFeedPostAction,
} from '@/actions'

const subbaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const subbaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabaseClient = createClient(subbaseUrl, subbaseKey)

function Feed({ user, profileInfo, allFeedPosts }) {
  const [showPostDialog, setShowPostDialog] = useState(false)
  const [formData, setFormData] = useState({
    message: '',
    imageURL: '',
  })
  const [imageData, setImageData] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleFileOnChange(event) {
    event.preventDefault()
    setImageData(event.target.files[0])
  }

  function handleFetchImagePublicUrl(getData) {
    const { data } = supabaseClient.storage
      .from('job-board-public')
      .getPublicUrl(getData.path)

    console.log(data)

    if (data)
      setFormData({
        ...formData,
        imageURL: data.publicUrl,
      })
  }

  async function handleUploadImageToSupabase() {
    const { data, error } = await supabaseClient.storage
      .from('job-board-public')
      .upload(`/public/${imageData?.name}`, imageData, {
        cacheControl: '3600',
        upsert: false,
      })

    console.log(data, error)

    if (data) handleFetchImagePublicUrl(data)
  }

  async function handleSaveFeedPost() {
    setLoading(true)
    await createFeedPostAction(
      {
        userId: user?.id,
        userName:
          profileInfo?.candidateInfo?.name || profileInfo?.recruiterInfo?.name,
        message: formData?.message,
        image: formData?.imageURL,
        likes: [],
      },
      '/feed'
    )

    setFormData({
      imageURL: '',
      message: '',
    })
    setLoading(false)
  }

  async function handleUpdateFeedPostLikes(getCurrentFeedPostItem) {
    let cpyLikesFromCurrentFeedPostItem = [...getCurrentFeedPostItem.likes]
    const index = cpyLikesFromCurrentFeedPostItem.findIndex(
      (likeItem) => likeItem.reactorUserId === user?.id
    )

    if (index === -1)
      cpyLikesFromCurrentFeedPostItem.push({
        reactorUserId: user?.id,
        reactorUserName:
          profileInfo?.candidateInfo?.name || profileInfo?.recruiterInfo?.name,
      })
    else cpyLikesFromCurrentFeedPostItem.splice(index, 1)

    getCurrentFeedPostItem.likes = cpyLikesFromCurrentFeedPostItem
    await updateFeedPostAction(getCurrentFeedPostItem, '/feed')
  }

  useEffect(() => {
    if (imageData) handleUploadImageToSupabase()
  }, [imageData])

  console.log(allFeedPosts)

  return (
    <Fragment>
      <div className='mx-auto min-h-[70vh]'>
        <div className='flex items-baseline justify-between dark:border-white border-b pb-6 pt-24'>
          <h1 className='dark:text-white text-xl font-bold tracking-tight text-gray-800'>
            Explore Feed
          </h1>
          <div className='flex items-center'>
            <Button
              onClick={() => setShowPostDialog(true)}
              className='flex bg-blue-500 text-white hover:bg-blue-600 h-11 items-center justify-center px-5'
            >
              Add New Post
            </Button>
          </div>
        </div>
        <div className='py-12 w-full'>
          <div className='w-full m-auto p-0 grid lg:grid-cols-2 gap-2 text-gray-700'>
            {allFeedPosts && allFeedPosts.length > 0 ? (
              allFeedPosts.map((feedPostItem) => (
                <div
                  key={feedPostItem._id}
                  className='group relative  p-3 rounded-3xl bg-slate-300 hover:bg-white hover:shadow-2xl cursor-auto shadow-2xl shadow-transparent gap-8 flex'
                >
                  <div className='sm:w-2/6 rounded-3xl overflow-hidden transition-all duration-500 group-hover:rounded-xl'>
                    <img
                      src={feedPostItem?.image}
                      alt='Post'
                      className=' w-full h-full object-cover object-top transition duration-500 group-hover:scale-105'
                    />
                  </div>
                  <div className='sm:p-2 sm:pl-0 sm:w-4/6'>
                    <span className='mt-4 mb-2 inline-block font-medium text-gray-500 sm:mt-0'>
                      {feedPostItem?.userName}
                    </span>
                    <h3 className='mb-6 text-sm font-bold text-gray-900'>
                      {feedPostItem?.message}
                    </h3>
                    <div className='flex justify-between gap-5'>
                      <div className='flex gap-5'>
                        <Heart
                          size={25}
                          fill={
                            feedPostItem?.likes?.length > 0
                              ? '#FF0000'
                              : '#ffffff'
                          }
                          className={`cursor-pointer text ${feedPostItem?.likes?.length > 0 && 'text-white'}`}
                          onClick={() =>
                            handleUpdateFeedPostLikes(feedPostItem)
                          }
                        />
                        <span className='font-semibold text-xl'>
                          {feedPostItem?.likes?.length}
                        </span>
                      </div>
                      <Trash2Icon
                        onClick={() =>
                          deleteFeedPostAction(feedPostItem._id, '/feed')
                        }
                        size={40}
                        className='cursor-pointer border border-purple-700 px-2 py-1 rounded-md text-7xl hover:bg-purple-700 hover:text-white'
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1>No posts found!</h1>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={showPostDialog}
        onOpenChange={() => {
          setShowPostDialog(false)
          setFormData({
            message: '',
            imageURL: '',
          })
        }}
      >
        <DialogContent className='h-[550px]'>
          <Textarea
            name='message'
            value={formData?.message}
            onChange={(event) =>
              setFormData({
                ...formData,
                message: event.target.value,
              })
            }
            placeholder='What do you want to talk about?'
            className='border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-[200px] text-[28px]'
          />

          <div className='flex gap-5 items-center justify-between'>
            <Label for='imageURL'>
              <CirclePlus />
              <Input
                onChange={handleFileOnChange}
                className='hidden'
                id='imageURL'
                type='file'
              />
            </Label>
            <Button
              onClick={handleSaveFeedPost}
              disabled={
                (formData?.imageURL === '' && formData?.message === '') ||
                loading
              }
              className='flex w-40 h-11 items-center justify-center px-5 disabled:opacity-65'
            >
              {loading ? 'posting...' : 'Post'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default Feed
