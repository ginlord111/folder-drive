import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

const Header = () => {
  return (
  <div className='bg-white sticky z-50 top-0 inset-x-0 h-16 w-full'>
    <header className='relative'>
      <MaxWidthWrapper>
        <div className='border-b border-gray-20'>
          <div className='flex h-16 items-center'>
          {/* FOR MOBILE VIEW */}

          <div className='md:ml-4 lg:ml-0'>
            this is logo8
          </div>
          <div className="ml-auto flex ">
            <div className="hidden lg:flex  lg:space-x-5 ">
            <OrganizationSwitcher />
            <UserButton />
            </div>
          </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  </div>
  )
}

export default Header