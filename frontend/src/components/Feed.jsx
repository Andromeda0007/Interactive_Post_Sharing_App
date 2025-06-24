import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'

const Feed = () => {
  const { tweets } = useSelector((store) => store.tweet);

  return (
    <div className='feed w-1/2 bg-gray-50 p-2 border-x-1 border-gray-100'>
      <CreatePost />
      <div className='h-[69%] overflow-y-scroll'>
        {
          tweets?.length > 0 ? (
            tweets.map((tweet) => (
              <Tweet id={tweet._id} tweet={tweet} />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-5">No tweets found.</p>
          )
        }
      </div>
    </div>
  )
}

export default Feed
