import { SignUp } from '@clerk/clerk-react'
import React from 'react'

export default function Register() {
  return (
    <div className='flex items-center justify-center h-[calc(100vh-4rem)]'>
      <SignUp signInUrl='./login'/>
    </div>
  )
}
