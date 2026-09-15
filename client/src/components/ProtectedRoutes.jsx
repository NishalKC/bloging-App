import { Navigate } from "react-router-dom"

const ProtectedRoutes = ({islogin, children}) => {
    
  if (!islogin){
      console.log("no");
    return <Navigate to={"/login"} replace/>
    
  }
  return children
}

export default ProtectedRoutes