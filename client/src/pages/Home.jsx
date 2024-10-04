import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/images/homepageMain.png'
export default function Home()  {
  return (
    <section className='h-screen flex flex-col'>
      <Header/>
      <section className='hero bg-slate-100 w-2/4 m-auto flex  '>
        <img className='w-2/4' src={img}></img>
        <div className='place-content-center'>
          <h1>Welcome to <span className=''>Blossom Boutique</span></h1>
          <p>handpicked flowers, thoughtfully arranged</p>
          <Link to='/register'><button className='btn'>Shop Now</button></Link>
          <Link to='/login'><button className='btn'>Login</button></Link>

        </div>

    </section>
    </section>
  )
}
