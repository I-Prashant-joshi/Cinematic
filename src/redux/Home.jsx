import { createSlice } from '@reduxjs/toolkit';

const HomeDetail = createSlice({
    name:"Home",
    initialState : {
        tab:"Home",
        posterData:[],
        img_base_url:"",   
     },
    reducers:{
        changeTab:(state,action)=>{
            state.tab=action.payload
        },
        bannerData:(state,action)=>{
            state.posterData=action.payload
        },
        imgBaseUrl:(state,action)=>{
            state.img=action.payload
        }

    }
})

export default HomeDetail.reducer
export const {changeTab,bannerData,imgBaseUrl}=HomeDetail.actions