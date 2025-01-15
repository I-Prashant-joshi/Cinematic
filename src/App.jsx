import { Outlet } from 'react-router-dom'
import './App.css'
import Header from "./Component/Header"
import Footer from './Component/Footer'
import PhoneNav from './Component/PhoneNav'
import { useFetch } from './Common/FetchData'
import { useEffect } from 'react'
import Loader from "react-js-loader";
import { useDispatch, useSelector } from 'react-redux'
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { bannerData, imgBaseUrl,nowPlaying,trendingData,topRatedMovie,popularShows,onAirShows,upcomingMovie, changeLoading } from './redux/Home'
import NetworkConnection from './Component/NetworkConnection'
import VPNPage from './Component/VPNPage'

function App() {
  const dispatch = useDispatch()
  const responsedata = useFetch("trending/all/week");
  const image_base_url = useFetch("configuration");
  const trendingMovie = useFetch("trending/movie/week");
  const now_playing = useFetch("/movie/now_playing");
  const top_rated = useFetch("/movie/top_rated");
  const popular = useFetch("/tv/popular");
  const on_the_air = useFetch("/tv/on_the_air");
  const upcoming = useFetch("/movie/upcoming");
  const state = useSelector((state)=>state.homeDetail) 
  useEffect(() => {
    try {
      if(responsedata.data,trendingMovie.data,now_playing.data,top_rated.data,popular.data,upcoming.data,on_the_air.data){
        dispatch(bannerData(responsedata?.data?.results))
        dispatch(imgBaseUrl(image_base_url?.data?.images?.secure_base_url+"original"))
        dispatch(trendingData(trendingMovie?.data?.results))
        dispatch(nowPlaying(now_playing?.data?.results))
        dispatch(topRatedMovie(top_rated?.data?.results))
        dispatch(popularShows(popular?.data?.results))
        dispatch(onAirShows(on_the_air?.data?.results))
        dispatch(upcomingMovie(upcoming?.data?.results))

      }
 const loaderTimer=  setTimeout(()=>{
    dispatch(changeLoading(false))
      },5000)
      return ()=>clearTimeout(loaderTimer)
    } catch (error) {
      console.log("error",error);
    }
  }, [responsedata, image_base_url,trendingMovie,popular,now_playing,upcoming,on_the_air,top_rated]);
  return (
    
  <div className="min-h-screen flex flex-col bg-[black]">
  <Header />
  {
    state?.trending?.length <= 0 && state?.nowPlaying?.length <= 0 && state?.popularTvSows?.length <= 0 ?
    <VPNPage />
    :
    <div className="flex-grow">
    {
     state.loading ? (
                 <div className="text-[white] h-[100vh] w-[100%] flex justify-center items-center ">
                   <Loader
                     type="spinner-cub"
                     bgColor="#00e1ff"
                     color="white"
                     size={60}
                   />
                 </div>)
                 :
    <Outlet />
    }
  </div>
    
  }
 
  <Footer />
  <div className="fixed bottom-0 w-full lg:hidden">
    <PhoneNav />
  </div>
</div>
  );
}

export default App
