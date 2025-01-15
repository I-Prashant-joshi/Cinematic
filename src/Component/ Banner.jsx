
import { useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import "react-responsive-carousel/lib/styles/carousel.min.css";
function  Banner() {
    const state = useSelector((state)=>state.homeDetail)
    
  return (
    <div>
      
    <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showIndicators={false} swipeable={true} 
    >
      {state?.posterData?.map((itemDetail, index) => (
        <div key={itemDetail.id}  className='relative max-h-[90vh]' >
          <img
            src={state.img+itemDetail.backdrop_path}
            alt={`Slide ${index + 1}`}
          />
           
        <div className="absolute bottom-0 left-0 z-10  bg-gradient-to-t from-black to-transparent  text-white p-4 
        w-full" >
          <div className=" text-white p-4 
        w-[200px] md:w-[300px] lg:w-[500px]">
          <div className='flex flex-col text-left'>
          <span className="font-bold lg:text-[2.5rem] md:text-[1rem]">{itemDetail.title ? itemDetail.title: itemDetail.name}</span>
          <span className="
            text-ellipsis 
            line-clamp-2 lg:line-clamp-3 md:line-clamp-2 
            text-[0.5rem] md:text-[0.75rem] lg:text-[1rem]">
         {itemDetail.overview }</span>
         <div className='flex gap-5 pt-2 text-[10px] md:text-[6px] lg:text-[1rem] text-center items-center' >
         <p className='flex flex-col'><span className='text-[#56f156]'>Rating: </span>{itemDetail.vote_average}</p>
          <p className='flex flex-col'><span className='text-[#56f156]'>View: </span> {itemDetail.vote_count}</p>
          <PlayCircleIcon  sx={{
        fontSize: {
          xs: '20px', 
          md: '40px', 
        },
        "&:hover":{color:"#56f156"}
      }} />
         </div>
          </div>
          </div>
        </div>

        </div>
      ))}
    </Carousel>
  </div>
  )
}

export default  Banner