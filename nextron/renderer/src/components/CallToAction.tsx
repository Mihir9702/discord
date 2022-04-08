import React from 'react'

const CallToAction: React.FC = () => {
  return (
    <section>
      <div className="home-cta bg-gray-50 p-12 flex flex-col items-center">
        <h1 className="text-lg">Get Started</h1>
        <button className="bg-blue-400 px-8 py-2">Download</button>
      </div>
    </section>
  )
}

export default CallToAction
