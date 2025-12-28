import Header from '@/components/Header'
import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/images/homepageMain.png'
import { Footer } from '@/components/Footer'
import { FeatureCard } from '@/components/ui/FeatureCard'


const features = [
  {
    icon: "🌸",
    title: "Freshness Guaranteed",
    description: "We source our flowers daily to ensure you receive the freshest blooms possible.",
  },
  {
    icon: "✏️",
    title: "Custom Arrangements",
    description: "Our expert florists create personalized arrangements to suit any occasion.",
  },
  {
    icon: "♻️",
    title: "Sustainable Practices",
    description: "We are committed to eco-friendly practices, from sourcing to packaging.",
  },  

]

export default function Home()  {
  return (
    <section className='h-screen flex flex-col'>
      <Header/>
      <section className='hero w-3/4 h-1/3 md:h-full md:w-2/4 mx-auto my-10 flex gap-4  p-4'>
        <img className='w-2/5 md:w-2/4 h-2/3 md:h-full' src={img}></img>
        <div className='place-content-center '>
          <h1 className='text-sm md:text-4xl mb-7 font-normal'>Welcome to <span className='logo text-md md:text-4xl block'>Petal Palette</span></h1>
          <p className='sub-head text-sm md:text-xl font-thin capitalize mb-7 text-left'>handpicked flowers,<span className='text-right block'> thoughtfully arranged</span></p>
          <Link to='/main'><button className='pri-btn btn block px-5 md:px-9 py-1 text-center font-thin text-xs md:text-lg rounded-sm'>Shop Now</button></Link>
        </div>
<br></br>
      </section>
      <section className='bg-white py-12 md:py-16'>
        <div className='max-w-7xl mx-auto px-4 md:px-8 lg:px-16'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center'>
      {features.map((feature, index) => (
        <div key={index} className='feature-card border-2 border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-3/4 md:w-full mx-auto my-5'>
          <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
        </div>
      ))}
          </div>
        </div>
      </section>
      <Footer/>
    </section>
  )
}
