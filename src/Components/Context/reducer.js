export const actionType = {
    SET_USER:"SET_USER",
    SET_FOOD_ITEM:"SET_FOOD_ITEM",
    SET_CART_ITEMS:"SET_CART_ITEMS",
    SET_CART_SHOW:"SET_CART_SHOW"
};

 const reducer=(state,action)=>{
    
    switch(action.type){
        case action.SET_USER:
            return{
                ...state, 
                user:action.user,  
        };
        case action.SET_CART_ITEMS:
            return{
                ...state, 
                cartItem:action.cartItem,  
        };
        case action.SET_CART_SHOW:
            return{
                ...state, 
                cartShow:action.cartShow,  
        };
        case action.SET_FOOD_ITEM:
            return{
                ...state, 
                foodItems:action.foodItems,  
        };

        
        
        default:return state;
    }
 }
  export default reducer;