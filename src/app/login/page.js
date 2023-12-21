"use client"
import SupStar from '@/components/SupStar'
import { DASHBOARD_ROUTE, FORGOTPASSWORD_ROUTE, HOME_ROUTE, SIGNUP_ROUTE } from '@/constants';
import { auth } from '@/services/firebase';
import useAuthentication from '@/services/useAuthentication';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  useAuthentication()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter()

  const onSubmit = async(data) => {
    // console.log(data)
    await signInWithEmailAndPassword(auth,data.email, data.password)
    .then((res) => {
      // console.log(res)
      toast.success("Logged in Successfully")
      router.push(DASHBOARD_ROUTE)
    }).catch((error) => {
      toast.error(error.code)
    })
  }

  return (
    <div className=' flex h-screen justify-center items-center flex-col'>
      <p className=' text-4xl font-bold text-center mb-14'>Log In</p>
      <div className=' min-w-[350px] flex flex-col gap-4'>
        <form className=' flex flex-col gap-6 justify-center' onSubmit={handleSubmit(onSubmit)}>
          <label>
            <p>Enter Your Email<SupStar/></p>
            <input type='email' placeholder='ENTER EMAIL ADDRESS' className='form-field' {...register("email",{required: true})}/>
            {
              errors.email && <p className=' form-error'>Email is Required</p>
            }
          </label>
          <label className=' relative'>
            <p>Enter Your Password<SupStar/></p>
            <input type={showPassword ? "text" : "password"} name="password" id="password" {...register("password",{required: true})} className="form-field" placeholder='Enter Password'/>
                <span className='absolute right-3 top-[38px] cursor-pointer'
                onClick={() => setShowPassword((prev) => !prev)}>
                    {
                        showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                    }
                </span>  
            {
              errors.password && <p className=' form-error'>Password is Required</p>
            }
            <button className=' w-fit float-right mt-1 text-right' onClick={() => router.push(FORGOTPASSWORD_ROUTE)}>Forgot Password?</button>
          </label>
          <button type="submit" className=' bg-black rounded-3xl px-8 py-3 text-white'>Login</button>
        </form>
        <p className=' text-center'>Don't have an account? <Link href={SIGNUP_ROUTE} className=' font-semibold underline'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login