import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
    },
    removeItmes: (state,action) => {
      state.items=state.items.filter((item)=>item.id !==action.payload);
    },
    clearItems: (state) => {
      state.items.length = 0;
    },
    updateItems:(state,action)=>{
        const {id,name}=action.payload;
        const item=state.items.find((item)=>item.id===id);
        if(item){
            item.name=name;
        }
    }
  },
});
export const { addItems, removeItmes, clearItems ,updateItems} = cartSlice.actions;
export default cartSlice.reducer;
