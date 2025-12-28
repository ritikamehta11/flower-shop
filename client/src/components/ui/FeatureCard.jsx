import React from 'react'

export const FeatureCard = (props) => {
  return (
    <div className='p-6 space-y-4'>
      <div className='text-5xl'>{props.icon}</div>
      
      <h3 className='text-xl md:text-2xl font-semibold text-primary'>{props.title}</h3>
      <p className='text-gray-600 leading-relaxed'>
        {props.description}
      </p>
    </div>
  )
}
