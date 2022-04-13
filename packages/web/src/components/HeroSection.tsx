import React from 'react'

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-4 flex">
      <div className="mx-auto px-4 py-32">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 p-4">
            <h1 className="title text-6xl font-bold leading-tight">Imari</h1>
            <p className="text-xl font-light leading-relaxed mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, quisquam.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Learn More
            </button>
          </div>
          <div className="w-full lg:w-1/2">
            <img
              className="h-64 w-full object-cover object-center rounded-lg"
              src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
              alt="hero"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
