'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';
import SearchBar from './SearchBar';

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      // Update our State
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filterAndHighlightPosts = (searchText) => {
    return posts.map((post) => {
      const applyHighlight = (textPart, index) => {
        return textPart.toLowerCase() === searchText.toLowerCase() ? (
          <mark key={index} className='highlighted-text'>
            {textPart}
          </mark>
        ) : (
          textPart
        );
      };

      // Helper to handle filtering and highlight for an atttribute

      const filterAndHighlightAttribute = (attribute) => {
        if (!searchText || !attribute?.toLowerCase().includes(searchText.toLowerCase())){
          return null;
        }

        const matchedParts = attribute.split(
          new RegExp(`(${searchText})`, 'gi')
        );

        return matchedParts.map((textPart, index) => applyHighlight(textPart));
      }

      const highlightedPrompt = filterAndHighlightAttribute(post.prompt);
      const highlightedTag = filterAndHighlightAttribute(post.tag);
      const highlightedUsername = post?.creator?.username ? 
        filterAndHighlightAttribute(post.creator.username) : 
        null;
        
      return {
        ...post,
        highlightedPrompt,
        highlightedTag,
        highlightedUsername
      };
    });
  };

  const filteredAndHighlightedPosts = filterAndHighlightPosts(searchText);

  const handleSearchChange = (value) => {
    setSearchText(value);
  };

  const handleTagClick = (value) => {
    setSearchText(value);
  }

  return (
    <section className='feed'>
      <SearchBar
        placeholder='Search a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
      />

      <div className='mt-16 prompt_layout'>
        {filteredAndHighlightedPosts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </section>
  );
};

export default Feed;