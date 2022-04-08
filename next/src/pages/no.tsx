import Nav from '@components/Nav'
import HeroSection from '@components/HeroSection'
import PreviewSection from '@components/PreviewSection'
import FeatureSection from '@components/FeatureSection'
import CallToAction from '@components/CallToAction'
import Footer from '@components/Footer'
import type { NextPage } from 'next'
import ExtraSection from '@components/ThirdSection'

// * Rough layout of Home page
const Home: NextPage = () => {
  return (
    <>
      <HeroSection />
      <PreviewSection />
      <FeatureSection />
      <ExtraSection />
      <CallToAction />
    </>
  )
}

export default Home
