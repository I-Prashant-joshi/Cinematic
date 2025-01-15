import VpnLockIcon from '@mui/icons-material/VpnLock';
function VPNPage() {
  return (
    <div className="flex h-[100vh] w-[100%] justify-center items-center text-[#cfeefc] flex-col gap-2">
    <VpnLockIcon sx={{color:"#00e1ff",fontSize:{
      xs:"6rem",
      lg:"10rem"
    }}} />
    Please use VPN Connection 
    </div>
  )
}

export default VPNPage