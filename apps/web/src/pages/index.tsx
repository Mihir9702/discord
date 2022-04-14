import React from 'react'
import HeroSection from '../components/HeroSection'
import PreviewSection from '../components/PreviewSection'
import FeatureSection from '../components/FeatureSection'
import CallToAction from '../components/CallToAction'
import ExtraSection from '../components/ThirdSection'

// * Rough layout of Home page
export default () => {
  return (
    <React.Fragment>
      <HeroSection />
      <PreviewSection />
      <FeatureSection />
      <ExtraSection />
      <CallToAction />
    </React.Fragment>
  )
}
