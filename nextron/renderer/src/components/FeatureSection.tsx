import React from 'react'
import Image from 'next/image'
import calls from '@assets/calls.svg'

const FeatureSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-4">
      <div className="mx-auto px-4 py-28">
        <div className="flex flex-wrap">
          <div className="w-full flex flex-col justify-center text-center items-center lg:w-1/2 p-4">
            <h1 className="title text-6xl text-blue-900 font-bold leading-tight">Imari</h1>
            <p className="text-lg font-light leading-relaxed my-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates minima neque
              ipsum soluta sapiente, incidunt assumenda veniam accusantium quo commodi voluptatum
              numquam illo quaerat ad explicabo, qui quia tempora? Cumque!
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Learn More
            </button>
          </div>
          <div className="w-full lg:w-1/2">
            <Image
              src={calls}
              alt="preview"
              layout="responsive"
              className="h-64 w-full object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
