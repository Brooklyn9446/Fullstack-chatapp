import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuth'
import { Eye, EyeOff, Lock, Mail, MessageSquare, User,Loader2 } from 'lucide-react'
import AuthImagePattern from '../components/AuthImagePattern'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const SignUp = () => {
  const [showPassword, setShowPasword] = useState(false)
  const [formdata, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if(!formdata.fullName.trim())return toast.error("Full name is required")
    if(!formdata.email.trim())return toast.error("Email is required")
    if(!/\S+@\S+\.\S+/.test(formdata.email))return toast.error("Invalid email format")
    if(!formdata.password)return toast.error("Password is required")
    if(formdata.password.length<6) return toast.error("Password must be atleast 6 characters")
      return true

  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const success=validateForm()
    console.log("Successfully validated ",success)
    if(success==true)signup(formdata)

  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2' >
      <div className='flex flex-col justify-center items-center p-6 sm:p-12' >
        <div className='w-full max-w-md space-y-8' >
          <div className='text-center mb-8' >
            <div className='flex flex-col items-center gap-2 group' >
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors' >
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60 '> Get starte with your free account</p>
            </div>

          </div>

          <form onSubmit={handleSubmit} className='space-y-6' >
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium' >Full name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-base-content/40' ></User>
                </div>
                <input type='text' className={'input input-bordered w-full pl-10'}
                  placeholder='John Doe'
                  value={formdata.fullName}
                  onChange={(e) => { setFormData({ ...formdata, fullName: e.target.value }) }}>

                </input>
              </div>

            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium' >Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='bg-white size-5 text-base-content/40'></Mail>
                </div>
                <input type='text' className={'input input-bordered w-full pl-10'}
                  placeholder='Johndoe@gmail.com'
                  value={formdata.email}
                  onChange={(e) => { setFormData({ ...formdata, email: e.target.value }) }}>

                </input>
              </div>
            </div>

            <div className='form-control'>
              <label className='label'
              >
                <span className='label-text font-medium'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none '>
                  <Lock className='size-5 text-base-content/40' />

                </div>
                <input
                type={showPassword?"text":"password"}
                className={'input input-bordered w-full pl-10 '}
                placeholder='......'
                value={formdata.value}
                onChange={(e)=>setFormData({...formdata,password:e.target.value})}
                ></input>
                <button type="button"
                className='absolute inset-y-0 right-0 pr-3  flex items-center'
                onClick={()=>setShowPasword(!showPassword)}
                >
                  {showPassword?(
                    <EyeOff className='size-5 text-base-content/40'/>
                  ):(<Eye className='size-5 text-base-content/40'></Eye>)
                }

                </button>
              </div>
            </div>

             <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
              <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>

      </div>

      
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default SignUp