'use client';

import { useState } from 'react';
//to know which user we are importing from:
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {
  const router =  useRouter();
  const { data: session } = useSession();

  //are we currently submitting the form?
  const [ submitting, setIsSubmitting ] = useState(false);
  const [ post, setPost ] = useState({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e) => {
    //we want the least amount of reloads as possible
    e.preventDefault();
    setIsSubmitting(true);

    try 
    {
      const response = await fetch("/api/prompt/new", 
      {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      })

      if (response.ok)
      {
        router.push('/');
      }
    } 
    catch (error) 
    {
      console.log('ERROR', error);
    }
    finally 
    {
      setIsSubmitting(false);
    }
  }

  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;