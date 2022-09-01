import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {MdFastfood,MdCloudUpload ,MdDelete,MdFoodBank, MdAttachMoney} from "react-icons/md";
import { categories } from '../utils/data';
import {ref,getDownloadURL,uploadBytesResumable, deleteObject} from "firebase/storage";
import { storage } from '../firebase.config';

import Loader from './Loader';
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { useStateValue } from './Context/stateProvider';
import { actionType } from './Context/reducer';

const CreateContainer = () => {
  const [title,setTitle]=useState("");
  const [calories,setCalories]=useState("");
  const [fields,setFields]=useState(false); 
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState(null);
  const [alertStatus,setAlertStatus]=useState("danger");
  const [isLoading,setIsLoading] =useState(false);
  const [msg, setMsg]= useState(null);
  const [imageAsset, setImageAsset]=useState(null);
  const [foodItems,setFoodItems] = useState(null);
  const UploadImage=(e)=>{
    setIsLoading(true);
    const imageFile= e.target.files[0];
    const storageRef = ref(storage,`Images/${Date.now()}-${imageFile.name}`);
    const uploadeTask=uploadBytesResumable(storageRef,imageFile);
    uploadeTask.on("state_change",(snapshot)=>{
      const progressUpload =(snapshot.bytesTransfered/snapshot.totalBytes)*100;
    }, (error)=>{
      console.log(error);
      setFields(true);
      setMsg("there is an error uploading the image:try again?");
      setAlertStatus("danger");
      setTimeout(() => {
        setIsLoading(false);
        setFields(false);
        setMsg(null);
      }, 4000);
    },(
    )=>{getDownloadURL(uploadeTask.snapshot.ref).then((downloadURL)=>{
      setImageAsset(downloadURL);
      setIsLoading(false);
      setAlertStatus("success");
      setFields(true)
      setMsg("image uploaded successfully");
      setTimeout(()=>{
        setFields(false);
      },4000)
    })})
   // console.log(imageFile);
  }
   const deleteImage=()=>{
    setIsLoading(true);
    const imageDelete=ref(storage,imageAsset);
    deleteObject(imageDelete).then(()=>{
      setIsLoading(false);
      setAlertStatus("success");
      setFields(true);
      setMsg("image deleted successfully");
      setImageAsset(null);
      
      setTimeout(()=>{
        setFields(false);
      },2000)
    }).catch(error=>{
      console.log(error);

    })
    console.log("deletw image");
   }
   const saveDetails=()=>{
    setIsLoading(true);
    try {
      if(!title || !calories || !price || !category || !imageAsset){
      
        setFields(true);
        setMsg("the required fields must be filled");
        setAlertStatus("danger");
        setTimeout(() => {
          setIsLoading(false);
          setFields(false);
          setMsg(null);
        }, 4000);
        fetchFoodItems()
      }
      else{
        const data={
          id:`${Date.now()}`,
          title:title,
          image:imageAsset,
          price:price,
          categories:category,
          calories:calories,
          qtn:1,
        }
        saveItem(data); 
        setIsLoading(false);
        setAlertStatus("success");
        setFields(true);
        setMsg("Data uploaded successfully");
        setImageAsset(null);
        setCategory("Select category")
        clearData();
        
        setTimeout(()=>{
          setFields(false);
        },4000)


      }
      fetchFoodItems();
      
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("there is an error uploading the image:try again?");
      setAlertStatus("danger");
      setTimeout(() => {
        setIsLoading(false);
        setFields(false);
        setMsg(null);
      }, 4000);
      
    }
    console.log("save details")
   }
   const clearData=()=>{
    setImageAsset(null);
    setMsg(null);
    setCalories('');
    setCategory('Select category');
    setPrice("");
    setTitle('');
   };
  
   const fetchFoodItems = async () => {
    await getAllFoodItems().then((data) => {
     console.log(data)
       setFoodItems(data);
     });
   };
  return (
    <div className='w-full h-auto flex min-h-screen  items-center justify-center '>
      <div className='w-[90%] h-[75%] border
       border-gray-300 rounded-lg p-4 gap-4
       flex flex-col items-center justify-center' >
        {fields && ( <motion.p className = {`w-full p-2 rounded-lg lg:mt-12
        text-center text-lg font-semibold  ${alertStatus==="danger"? 
        "bg-red-400 text-red-600":"bg-emerald-400 text-emerald-800"}`}>
        {msg}</motion.p>
          )
          }
          <div className="flex  items-center gap-2  w-full  py-2 border-b border-gray-300 lg:mt-8 md:pt-8">
        <MdFastfood className="text-xl text-gray-700"></MdFastfood>
        <input value={title} type='text' placeholder='Give me a name...' required onChange={(e)=>setTitle(e.target.value)} 
        className='w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-400 text-textcolor outline-none border-none'/>
       </div>
       <div className='w-full'>
        <select onChange={(e)=>setCategory(e.target.value)} className="outline-none
         w-full text-base border-b-2 border-gray-200 p-2 rounded-md  cursor-pointer">
          <option className="bg-white" value="other">select category </option>
          {
            categories && categories.map(item=>(
              <option key={item.id} value={item.urlParamName} className="text-base outline-none border-0 capitalize bg-white text-headingColor ">{item.name}</option>
            ))
          }
        </select>
       </div>
       <div className='w-full flex flex-col border-gray-300 items-center
       border-dotted border-2 justify-center group h-225 md:h-420 cursor-pointer rounded-md'>
        {isLoading?<Loader></Loader>:<>
        {!imageAsset?<> 
        <label className='w-full h=full flex flex-col items-center justify-center cursor-pointer'>
          <div className='w-full h=full flex flex-col items-center justify-center cursor-pointer gap-2'>
            <MdCloudUpload className="text-3xl text-gray-500 hover:text=gray-100 "></MdCloudUpload>
            <p className="text-3xl text-gray-500 hover:text=gray-100 "> click here to upload</p>
          </div>
          <input type="file" accept='image/*' name="uploadimage" onChange={UploadImage} className="w-0 h-0"></input>
        </label>
        </>:<>
        <div className="w-full reative">
          <img src={imageAsset} alt="uploaded image" className='w-full h-full object-cover'/>
          <button type='button' className="rounded-full 
          bg-red-600 text-xl right-3 p-3 hover:shadow-md 
          cursor-pointer outline-none duration-500 transition-all ease-in-out" onClick={deleteImage}><MdDelete className='text-white'></MdDelete></button>
        </div>
         </>}
        </>}
       </div>
       <div className="flex   flex-col md:flex-row items-center gap-2">
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
      
          <MdFoodBank className='text-gray-700 text-2xl'></MdFoodBank>
          <input type="text" value={calories} onChange={(e)=>setCalories(e.target.value)} 
          placeholder="Amount of calories "
           className='w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-400 text-textcolor outline-none border-none' required></input>
        </div>
       </div>
       <div className="flex flex-col  md:flex-row items-center gap-2">
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdAttachMoney className='text-gray-700 text-2xl'></MdAttachMoney>
          <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} 
          placeholder="Price of item "
           className='w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-400 text-textcolor outline-none border-none' required></input>
        </div>
       </div>
       <div className="w-full flex items-center">
        <button className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none 
        bg-emerald-400 px-12 py-2 transition-all ease-in-out duration-100
        rounded-lg text-lg text-white font-semibold" onClick={ saveDetails} type='button'>Save</button>
       </div>
       </div>
    </div>
  )
}

export default CreateContainer;