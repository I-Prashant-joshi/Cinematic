import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box container sx={{backgroundColor:"#626161",color:"white",fontSize:{
      md:"1rem",
      lg:"1.7rem"
    },alignItems:"center",padding:1}}>
        <div className="flex flex-col ">
          <div className="flex justify-center gap-5">
          <span style={{cursor:"pointer",userSelect:"none"}}>About Us</span>
          <span style={{cursor:"pointer",userSelect:"none"}}>Contact Us</span>
          </div>
          <div className="flex justify-center text-[12px]">
          <span>Created by: Prashant Joshi</span>
         </div>
        </div>
      
    </Box>
  );
}


