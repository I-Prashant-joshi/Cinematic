import { createSlice } from '@reduxjs/toolkit';

const HomeDetail = createSlice({
    name:"Home",
    initialState : {
        tab:"home",
        searchValue:"",
        posterData:[],
        trending:[],
        nowPlaying:[],
        topRated:[],
        popularTvSows:[],
        upcoming:[],
        onAirShows:[],
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
        },
        trendingData:(state,action)=>{
            state.trending=action.payload
        },
        nowPlaying:(state,action)=>{
            state.nowPlaying=action.payload
        },
        topRatedMovie:(state,action)=>{
            state.topRated=action.payload
        },
        popularShows:(state,action)=>{
            state.popularTvSows=action.payload
        },
        upcomingMovie:(state,action)=>{
            state.upcoming=action.payload
        },
        onAirShows:(state,action)=>{
            state.onAirShows=action.payload
        },
        changeSearchValue:(state,action)=>{
            state.searchValue=action.payload
        },


    }
})

export default HomeDetail.reducer
export const {changeTab,popularShows,onAirShows,upcomingMovie,bannerData,imgBaseUrl,trendingData,nowPlaying,topRatedMovie,changeSearchValue}=HomeDetail.actions