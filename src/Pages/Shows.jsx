import  { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios"; 
import { useDispatch, useSelector } from "react-redux";
import '../index.css'
import {useNavigate, useParams} from "react-router"
import { changeSearchValue } from "../redux/Home";
import Loader from "react-js-loader";
import NetworkConnection from "../Component/NetworkConnection";
import VPNPage from "../Component/VPNPage";


const Shows = () => {
  const [items, setItems] = useState([]); 
  const [page, setPage] = useState(1); 
  const [load, setLoad] = useState(true); 
  const [hasMore, setHasMore] = useState(true); 
  const state = useSelector((state) => state.homeDetail);
  const {name}=useParams();
  const navigate = useNavigate()
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(changeSearchValue("")) 
    setPage(1); 
    window.scrollTo(0, 0);
    fetchData(true);
   
  }, []);

  useEffect(() => {
    setLoad(true)
    setPage(1); 
    window.scrollTo(0, 0);
    setItems([]); 
    fetchData(true); 
    const loaderTimer=  setTimeout(()=>{
      setLoad(false)
          },5000)
          return ()=>clearTimeout(loaderTimer)
  }, [name]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`discover/${name}`,{
        params: {
          page: page, 
        },
      });
      const fetchedData = response.data.results; 
      const totalPages = response.data.total_pages;

      setItems((prevItems) => [...prevItems, ...fetchedData]);
      setPage((prevPage) => prevPage + 1);

      if (page >= totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function exploreShow(id,showName){
    const url = `/showDetail/${showName}/${id}`;
    navigate(url)
}

  return (
    <div>
     {  load ? (
                 <div className="h-[100vh] w-[100%] flex justify-center items-center ">
                   <Loader
                     type="spinner-cub"
                     bgColor="#00e1ff"
                     color="white"
                     size={60}
                   />
                 </div>)
                 :
                 state.networkError  ? 
              < NetworkConnection />
                 :       
                 items.length <=0  ? 
                 <VPNPage />

                 :
                 <div className="overflow-hidden flex justify-center lg:justify-start">
                 <InfiniteScroll
                 class="custom-scroll"
                   dataLength={items.length}
                   next={fetchData}
                   
                   hasMore={hasMore}
                   endMessage={
                     <p style={{ textAlign: "center" }}>
                       <b>Yay! You have seen it all</b>
                     </p>
                   }
                   // pullDownToRefresh
                   pullDownToRefreshThreshold={50}
                   pullDownToRefreshContent={
                     <h3 style={{ textAlign: "center", color:"white" }}> Pull down to refresh</h3>
                   }
                   releaseToRefreshContent={
                     <h3 style={{ textAlign: "center" }}>; Release to refresh</h3>
                   }
                 >
                     <div className="grid overflow-hidden grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-2">
                   {items && items?.map((itemData) => (
                     <div key={itemData.id} className="max-w-[180px] overflow-hidden relative lg:max-w-[250px]"  onClick={()=>exploreShow(itemData.id,name)}>
                          <img  className="card_img" src={`${state.img}${itemData.poster_path}`} alt="PosterData"  />
                     </div>
                   ))}
                   </div>
                 </InfiniteScroll>
                 </div>
      }
    
    </div>
  );
};

export default Shows;
