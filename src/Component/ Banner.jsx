import { useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
function  Banner() {
    const state = useSelector((state)=>state.homeDetail)
    console.log("state",state?.posterData);
    
  return (
    <div>
    <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showIndicators={false} swipeable={true} 
    >
      {state?.posterData?.map((itemDetail, index) => (
        <div key={index}  className='relative max-h-[90vh]' >
          <img
            src={state.img+itemDetail.backdrop_path}
            alt={`Slide ${index + 1}`}
          />
        <div className="absolute bottom-0 left-0 z-10 bg-[#52525375]  text-white  p-4 lg:w-[500px] md:w-[300px]" >
          <span className="font-bold lg:text-[2.5rem] md:text-[1rem]">{itemDetail.title ? itemDetail.title: itemDetail.name}</span>
        </div>

          {/* <p className="legend">{itemDetail.title || `Slide ${index + 1}`}</p> */}
        </div>
      ))}
    </Carousel>
  </div>
  )
}

export default  Banner