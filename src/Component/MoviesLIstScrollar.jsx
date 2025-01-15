import {Box as MuiBox, Typography }from '@mui/joy';
import Card from './Card';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

function MoviesLIstScrollar({data,checkTrend,title,showType}) {
    const navigate=useNavigate()
    function exploreShow(id,showName){
        const url = `/showDetail/${showName}/${id}`;
        navigate(url)
    }
    
  return (
   <>
      <Typography sx={{color:"white",marginLeft:"10px",fontSize:{
        lg:"2rem",sm:"1rem"
      }}}>{title}</Typography>
      <div className="p-2">
      <MuiBox
      sx={{
        display: 'flex',
        gap: 1,
        py: 2,
        overflow: 'auto',
        width: "100%",
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {
        data && data?.map((itemList)=>(
          <div key={itemList.id}  className="pl-1 pr-1" onClick={()=>exploreShow(itemList.id,showType)}>
            <Card  data={itemList} trending={checkTrend}/>
          </div>
        ))
      }
    
    </MuiBox>
    </div>
   </>
  )
}

MoviesLIstScrollar.propTypes = {
  data: PropTypes.any,
  title: PropTypes.string,
  checkTrend: PropTypes.bool,
  showType: PropTypes.string,
};

export default MoviesLIstScrollar