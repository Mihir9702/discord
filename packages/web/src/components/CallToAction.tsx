import React from 'react'

const CallToAction: React.FC = () => {
  return (
    <section>
      <div className="home-cta bg-dark-300 p-12 flex flex-col items-center">
        <h1 className="text-lg text-blue-600">Get Started</h1>
        <button className="bg-blue-400 text-white rounded-md px-8 py-2">Download</button>
      </div>
    </section>
  )
}

export default CallToAction
