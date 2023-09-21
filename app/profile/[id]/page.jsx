'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from 'P';

const UserProfilePage = ({params}) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');
  const paramsId = params?.id;
  const usersPostsApi = `/api/users/${paramsId}/posts`;

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(usersPostsApi);
      const data = await response.json();

      setUserPosts(data);
    }

    if(paramsId) fetchPosts();
  }, [params.id]);


  return (
    <Profile
      name={userName}
      description={`Welcome to ${userName} personalised profile page`}
      data={userPosts}
    />
  );
};

export default UserProfilePage