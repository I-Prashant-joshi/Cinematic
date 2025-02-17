import  { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios"; 
import { useDispatch, useSelector } from "react-redux";
import '../index.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "../Common/Debounce";
import { Box} from "@mui/joy";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { changeSearchValue, changeTab } from "../redux/Home";

const Search = () => {
  const [items, setItems] = useState([]); 
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const state = useSelector((state) => state.homeDetail);
  const [search,setSearch]=useSearchParams()
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const searchValue = useDebounce( search.get("q"),1000)

  useEffect(() => {
    dispatch(changeTab("search"))
    setPage(1); 
    window.scrollTo(0, 0);
    fetchData(true);
  }, []);

  useEffect(() => {
    setPage(1); 
    window.scrollTo(0, 0);
    setItems([]); 
    fetchData(true); 
  }, [searchValue]);

  function exploreShow(id,showName){
    const url = `/showDetail/${showName}/${id}`;
    navigate(url)
}

  const fetchData = async () => {
    try {
      const response = await axios.get(`search/multi`,{
        params: {
          query: searchValue || "all", 
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



  return (
    <div style={{ overflow: "hidden", display:"flex",justifyContent:"center"}}>
    <InfiniteScroll
    class="custom-scroll"
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h2 style={{color:"white"}}>Loading...</h2>}
      endMessage={
        <Box sx={{ display:"flex", marginTop:"30px",flexDirection:"column", alignItems:"center", justifyContent:"center",fontSize:{
          md:"1rem",
          lg:"2rem"
        },color:"#86efac"}}>
          <ThumbUpAltIcon  sx={{fontSize:{md:"1rem",lg:"3.5rem"}}}/>
          <b>Yay! You have seen it all</b>
        </Box>
      }
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
        <div key={itemData.id} className="card_div" onClick={()=>exploreShow(itemData.id,itemData.media_type)}>
             <img  className="card_img" src={`${state.img}${itemData.poster_path}`} alt="PosterData"  />
        </div>
      ))}
      </div>
    </InfiniteScroll>
    </div>
  );
};

export default Search;
