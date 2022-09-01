import React,{useState,useEffect,useRef} from 'react';
import HomeContainer from './HomeContainer';
import { motion } from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import RowContainer from './RowContainer';
import { getAllFoodItems } from '../utils/firebaseFunctions';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';
import { useStateValue } from './Context/stateProvider';



const MainContainer = () => {
  const [foodItems,setFoodItems] = useState(null);
  //const [cartShow,setCartShow]=useState(false);
  const [{cartShow},dispatch]=useStateValue();
  
  
  const [scroll,setScroll]=useState(0);

  useEffect(()=>{
    
  },[scroll,cartShow])
 const fetchFoodItems = async () => {
 await getAllFoodItems().then((data) => {
  //console.log(data)
    setFoodItems(data);
  });
};
 useEffect(()=>{
  fetchFoodItems();
 },[])
  return (
    
       <div className='w-full flex flex-col h-auto items-center justify-center'>
      <HomeContainer></HomeContainer>
      <section className='w-full my-6'>
        <div className='w-full flex items-center justify-between'>
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our fresh & healthy fruits
          </p>
           <div className ='hidden md:flex gap-3 items-center'>
         
          <motion.div whileTap={{scale:0.75}} className="w-8 h-8 
          flex justify-center 
          items-center bg-orange-300    
          duration-100 ease-in-out
           hover:shadow-lg hover:bg-orange-500 
           cursor-pointer transition-all rounded-lg"
           onClick={()=>{setScroll(-200)}}
           >
            <MdChevronLeft className='text-lg text-white'></MdChevronLeft>
           </motion.div>
           <motion.div whileTap={{scale:0.75}} className="w-8 h-8 
          flex justify-center 
          items-center bg-orange-300    
          duration-100 ease-in-out
           hover:shadow-lg hover:bg-orange-500 
           cursor-pointer transition-all rounded-lg"
           onClick={()=>{setScroll(200)}}
           >
            <MdChevronRight className='text-lg text-white'></MdChevronRight>
           </motion.div>
        </div>
        </div>
        <RowContainer scroll={scroll} flag={true} rowdata={foodItems?.filter(item=>item.categories==="fruits")}></RowContainer>
      </section> 
     <MenuContainer></MenuContainer>

     {
      cartShow &&   (<CartContainer></CartContainer>)
     }
  
    </div>
   
   
  ) 
}

export default MainContainer 