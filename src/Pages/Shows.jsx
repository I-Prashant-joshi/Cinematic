import  { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios"; 
import { useDispatch, useSelector } from "react-redux";
import '../index.css'
import {useNavigate, useParams} from "react-router"
import { changeSearchValue } from "../redux/Home";

const Shows = () => {
  const [items, setItems] = useState([]); 
  const [page, setPage] = useState(1); 
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
    setPage(1); 
    window.scrollTo(0, 0);
    setItems([]); 
    fetchData(true); 
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
    <div style={{ overflow: "hidden", display:"flex",justifyContent:"center"}}>
    <InfiniteScroll
    class="custom-scroll"
      dataLength={items.length}
      next={fetchData}
      
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      // pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: "center", color:"white" }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
      }
    >
        <div className="grid overflow-hidden grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-2">
      {items && items?.map((itemData) => (
        <div key={itemData.id} className="card_div"  onClick={()=>exploreShow(itemData.id,name)}>
             <img  className="card_img" src={`${state.img}${itemData.poster_path}`} alt="PosterData"  />
        </div>
      ))}
      </div>
    </InfiniteScroll>
    </div>
  );
};

export default Shows;
