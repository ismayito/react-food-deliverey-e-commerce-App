import React, { useEffect, useState } from 'react'
import {IoFastFood} from 'react-icons/io5';
import { categories } from '../utils/data';
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { getAllFoodItems } from '../utils/firebaseFunctions';
import NotFound from "./img/NotFound.svg"

const MenuContainer = () => {   
     

     const [foodItems,setFoodItems] = useState(null);
     const [filter, setFilter]= useState("chicken");
     const fetchFoodItems = async () => {
        await getAllFoodItems().then((data) => {
         console.log(data)
           setFoodItems(data);
         });
       };
        useEffect(()=>{
         fetchFoodItems();
        },[]);

  return (
    <section className="w-full my-6" id="menu">
    <div className='flex w-full flex-col items-center justify-center'>
    <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 
     before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
        our hot dishes
          </p>
          <div  className='flex w-full items-center justify-start  lg:justify-center gap-8 py-6  overflow-scroll scrollbar-none'>
            {categories && categories.map(category=>(
                <motion.div  whileTap={{scale:0.75}} key={category.id} className={`w-24 ${filter===category.urlParamName?" bg-red-600":" bg-card"} group min-w-[94px] 
                h-28 cursor-pointer 
                rounded-lg 
                drop-shadow-xl 
                flex flex-col  
                justify-center 
                items-center  
                hover:bg-red-600
                gap-3  `}
                onClick={()=>setFilter(category.urlParamName)}
                >
                    <div className={`w-10 h-10 rounded-full  group-hover:bg-card flex items-center justify-center shadow-lg`}>
                        <IoFastFood className={` ${filter===category.urlParamName?"text-white":" text-textColor"} group-hover:text-textColor text-lg`}></IoFastFood>
                    </div>
                    <p className={`text-sm ${filter===category.urlParamName?"text-white":" text-textColor"} group-hover:text-white`}>{category.name}</p>
                </motion.div>
            ))}
          </div>
          <div className='w-full'>
            <RowContainer flag = {false} rowdata={foodItems?.filter(items=>items.categories==filter)}></RowContainer>
          </div>
         
    </div>
    </section>
  )
}

export default MenuContainer