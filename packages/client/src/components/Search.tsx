import React from 'react'

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
      <div className="w-[90%] mt-8">
        <form>
          <input
            className="w-56 px-3 py-2 text-gray-400 bg-background rounded-xl focus:outline-0"
            type="text"
            placeholder="Find or Start a conversation"
          />
        </form>
        {/* <input
          name="search"
          placeholder="Find or Start a conversation"
          onInput={() => handleSearch()}
          className="w-full text-center rounded-sm py-1 bg-gray-800 text-gray-400"
        /> */}
      </div>
    </section>
  )
}

export default Search
