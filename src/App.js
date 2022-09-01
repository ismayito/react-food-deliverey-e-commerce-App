
import  { useContext,useEffect,useState } from 'react';
import {Header,MainContainer,CreateContainer} from "./Components";
import {AnimatePresence} from "framer-motion";
import {Routes, Route} from "react-router-dom";
import { useStateValue } from './Components/Context/stateProvider';
import { actionType } from './Components/Context/reducer';
import { getAllFoodItems } from './utils/firebaseFunctions';




const App = () => {
 
  const [foodItems,setFoodItems] = useState(null);
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
    <AnimatePresence exitBeforeEnter>
      <div className='w-screen h-auto flex flex-col  bg-primary'>
      <Header></Header>
      <main className='mt-16 md:mt-24  px-4 md:px-16 py-4 w-full'>
        <Routes>
        <Route path="/*" element={<MainContainer></MainContainer>}></Route>
        <Route path="/createItem" element={<CreateContainer></CreateContainer>}></Route>
        </Routes>
      </main>
    </div>
    </AnimatePresence>
    
  )
}

export default App;