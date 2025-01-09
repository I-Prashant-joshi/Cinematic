import { useDispatch, useSelector } from "react-redux";
import Banner from "../Component/ Banner"
import MoviesLIstScrollar from "../Component/MoviesLIstScrollar";
import { useEffect } from "react";
import { changeSearchValue } from "../redux/Home";

function Home() {
  const state = useSelector((state)=>state.homeDetail)
  const dispatch=useDispatch()
  useEffect(()=>{
 dispatch(changeSearchValue(""))
  },[])
  return (
    <div>
      <Banner />
      <MoviesLIstScrollar data={state.trending} trending={true} title={"Trending"} showType="movie" />
      <MoviesLIstScrollar data={state.nowPlaying} trending={false} title={"Now Playing"} showType="movie" />
      <MoviesLIstScrollar data={state.topRated} trending={false} title={"Top Rated"} showType="movie" />
      <MoviesLIstScrollar data={state.popularTvSows} trending={false} title={"Popular Tv Sows"} showType="tv" />
      <MoviesLIstScrollar data={state.onAirShows} trending={false} title={"On The Air"} showType="tv" />
      <MoviesLIstScrollar data={state.upcoming} trending={false} title={"Upcoming"} showType="movie" />
    </div>
  )
}

export default Home