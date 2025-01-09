import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { CardContent, Card as MuiCard, Typography } from "@mui/joy";
import { CardMedia } from "@mui/material";
import "./index.css";
import GradeIcon from '@mui/icons-material/Grade';

function Card({ data, trending }) {
  console.log("data",data);
  
  const state = useSelector((state) => state.homeDetail);
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return (
    <MuiCard
      orientation="horizontal"
      variant="outlined"
      className="card-container "
    >
      {/* Image Section */}
      <CardMedia
        component="img"
        src={`${state.img}${data.poster_path}`}
        alt={data.title ? data.title : data.name || "Poster"}
        sx={{
          width: {
            lg: "300px",
            md: "200px",
          },
         "&:hover":{
         padding:0.1,
         },
         transition: "all 0.3s ease",
          height: "250px",
          margin: 0,
          padding: 0,
          borderRadius: "8px",
          objectFit: "cover",
          
        }}
      />

      {/* Content Section */}
      {trending && (
        <CardContent
          sx={{
            backgroundColor: "#242425",
            opacity: 0.7,
            position: "absolute",
            top: 5,
            padding:"2px 15px 2px 10px",
            borderRadius:"0px 15px 0px 0px"
          }}
        >
          <Typography
            level="body2"
            sx={{
              color: "white",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 1,
              fontSize: "18px",
            }}
          >
            # Trending
          </Typography>
        </CardContent>
      )}

      <CardContent
        sx={{
          backgroundColor: "#242425",
          opacity: 0.8,
          position: "absolute",
          bottom: 0,
          padding:"0 10px",
          width: "100%",
        }}
      >
        <Typography
          level="body2"
          sx={{
            color: "white",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            fontSize: "18px",
          }}
        >
          {data.title ? data.title : data.name || "No description available."}
        </Typography>
        <div className="text-[white] flex justify-between">
            <span>
            {new Date(data.release_date ? data.release_date : data.first_air_date).toLocaleDateString('en-US', options)}
            </span>
            <span className="mr-5 text-[green]">{data.vote_average?.toFixed(1)} <span className="text-[gold] 
            ml-2"><GradeIcon sx={{fontSize:"14px"}} /></span></span>
        </div>

      </CardContent>
    </MuiCard>
  );
}
Card.propTypes = {
  data: PropTypes.string,
  trending: PropTypes.bool,
};

export default Card;
