'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {
  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState(""); 

  const hasUsername = post?.creator?.username;
  const hasImageSrc = post?.creator?.image;
  const hasSessionId = session?.user.id;
  const hasUserId = post?.creator?._id;
  const fallbackImage = './assets/images/logo.svg';
  const creatorImageSrc = hasImageSrc ? hasImageSrc : fallbackImage;
  // const hasEmail = post?.creator?.email;
  
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 4000);
  }

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${encodeURIComponent(post.creator.username)}`);
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={handleProfileClick}>
          <Image 
            src={creatorImageSrc}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='user-text-details'>
            <h3>{post.highlightedUsername ? (
              <span>{post.highlightedUsername}</span>
            ) : (
              hasUsername
            )}
            </h3>
            {
              // I decided not to add the email because I don't want to expose the users that much
              //<p>{hasEmail}</p>
            }
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image 
            src={
              copied === post.prompt 
              ? '/assets/icons/tick.svg' 
              : '/assets/icons/copy.svg'
            }
            width={24}
            height={24}
            alt='icon'
          />
        </div>
      </div>
        <p 
          className='my-4 font-satoshi text-sm text-gray-700'
        >
          {post.highlightedPrompt ? (
            <span>{post.highlightedPrompt}</span>
          ) : (
            post.prompt
          )}
        </p>
        <p 
          className='font_inter text-sm blue_gradient cursor-pointer'
          onClick={() => handleTagClick && handleTagClick(post.tag)}>
          {post.highlightedTag ? (
            <span>{post.highlightedTag}</span>
          ) : (
            <span>#{post.tag}</span>
          )}
        </p>

        {hasSessionId === hasUserId && pathName === '/profile' && (
          <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          {
            //I need to change the delete and edit buttons
          }
          
          <div className='bg-green-600 cursor-pointer py-3 px-8 rounded-xl'>
            <p 
              className='font-inter text-sm'
              onClick={handleEdit}
            >
              Edit
            </p>
          </div>
            
            <div className='bg-orange-600 cursor-pointer py-3 px-6 rounded-xl'>
              <p 
                className='font-inter text-sm'
                onClick={handleDelete}
              >
                Delete
              </p>
            </div>
          </div>
        )}
    </div>
  )
}

export default PromptCard