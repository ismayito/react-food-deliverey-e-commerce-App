import { fetchCart, fetchUser } from "../../utils/fetchlocalStoragedata"

const userInfo=fetchUser();
const cartInfo=fetchCart();

export const initialState={
    user:userInfo,
  foodItems:null,
  cartShow:false,
  cartItem:cartInfo,
}