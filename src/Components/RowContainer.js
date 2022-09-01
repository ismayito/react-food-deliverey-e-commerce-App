import React,{useEffect,useRef, useState} from 'react'
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import Notfound from "./img/NotFound.svg"
import { useStateValue } from './Context/stateProvider';
import { actionType } from './Context/reducer';
const RowContainer = ({flag, rowdata,scroll}) => { 
    //console.log(rowdata);
    const [{cartItem},dispatch]=useStateValue();
    const [itemscart, setItemsCart]=useState(0);

    const AddtoCart = (item)=>{
        console.log(item);
        //setItemsCart(item);
        dispatch({
            type:actionType. SET_CART_ITEMS,
        cartItem:[...cartItem,item]
        })
        localStorage.setItem("cartItem",JSON.stringify(cartItem));
    }

    const rowContainer = useRef();
    useEffect(()=>{
        rowContainer.current.scrollLeft+= scroll;
    },[scroll])
    //console.log(rowdata);
    
  return (
    <div  ref={rowContainer} className={`w-full  my-12 flex items-center gap-2 ${flag? "overflow-x-scroll scrollbar-none":"overflow-x-hidden flex-wrap justify-center"}`  }>
       
       {
         rowdata && rowdata.map(item=>(
            <div key={item.id} className='m-w-350
             w-300 min-w-[300px] md:w-340 md:min-w-[340px] 
             scroll-smooth hover:drop-shadow-lg my-12
              bg-cardOverlay rounded-lg p-2  
             h-[225px] shadow-md backdrop-blur-lg flex flex-col justify-between items-center'>
            <div className='flex  items-center justify-between w-full'>
                <motion.div   whileHover={{scale:1.2}} className="w-40 h-40 -mt-8 drop-shadow-2xl" >
                <img className="w-full h-full object-contain"
                src={item.image} alt="itemsimages"></img>
                </motion.div>
                
            <motion.div whileTap={{scale:0.75}} onClick={()=> AddtoCart(item)} className="rounded-full 
            h-8 w-8  bg-red-600 justify-center flex items-center hover:shadow-md cursor-pointer">
                <MdShoppingBasket className = 'text-white '></MdShoppingBasket>
            </motion.div>
            
            </div>
            <div className='w-full flex  flex-col items-end justify-end'>
                <p className="text-textColor text-base md:text-lg font-semibold ">
                    {item.title}
                </p>
                <p className='mt-1  text-sm text-gray-500'>Calories: {item.calories}</p>
                <div className="flex items-center gap-8">
                    <p className='text-lg text-headingColor font-semibold'><span className ="text-sm text-red-500">$</span>{item.price}</p>
                </div>
            </div>
        </div>
        ))
       }
         </div>
  )
}

export default RowContainer