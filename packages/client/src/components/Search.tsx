import React from 'react'
import InputField from './InputField'

const Search: React.FC = () => {
  const handleSearch = () => {
    console.log('Search')
  }
  // Notes:
  // Call function that searches users: friends & servers
  // Stuff them in an array and filter based on input value
  // Section with 5 possible searches "like google search"

  return (
    <section className="flex justify-center">
      <div className="w-[80%] mt-8">
        <input
          name="search"
          placeholder="Find or Start a conversation"
          onInput={() => handleSearch()}
          className="w-full text-center rounded-sm py-1 bg-gray-800 text-gray-400"
        />
      </div>
    </section>
  )
}

export default Search
