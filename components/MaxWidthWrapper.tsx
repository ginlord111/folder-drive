import React from 'react'
import { cn } from '@/lib/utils'
const MaxWidthWrapper = ({children, className}:{className?:string, children:React.ReactNode}) => {
  return (
   <div className={cn('mx-auto w-full max-w-screen-xl px-5 md:px-10', className)}>
    {children}
   </div>
  )
}

export default MaxWidthWrapper