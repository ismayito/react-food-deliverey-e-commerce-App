import React, { useState,useEffect } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import {RiRefreshFill} from "react-icons/ri";
import {BiPlus,BiMinus} from "react-icons/bi";
import { motion } from 'framer-motion';
import { useStateValue } from './Context/stateProvider';
import { actionType } from './Context/reducer';
import Header from './Header';

const CartContainer = () => {
  const [cartShow,setCartShow]= useState(false);
  const ShowCart=()=>{
    setCartShow(!cartShow);
  }
  useEffect(()=>{},[cartShow]);
    
      return (
    <motion.div initial={{opacity:0,x:200}}  animate={{opacity:1,x:0}}  exit={{opacity:0,x:200}} className="w-full md:w-375 h-screen fixed top-0 right-0 z-[101] bg-white flex flex-col drop-shadow-md">
        <div className='w-full justify-between items-center flex p-4'>
         <motion.div  whileTap={{scale:0.75}}  onClick={ShowCart}> <MdOutlineKeyboardBackspace className='text-textColor text-3xl cursor-pointer'>
            </MdOutlineKeyboardBackspace></motion.div>
            <p className="text-textColor font-semibold text-lg">Cart</p>
           <motion.div whileTap={{scale:0.75}}><p className='flex p-1 px-2 my-2 gap-2 cursor-pointer duration-100  
            transiton-all ease-in-out rounded-md first-letter text-textColor text-base
            items-center bg-gray-100 hover:shadow-md
            '>Clear<RiRefreshFill></RiRefreshFill></p></motion.div> 
            
        </div>
        {/* bottom section */}
        <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col '>
        <div className='gap-3 w-full h-340 md:h-42 px-4 py-6 flex flex-col overflow-y-scroll  scrollbar-none'>
            {/* cartItem */}
            <div className='w-full p-1 px-2 rounded-lg flex items-center bg-cartItem gap-2'>
                <img src="https://firebasestorage.googleapis.com/v0/b/restaurantapp-90171.appspot.com/o/Images%2F1661777153543-f4.png?alt=media&token=845b76f9-5b51-4fe0-b931-b60fec65fa7a" alt="cartimage" className='w-20 h-20 max-w-[60px]'></img>
            
            {/* name */}
            <div className='flex flex-col gap-2'>
                <p className="text-base text-gray-50"> chocolate & vanilla</p>
                <p className='text-sm block text-gray-300 font-semibold'>$7.5</p>
             </div>
             {/* bottom: ; */}
             <div className='flex group items-center ml-auto gap-2 cursor-pointer'>
                <motion.div whileTap={{scale:0.75}}>
                    <BiMinus className="text-gray-50"></BiMinus>
                </motion.div>
                <p className='w-5 h-5 rounded-sm  bg-cartBg text-gray-50 flex items-center justify-center'>1</p>
                <motion.div whileTap={{scale:0.75}}>
                    <BiPlus className=" text-gray-50"></BiPlus>
                </motion.div>
             </div>
            </div>
        {/* total section */}
        <div className='w-full flex-1 bg-cartBg rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
            <div className='flex justify-between w-full items-center '>
                <p className='text-gray-400 text-lg'>subtotal</p>
                <p className='text-gray-400 text-lg'>$7.5</p>
            </div>
            <div className='flex justify-between w-full items-center '>
                <p className='text-gray-400 text-lg'>Delivery</p>
                <p className='text-gray-400 text-lg'>$2.5</p>
            </div>
            <div className='w-full border-b text-gray-600 my-2'></div>
            <div className='w-full flex items-center justify-between'>
                <p className='text-gray-50 text-xl font-semibold'>Total</p>
                <p className='text-gray-50 text-xl font-semibold'>$11.5</p>
            </div>
            <motion.button whileTap={{scale:0.75}} type='button' className="w-full rounded-full bg-gradient-to-tr from-orange-400 to-orange-600  text-gray-50 my2 hover:shadow-lg ">Checkout</motion.button>
        </div>
        </div>
       
</div>
    </motion.div>
  )
}

export default CartContainer