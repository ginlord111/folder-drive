import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'

const Header = () => {
  return (
  <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
    <header className='relative'>
      <MaxWidthWrapper>
        <div className='border-b border-gray-20'>
    
        </div>
      </MaxWidthWrapper>
    </header>
  </div>
  )
}

export default Header