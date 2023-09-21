'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = () => {
  const {data: session} = useSession();
  const [myPosts, setMyPosts] = useState([]);
  const userId = session?.user.id;
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setMyPosts(data);
    }

    if(userId) fetchPosts();
  }, [userId]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }

  const handleDelete = async (post) => {
    const hasConfirmedDelete = confirm(`Are you sure you would like to delete this prompt? 
    \nThis action is irreversible`);
    
    if(hasConfirmedDelete){
      try {
        //passing the options object with the delete method
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });

        const filteredPosts = posts.filter((postToBeFiltered) => postToBeFiltered._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile
      name='My'
      description='Welcome to your personalised profile page'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage