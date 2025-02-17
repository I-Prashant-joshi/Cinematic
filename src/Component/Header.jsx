import { useEffect, useState } from 'react';
import logo from '../../src/assets/cinematicLogo.png'; // Use relative path for public folder images in Vite
import { navItem } from './constants';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchValue, changeTab } from '../redux/Home';
function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const state=useSelector((state)=>state.homeDetail)
  const navigate= useNavigate() 
  const dispatch=useDispatch()
 const location = useLocation()
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return; 
    }
    setDrawerOpen(open);
  };
  useEffect(()=>{
    window.scrollTo(1,1)
  },[location.pathname])
  function onSubmitForm(e){
    e.preventDefault();
  }

  const list = () => (
    <Box sx={{ width: 150 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {navItem.map((text) => (
          <ListItem key={text.label} disablePadding>
            <ListItemButton onClick={()=>changeTabCall(text.label)} style={{color:
            state.tab === text.label ? "#00e1ff" : "black"
          }}>
            <text.icon/>
              <ListItemText primary={text.label} className='ml-3'/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    
    </Box>
  );
  function searchValue(data){
    dispatch(changeSearchValue(data))
    navigate(`/search?q=${data}`);

  }
  
function changeTabCall(tab){
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
    <header className=" fixed bg-[#5252538c] w-full h-12 flex items-center justify-between select-none z-50 lg:h-16 md:h-12">
      <div className='flex items-center'>
      <div className="h-full w-[7rem] flex items-center ml-5">
        <img src={logo} alt="Logo" className="w-[3rem] lg:w-[4rem]" />
      </div>
      <div className="hidden lg:flex gap-5 ml-10">
        {navItem?.map((item) => (
          <nav key={item.label}
          className={`font-bold lg:font-serif cursor-pointer text-[1.4rem] pt-2 ${
            state.tab === item.key ? "text-[#12d9f3] " : "text-white"
          }`}
           onClick={()=>changeTabCall(item.key)}
           >
            {item.label}
          </nav>
        ))}
      </div>
      </div>
      <div className='flex gap-4'>
      <div className='lg:mr-10'>
        <form action="" className='flex gap-2 mt-2' onSubmit={onSubmitForm}>
          <input type='text' value={state.searchValue} onChange={(event)=>searchValue(event.target.value)}name='search' placeholder='search here ...'  className="w-[110px] text-white border-none bg-transparent outline-none"/>
        <SearchIcon className='text-white'/>

        </form>
      </div>
      <div className="lg:hidden md:flex text-white w-10 cursor-pointer mt-2">
         <MenuIcon onClick={toggleDrawer(true)} />
        <SwipeableDrawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
          {list()}
        </SwipeableDrawer>
      </div>
      </div>
    </header>
  );
}

export default Header;