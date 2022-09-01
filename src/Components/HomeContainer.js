import React from 'react'
import Delivery from "./img/delivery.png";
import Hero from "./img/heroBg.png";
import { heroData } from '../utils/data';

const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id="home">
        <div className='py-2 flex flex-col  flex-1 items-start  justify-center gap-6'>
        <div className="flex items-center gap-2 bg-orange-100 justify-center rounded-full px-4 py-1">
          <p   className="text-base text-orange-500 font-semibold ">Delivery bike</p> 
          <div className="w-8 h-8 overflow-hidden rounded-full drop-shadow-xl bg-white">
          <img src={Delivery} alt="delivery bike" className='w-full h-full object-contain'/>
        </div>
        </div>
      
      <p className="text-[2.5rem] font-bold tracking-wide lg:text-[4.5rem]
      text-headingColor">The Fastest Delivery In <span className='text-orange-600 text-[3rem] lg:text-[5rem]'>Your City</span></p>
      <p className="text-base text-textColor text-center md:text-left md:w-[80%]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a 
        galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
        <button type="button" className="w-full  from-orange-400 md:w-auto
        rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 
        to-orange-500 bg-gradient-to-br px-4 py-2 ">Order now</button> 
        </div>
        <div className='p-4  flex-1 flex items-center relative'>
            <img  src={Hero} alt="heroimage" className='h-420  lg:w-auto lg:h-650 w-full ml-auto'/>
            <div className='absolute flex items-center justify-center   w-full h-full top-0 right-0  py-4 lg:px-32 gap-4 flex-wrap'>
              {heroData && heroData.map(item=>(
                 <div key={item.id} className='lg:w-190 p-4  drop-shadow-lg rounded-3xl 
                  bg-cardOverlay backdrop-blur-md flex items-center justify-center flex-col'>
                 <img src={item.imgUrl} alt='i1' className='w-60 lg:w-40 -mt-10 lg:-mt-20'/>
                 <p className=" text-base lg:text-xl font-bold text-textColor text-transform  mt-2 lg:mt-4 ">{item.name}</p>
                 <p className=" text-[12px] lg:text-md text-lighttextGray font-semibold  my-1 lg:my-3">{item.desc}</p>
                 <p className="text-sm text-headingColor font-semibold"><span className='text-xs text-red-600'>$</span>{item.price}</p>
             </div>
              )
                 
              )}
                
            </div>
        </div>
    </section>
  )
}

export default HomeContainer