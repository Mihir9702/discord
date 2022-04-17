import React from 'react'
import { SearchIcon } from '../../../web/src/components/Icons'

const Search: React.FC = () => {
  const handleSearch = () => {
    console.log('Search')
  }

  return (
    <div className="stick top-0 pointer-events-none">
      <div className="h-10" />
      <div className="relative pointer-events-auto">
        <label
          htmlFor="search"
          className="flex mx-auto text-text justify-center items-center relative"
        >
          <input
            name="search"
            onClick={handleSearch}
            className="hidden text-center w-full lg:flex items-center bg-gray-900 text-sm leading-6 rounded-md shadow-md p-2"
            placeholder="Ctrl + K"
          />
          <div className="absolute left-0 top-0 justify-center items-center p-2">
            <SearchIcon />
          </div>
        </label>
      </div>
      <div className="h-8 bg-background" />
    </div>
  )
}

export default Search
