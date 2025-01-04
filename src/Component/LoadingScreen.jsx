import Loader from "react-js-loader";
function LoadingScreen() {
  return (
    <div style={{height:"100vh",width:"100%", textAlign:"center", display:"flex",justifyContent:"center",alignItems:"center"}}>
       <Loader type="bubble-scale" bgColor={"blue"} color={"blue"} title={"ekvalayzer"} size={100} />
    </div>
  )
}

export default LoadingScreen