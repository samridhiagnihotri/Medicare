import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/** ----left section */}
            <div>
                <img className='mb-5 w-48' src="/src/assets/MediCare (2).png" alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam nostrum consequatur qui, beatae similique totam perferendis dolor ipsum expedita optio debitis odio quisquam inventore ex!</p>
            </div>

            {/** ----center section */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            {/** ----Right section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCh</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 123456789</li>
                    <li>medicare@gmail.com</li>
                </ul>
            </div>
        </div>
        {/* ---------Copyright Text} */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ mediCare - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer