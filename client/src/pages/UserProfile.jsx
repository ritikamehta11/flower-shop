import { UserContext } from '@/context/UserContext'
import React, { useContext } from 'react'

export const UserProfile = () => {

  const { user } = useContext(UserContext);
  return (
    <>
      <section className='h-screen flex flex-col'>
        <Header />

        <section className='hero  w-3/4 mx-auto my-10 flex flex-col gap-4  p-4'>
          <h1 className='logo'>Hello {user.name}, </h1>
          <div className='flex flex-row flex-wrap mb-8 gap-5' >
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>Phone : {user.phone}</p>
            <button>Edit</button>

          </div>
        </section>
      </section>
    </>
   
  )
}
