import { memo, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../Common/FetchData";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchValue } from "../redux/Home";
import { Box } from "@mui/joy";
import { Divider } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import MoviesLIstScrollar from "../Component/MoviesLIstScrollar";
import PopUp from "../Component/PopUp";
import NetworkConnection from "../Component/NetworkConnection";
import Loader from "react-js-loader";
import VPNPage from "../Component/VPNPage";



function ShowDetails() {
  const dispatch = useDispatch();

  const { name, id } = useParams();
  const [open,setOpen]=useState(false);
  const [load,setLoad]=useState(true);
  const [showCast, setShowCast] = useState(false);
  const state = useSelector((state) => state.homeDetail);
  const data = useFetch(`${name}/${id}`);
  console.log("data",data);
  
  const CastDetail = useFetch(`${name}/${id}/credits`);
  const similar = useFetch(`${name}/${id}/similar`);
  const videoDetail = useFetch(`${name}/${id}/videos`);
  const recommended = useFetch(`${name}/${id}/recommendations`);
  const CastList =
    CastDetail?.data?.cast.length > 0
      ? CastDetail?.data?.cast.slice(0, 10)
      : CastDetail?.data?.crew.slice(0, 10);
  console.log("ddd", videoDetail);
  const options = { day: "numeric", month: "short", year: "numeric" };
  useEffect(() => {
    dispatch(changeSearchValue(""));
     const loaderTimer=  setTimeout(()=>{
      setLoad(false)
          },5000)
          return ()=>clearTimeout(loaderTimer)
  }, []);
  return (
    <>
    {
        load ? (
          <div className="text-[white] h-[100vh] w-[100%] flex justify-center items-center ">
            <Loader
              type="spinner-cub"
              bgColor="#00e1ff"
              color="white"
              size={60}
            />
          </div>) 
          :
       state.networkError ? 
      <NetworkConnection />
        :
        videoDetail.data == null ? 
        <VPNPage />
        :
    <Box sx={{ height: "100%" }}>
      <PopUp open={open} handleClose={()=>setOpen(false)} data={videoDetail?.data?.results[0]?.key} />
      <div>
        <Box
          sx={{
            height: { md: "200px", lg: "500px" },
            width: "100%",
            position: "relative",
          }}
        >
          <div style={{ height: "100%", width: "100%", position: "relative" }}>
            <img
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              src={`${state.img}${data?.data?.backdrop_path}`}
              alt="MovieBackgroundPoster"
            />
            <div className="absolute bottom-0 left-0 z-10 h-full bg-gradient-to-t from-black to-transparent  text-white p-4 w-full"></div>
          </div>
        </Box>
        <div className="lg:flex min-h-[300px]">
          <div className="w-[180px] h-[320px] m-auto  lg:m-5 top-[-100px] lg:h-[510px] lg:min-w-[300px] md:w-[50px] relative lg:top-[-200px] lg:left-8 rounded-xl overflow-hidden z-10">
            <div>
            <img
              style={{ height:"100%",width:"100%", objectFit: "cover" }}
              src={`${state.img}${data?.data?.poster_path}`}
              alt="MovieBackgroundPoster"
            />
          
          </div>
          <div className="text-[white] text-[1.5rem] lg:text-[2.5rem] gap-2 flex  justify-center items-center" >
          Play
              <PlayCircleIcon
              onClick={()=>setOpen(true)}
                sx={{
                  fontSize: {
                    xs: "50px",
                    lg:"60px"
                  },
                  "&:hover": { color: "#56f156" },
                }}
              />
            </div>
            </div>
          <div className="text-[white] mt-[-70px] lg:mt-0 p-2 ml-[5px] lg:ml-[50px]">
            <p className="text-[1.5rem] lg:text-[3rem]">
              {data?.data?.title ? data?.data?.title : data?.data?.name}
            </p>
            <p className="text-[0.8rem] lg:text-[1rem] text-[#9d9d9d]">
              {data?.data?.tagline}
            </p>
            <Divider
              sx={{
                backgroundColor: "#717173",
                height: "1px",
                width: "100%",
                margin: "10px 0px",
              }}
            />
            <div className="flex gap-4 items-center text-[0.8rem]">
              <span>Rating: {data?.data?.vote_average}+</span>
              <Divider
                sx={{
                  backgroundColor: "#717173",
                  height: "20px",
                  width: "2px",
                  margin: "10px 0px",
                }}
              />

              <span>View: {data?.data?.vote_count}</span>
              <Divider
                sx={{
                  backgroundColor: "#717173",
                  height: "20px",
                  width: "2px",
                  margin: "10px 0px",
                }}
              />
              {data?.data?.runtime && (
                <div className="flex gap-2">
                  <span>
                    Duration: {Math.floor(data?.data?.runtime / 60)}hr{" "}
                  </span>{" "}
                  <span>{Math.floor(data?.data?.runtime % 60)}min</span>
                </div>
              )}
              {data?.data?.number_of_seasons && (
                <>
                  <span>Total seasons: {data?.data?.number_of_seasons}</span>
                  <span>Total episodes: {data?.data?.number_of_episodes}</span>
                </>
              )}
            </div>
            <Divider
              sx={{
                backgroundColor: "#717173",
                height: "1px",
                width: "100%",
                margin: "10px 0px",
              }}
            />
            <p className="text-[1.5rem] lg:text-[1.8rem]">Overview</p>
            <span className="text-[1rem] lg:text-[1.3rem] text-[#e6e4e4] text-justify text-wrap font-sans">
              {data?.data?.overview}
            </span>
            <Divider
              sx={{
                backgroundColor: "#717173",
                height: "1px",
                width: "100%",
                margin: "10px 0px",
              }}
            />
            <div className="flex gap-5 items-center ">
              <div className="flex gap-2">
                <span>Status:</span>{" "}
                <span className="text-[green]">{data?.data?.status}</span>
              </div>
              <Divider
                sx={{
                  backgroundColor: "#717173",
                  height: "20px",
                  width: "2px",
                  margin: "10px 0px",
                }}
              />
              <div className="flex gap-2">
                <span>Release Date: </span>
                <span>
                  {new Date(
                    data?.data?.first_air_date || data?.data?.release_date
                  ).toLocaleDateString("eng-us", options)}
                </span>
              </div>
            </div>
            <div>
              <span>Show Cast :</span>{" "}
              <button
                onClick={() => setShowCast(!showCast)}
                style={{
                  backgroundColor: "#757272",
                  padding: "2px 15px",
                  borderRadius: "10px",
                  marginLeft: "20px",
                }}
              >
                show
              </button>
              {showCast && (
                <div className="flex h-[100%] flex-wrap gap-5 pt-5 justify-center lg:justify-start  ">
                  {CastList &&
                    CastList.map((item, index) => (
                      <div
                        key={index}
                        className="h-[150px] w-[150px] rounded-full bg-[red overflow-hidden"
                      >
                        <img
                          src={`${state.img}${item?.profile_path}`}
                          alt="profile"
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ color: "white", padding: "10px" }}>
          <MoviesLIstScrollar
            data={similar?.data?.results}
            trending={false}
            title={"Similar Shows"}
            showType="movie"
          />
          <MoviesLIstScrollar
            data={recommended?.data?.results}
            trending={false}
            title={"Recommended"}
            showType="movie"
          />
        </div>
      </div>
    </Box>
  }
  </>

  );
}

export default memo(ShowDetails);
