import React from 'react';

const HighlightText = ({ textToHighlight, searchText }) => {
  const getHighlightedText = (text, query) => {
    if (typeof query === 'string') {
      const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escapedQuery})`, 'gi');
      return text.split(regex);
    }
    return [text];
  };

  return (
    <span>
      {getHighlightedText(textToHighlight, searchText).map((part, index) => {
        // Check if searchQuery is defined and a string before calling toLowerCase
        const highlightedPart =
          typeof part === 'string' && searchText ? part.toLowerCase() : part;

        return highlightedPart === (searchText && searchText.toLowerCase()) ? (
          <mark key={index} className='highlighted-text'>
            {part}
          </mark>
        ) : (
          part
        );
      })}
    </span>
  );
};

export default HighlightText;
