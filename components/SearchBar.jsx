import React from 'react'

const SearchBar = ({value, onChange, placeholder}) => {
  const handleInputChange = (e) => {
    const sanitizedInput = e.target.value
      .toString()
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  
    onChange(sanitizedInput);
  }

  return (
    <form className='relative w-full flex-center'>
      <input 
        className='search_input peer'
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        required
      />
    </form>
  )
}

export default SearchBar