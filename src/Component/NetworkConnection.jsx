import WifiOffIcon from '@mui/icons-material/WifiOff';

function NetworkConnection() {
  return (
         <div className="flex h-[100vh] w-[100%] justify-center items-center text-[#cfeefc] flex-col gap-2">
         <WifiOffIcon sx={{color:"#07acf8",fontSize:{
           xs:"6rem",
           lg:"10rem"
         }}} />
         Please check your Network Connection
    </div>
  )
}

export default NetworkConnection