import React from 'react';
import CreatePost from './CreatePost';
import Tweet from './Tweet';
import { useSelector } from 'react-redux';

const Feed = () => {
  const { tweets, followingTweets, selectedTab } = useSelector((store) => store.tweet);

  // Determine which tweet array to show
  const activeTweets = selectedTab === "following" ? followingTweets : tweets;

  return (
    <div className='feed w-1/2 bg-gray-50 p-2 border-x-1 border-gray-100'>
      <CreatePost />

      <div className='h-[69%] overflow-y-scroll'>
        {activeTweets?.length > 0 ? (
          activeTweets.map((tweet) => (
            <Tweet key={tweet._id} id={tweet._id} tweet={tweet} />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-5">
            {selectedTab === "following" ? "No tweets from following users." : "No tweets found."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Feed;
