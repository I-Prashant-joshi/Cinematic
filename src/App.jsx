import { Outlet } from 'react-router-dom'
import './App.css'
import Header from "./Component/Header"
import Footer from './Component/Footer'
import PhoneNav from './Component/PhoneNav'
import { useFetch } from './Common/FetchData'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { bannerData, imgBaseUrl } from './redux/Home'

function App() {
  const dispatch = useDispatch()
  const responsedata = useFetch("trending/all/week");
  const image_base_url = useFetch("configuration");
  useEffect(() => {
    dispatch(bannerData(responsedata?.data?.results))
    dispatch(imgBaseUrl(image_base_url?.data?.images?.secure_base_url+"original"))
  }, [responsedata, image_base_url]);
  return (
    <div className="h-full">
      <Header />
      <div className="">
        <Outlet />
      </div>
      <Footer />
      <div className="fixed bottom-0 w-full lg:hidden">
        <PhoneNav />
      </div>
    </div>
  );
}

export default App
