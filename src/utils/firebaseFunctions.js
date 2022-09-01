import { setDoc,  doc, collection, orderBy, query, getDocs } from "firebase/firestore"
import { firestore } from "../firebase.config"

export const saveItem=async(data)=>{

    await setDoc(doc(firestore,"foodItem",`${Date.now()}`),data,{merge:true});


}
export const getAllFoodItems = async()=>{

const fetcheItem   = await getDocs(query(collection(firestore,"foodItem"),orderBy("id","desc")));
return fetcheItem.docs.map(doc => doc.data());
}