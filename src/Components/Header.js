
import React, { createElement, useEffect, useState } from 'react';
import Logo from "./img/logo.png";
import Avatar from "./img/avatar.png";
import { motion } from 'framer-motion';
import {Link} from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { App } from '../firebase.config';

import {MdOutlineShoppingBasket,MdAdd,MdLogout} from "react-icons/md"
import { useStateValue } from './Context/stateProvider';
import { actionType } from './Context/reducer';
import CartContainer from './CartContainer';


const Header = () => {
    //const [cartShow,setCartShow]=useState(false);
    const firebaseAuth=getAuth(App);
    const provider= new GoogleAuthProvider();
    const [{user,cartItem},dispatch] = useStateValue();
    const [cartShow,setCartShow]=useState(false);
    
    const [isMenu, setIsMenu]= useState(false);

    const Login=async()=>{
        if(!user){
            const {user:{refreshToken,providerData}}=await signInWithPopup(firebaseAuth,provider);
        dispatch({
            type:actionType.SET_USER,
            user:providerData[0],
        })
        localStorage.setItem("user",JSON.stringify(providerData[0]))
    } else{
        setIsMenu(!isMenu);
    }
        }
         const logout=()=>{
            setIsMenu(false);
            localStorage.clear();
            dispatch({
                type:actionType.SET_USER,
                user:null,
            })
         }
         const ShowCart =()=>{
           
                setCartShow(!cartShow)
         
            
         }
         
useEffect(()=>{},[cartShow])
    
        
  return (
    <header className='fixed z-50 w-screen p-1 px-4 md:p-6 md:py-16 bg-primary'>
    {/* for desktop and tablet */}
    <div className='hidden w-full md:flex items-center   justify-between'>
       
        <Link to="/" className='flex items-center gap-2'>
            <img src={Logo} alt="logo" className="w-8 object-cover"></img>
            <p className='text-headingColor text-xl font-bold'>City</p>
           
        </Link>
        <div className="flex items-center gap-8">
        <motion.ul  initial={{opacity:0, x:200}}
                    animate={{opacity:1, x:0}}
                    exit={{opacity:0,x:200}} 
        
        className='flex gap-8 items-center '>
                <li onClick={()=>setIsMenu(false)} className='tex-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Home</li>
                <li onClick={()=>setIsMenu(false)} className='tex-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Menu</li>
                <li onClick={()=>setIsMenu(false)} className='tex-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>About us</li>
                <li onClick={()=>setIsMenu(false)} className='tex-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Services</li>
            </motion.ul> 
            <div className=' relative flex items-center justify-center' >
            <motion.div whileTap={{scale:0.75}} className="relative flex items-center justify-center"onClick={ShowCart} >
            <MdOutlineShoppingBasket className="text-textColor  text-2xl"></MdOutlineShoppingBasket>
              {cartItem &&cartItem.length>0 && (  <div    className='  flex  w-5 h-5 rounded-full bg-cartNumBg items-center justify-center'>
                    <p className='text-sl text-white font-semibold '>{cartItem.length}</p>
                </div>)}
            </motion.div>
               
                <div className='relative'>
                < motion.img whileTap={{scale:0.6}} src={user ? user.photoURL:Avatar} onClick={Login}
                 className="h-10 w-10 min-w-[40px] gap-12 min-h-[40px] drop-shadow-xl padding-20px rounded-full"  alt="avatar"/>
                 {
                    isMenu && (
                        <motion.div initial={{opacity:0,scale:0.6}}
                        animate={{opacity:1,scale:1}} 
                        exit={{opacity:0,scale:0.6}}

                        className='w-40 bg-gray-50  shadow-xl rounded-lg absolute flex flex-col top-12 right-0'>
                    {
                        user && user.email==="ismayito1@gmail.com" && (
                            <Link to="./createItem">
                            <p className="py-4 px-4 transition-all duration-100 
                    bg-slate-100 flex items-center gap-3 cursor-pointer 
                    text-textColor ease-in-out text-base hover:bg-slate-100" onClick={()=>setIsMenu(false)}>New item <MdAdd></MdAdd></p>
                            </Link>
                            

                        )
                    }
                 
                    <p className="py-4 px-4 transition-all duration-100 
                    bg-slate-100 flex items-center gap-3 cursor-pointer 
                     text-textColor ease-in-out text-base hover:bg-slate-100" onClick={logout}>Logout <MdLogout></MdLogout></p>
                    
                 </motion.div>
                    )
                 }
                 
                </div>
                
            </div>
        </div>
        {
      cartShow &&   (<CartContainer mystate={cartShow}></CartContainer>)
     }
    </div>
{/* for mobie */}
    <div className="md:hidden flex w-full items-center justify-between ">
        
    <motion.div whileTap={{scale:0.75}} onClick={ShowCart} className=' relative flex items-center justify-center' >
        
                <MdOutlineShoppingBasket className="text-textColor  text-2xl"></MdOutlineShoppingBasket>
                {cartItem &&cartItem.length>0 && (  <div    className='  flex  w-5 h-5 rounded-full bg-cartNumBg items-center justify-center'>
                    <p className='text-sl text-white font-semibold '>{cartItem.length}</p>
                </div>)}
                </motion.div>
    <Link to="/" className='flex items-center gap-2'>
            <img src={Logo} alt="logo" className="w-8 object-cover"></img>
            <p className='text-headingColor text-xl font-bold'>City</p>
        </Link>

        
        <div className='relative '>
                < motion.img whileTap={{scale:0.6}} src={user ? user.photoURL:Avatar} onClick={Login}
                 className="h-10 w-10 min-w-[40px] gap-12 min-h-[40px] drop-shadow-xl padding-20px rounded-full"  alt="avatar"/>
                 {
                    isMenu && (
                        <motion.div initial={{opacity:0,scale:0.6}}
                        animate={{opacity:1,scale:1}} 
                        exit={{opacity:0,scale:0.6}}

                        className='w-40 bg-gray-50  shadow-xl rounded-lg absolute flex flex-col top-12 right-0'>
                    {
                        user && user.email==="ismayito1@gmail.com" && (
                            <Link to="./createItem">
                            <p className="py-4 px-4 transition-all duration-100 
                    bg-slate-100 flex items-center gap-3 cursor-pointer 
                     text-textColor ease-in-out text-base hover:bg-slate-100"  onClick={()=>setIsMenu(false)}>New item <MdAdd></MdAdd></p>
                            </Link>
                        )
                    }

            <ul  
        
        className='flex flex-col gap-4  justify-between '>
                <li className='tex-base px-4  onClick={()=>setIsMenu(false)} hover:bg-slate-100 text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Home</li>
                <li className='tex-base px-4  onClick={()=>setIsMenu(false)}  hover:bg-slate-100 text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Menu</li>
                <li className='tex-base px-4  onClick={()=>setIsMenu(false)}  hover:bg-slate-100 text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>About us</li>
                <li className='tex-base px-4  onClick={()=>setIsMenu(false)}  hover:bg-slate-100 text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Services</li>
            </ul> 
                 
                    <p className="m-2 p-2 shadow-lg rounded-md transition-all duration-100 
                     flex items-center gap-3 cursor-pointer 
                    bg-gray-200
                    justify-center
                     text-textColor ease-in-out text-base hover:bg-slate-300" onClick={logout}>Logout <MdLogout></MdLogout></p>
                    
                 </motion.div>
                    )
                 }
                 
                </div>
                {
      cartShow &&   (<CartContainer></CartContainer>)
     }
    
    </div>
    </header>
  )
}

export default Header