import { SignIn } from '@clerk/clerk-react'

const LoginPage=()=> {
  return (
    <div className='flex items-center justify-center h-[calc(100vh-4rem)]'>
      <SignIn signUpUrl='./register'/>
    </div>
  )
}

export default LoginPage