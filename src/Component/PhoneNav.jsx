import { useDispatch, useSelector } from 'react-redux'
import { navItem } from './constants'
import { changeTab } from '../redux/Home'
import { useNavigate } from 'react-router-dom'

function PhoneNav() {
    const state=useSelector((state)=>state.homeDetail)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    function changeTabCall(tab){
      console.log("tab",tab);
      
      if(tab==="home"){
        navigate("/home")
        dispatch(changeTab(tab))
      }
      else{
        tab=tab==="Tv Shows" ? "tv": tab
        navigate(`/shows/${tab.toLowerCase()}`)
        dispatch(changeTab(tab))
      }
      }
  return (
    <footer className="bg-[#525253c8] h-14 flex items-center justify-between bottom-0 ">
    <div className='flex items-center w-full ml-5 mr-5'>
    <div className="flex justify-between w-full gap-5 select-none">
      {navItem.map((item) => (
        <nav key={item.label} className={`flex flex-col justify-center items-center font-bold font-serif cursor-pointer text-[1rem] transition-colors duration-[0.5s] ease-in-out pt-2 
        ${
            state.tab === item.key ? "text-[#00e1ff]" : "text-white"
        }`}
        onClick={()=>changeTabCall(item.key)}
        >
          <span><item.icon /></span>
          {item.label}
        </nav>
      ))}
    </div>
    </div>
   
  </footer>
  )
}

export default PhoneNav