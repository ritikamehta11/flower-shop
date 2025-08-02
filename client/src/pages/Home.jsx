import Header from '@/components/Header'
import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/images/homepageMain.png'
import { Footer } from '@/components/Footer'

export default function Home()  {
  return (
    <section className='h-screen flex flex-col'>
      <Header/>
      <section className='hero w-3/4 h-1/3 md:h-full md:w-2/4 mx-auto my-10 flex gap-4  p-4'>
        <img className='w-2/4' src={img}></img>
        <div className='place-content-center '>
          <h1 className='text-4xl mb-7 font-normal'>Welcome to <span className='logo text-4xl block'>Blossom Boutique</span></h1>
          <p className='sub-head text-xl font-thin capitalize mb-7 text-left'>handpicked flowers,<span className='text-right block'> thoughtfully arranged</span></p>
          <Link to='/main'><button className='pri-btn btn block px-9 py-1 text-center font-thin mx-auto'>Shop Now</button></Link>
        </div>

      </section>
      <Footer/>
    </section>
  )
}
