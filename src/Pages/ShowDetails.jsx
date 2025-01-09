import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../Common/FetchData'
import { useDispatch, useSelector } from 'react-redux'
import { changeSearchValue } from '../redux/Home'
import { Box } from '@mui/joy'
import { Divider } from '@mui/material'

function ShowDetails() {
    const dispatch=useDispatch()
    useEffect(()=>{
   dispatch(changeSearchValue(""))
    },[])
    const {name,id}=useParams()
    const state = useSelector((state) => state.homeDetail);
    const data= useFetch(`${name}/${id}`)
    console.log("ddd",data.data);
    
  return (
    <Box sx={{ height: "100vh" }}>
      <div>
        <Box sx={{ height: { md: "200px", lg: "500px" }, width: "100%" ,position:"relative"}}>
            <div style={{ height: "100%", width: "100%", position:"relative"}}>
          <img
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            src={`${state.img}${data?.data?.backdrop_path}`}
            alt="MovieBackgroundPoster"
          />
          <div
            className="absolute bottom-0 left-0 z-10 h-full bg-gradient-to-t from-black to-transparent  text-white p-4 
        w-full"
          ></div>
          </div>
          <div className='flex'>
          <div className='min-w-[130px] h-[200px] left-4 top-[-100px] lg:h-[500px] lg:min-w-[300px]  md:w-[50px] relative lg:top-[-200px] lg:left-8 rounded-xl overflow-hidden z-10'>
          <img
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            src={`${state.img}${data?.data?.poster_path}`}
            alt="MovieBackgroundPoster"
          />
          </div>
          <div className='text-[white] p-2 ml-[30px] lg:ml-[50px]'>
           <p className='text-[3rem]'>{data?.data?.title ? data?.data?.title : data?.data?.name}</p>
           <p className='text-[1rem] text-[#9d9d9d]'>{data?.data?.tagline}</p>
           <Divider sx={{backgroundColor:"#717173",height:"1px",width:"100%",margin:"10px 0px"}} />
            <div className='flex gap-4 items-center'>
                <span>Rating: {data?.data?.vote_average}+</span>
           <Divider sx={{backgroundColor:"#717173",height:"20px",width:"2px",margin:"10px 0px"}} />

                <span>View: {data?.data?.vote_count}</span>
           <Divider sx={{backgroundColor:"#717173",height:"20px",width:"2px",margin:"10px 0px"}} />

                <div className='flex gap-2'>
                <span>Duration: {Math.floor(data?.data?.runtime / 60)}hr </span> <span>{Math.floor(data?.data?.runtime % 60)}min</span>
                </div>
            </div>
            <Divider sx={{backgroundColor:"#717173",height:"1px",width:"100%",margin:"10px 0px"}} />

           <span className='text-[1.4rem] text-[#e6e4e4] text-wrap font-sans'>{data?.data?.overview}</span>


          </div>
          </div>
        </Box>
      </div>
    </Box>
  );
}

export default ShowDetails