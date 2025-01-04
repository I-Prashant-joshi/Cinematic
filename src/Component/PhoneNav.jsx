import { useDispatch, useSelector } from 'react-redux'
import { navItem } from './constants'
import { changeTab } from '../redux/Home'

function PhoneNav() {
    const state=useSelector((state)=>state.homeDetail)
    console.log("tab",state.tab);
    
    const dispatch=useDispatch()
    function changeTabCall(tab){
      dispatch(changeTab(tab))
      }
  return (
    <footer className="bg-[#5252539a] h-14 flex items-center justify-between bottom-0 ">
    <div className='flex items-center w-full ml-5 mr-5'>
    <div className="flex justify-between w-full gap-5 select-none">
      {navItem.map((item) => (
        <nav key={item.label} className={`flex flex-col justify-center items-center font-bold font-serif cursor-pointer text-[1rem] pt-2 
        ${
            state.tab == item.label ? "text-green-300" : "text-white"
        }`}
        onClick={()=>changeTabCall(item.label)}
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