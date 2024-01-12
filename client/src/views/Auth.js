import { Outlet } from "react-router"
import { AuthContext } from "../Contexts/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router"
import Spinner from "react-bootstrap/Spinner"

const Auth = () => {  
    const navigate = useNavigate(); 
    const {authState} = useContext(AuthContext);
    let body
    if(authState.authLoading){
        body = (
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant="info"/>
            </div>
        )
    } else if(authState.isAuthenticated){
        return navigate('/dashboard')
    } else {
        body = (
        <>
            
            <h1>LearnIt</h1>
            <h4>Keep track of what you are</h4>
            <Outlet/>
        </>
        )
    }
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    {body}
                </div>
            </div>

        </div>
    )
}
export default Auth