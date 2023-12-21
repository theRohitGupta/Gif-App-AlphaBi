"use client"
import SupStar from '@/components/SupStar'
import { LOGIN_ROUTE} from '@/constants';
import { auth } from '@/services/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

function forgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const router = useRouter()

  const onSubmit = async(data) => {
    await sendPasswordResetEmail(auth,data.email)
    .then((res) => {
        toast.success("PASSWORD RESET EMAIL SENT")
        router.push(LOGIN_ROUTE)
    }).catch((err) => {
        console.log(err)
    })
  }

  return (
    <div className=' flex h-screen justify-center items-center flex-col'>
      <p className=' text-4xl font-bold text-center mb-14'>Forgot Password</p>
      <div className=' min-w-[350px] flex flex-col gap-4'>
        <form className=' flex flex-col gap-6 justify-center' onSubmit={handleSubmit(onSubmit)}>
          <label>
            <p>Enter Your Email<SupStar/></p>
            <input type='email' placeholder='ENTER EMAIL ADDRESS' className='form-field' {...register("email",{required: true})}/>
            {
              errors.email && <p className=' form-error'>Email is Required</p>
            }
          </label>
          <button type="submit" className=' bg-black rounded-3xl px-8 py-3 text-white'>Send Reset Link</button>
        </form>
        <p className=' text-center'>Already have an Account! <Link href={LOGIN_ROUTE} className=' font-semibold underline'>Login</Link></p>
      </div>
    </div>
  )
}

export default forgotPassword