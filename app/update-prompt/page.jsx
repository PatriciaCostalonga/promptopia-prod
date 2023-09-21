'use client';

import { useEffect, useState } from 'react';
import { useRouter , useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdatePrompt = () => {
  const router =  useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  //are we currently submitting the form?
  const [ submitting, setIsSubmitting ] = useState(false);
  const [ post, setPost ] = useState({
    prompt: '',
    tag: '',
  });

  //this will take effect whenever the promptId changes. The prompt id comes from the request query by using useSeacrhParams
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);

      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if(promptId) getPromptDetails();
  }, [promptId]);

  const editPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    //for the furture it would be nicer to add a notification instead of an alert
    if(!promptId) return alert('Prompt ID not found');

    try 
    {
      const response = await fetch(`/api/prompt/${promptId}`, 
      {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

export default UpdatePrompt;