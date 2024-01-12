import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../Reducers/authReducer";
import { apiUrl } from "./Constants";
import { LOCAL_STORAGE_TOKEN } from "./Constants";
import setAuthToken from "../utils/setAuthToken";
import { useNavigate } from "react-router";
export const AuthContext = createContext();
const initAuthState = {
    authLoading: false,
    userData: [],
    isAuthenticated: false
}
const AuthContextProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(authReducer, initAuthState)
    
    //Authenticate user
    const loadUser = async () => {
        let token = localStorage.getItem(LOCAL_STORAGE_TOKEN)
        if(token){
            setAuthToken(token)
        }
        axios.get(`${apiUrl}/auth`)
        .then((res) => {
            if(res.data.success){
                authDispatch({
                    type: "SET_AUTH_SUCCESS",
                    data: res.data
                })
            }
        })
        .catch((error) => {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN)
            setAuthToken(null)
            authDispatch({
                type: "SET_AUTH_FAIL"
            })
        })
    }

    useEffect(() => {
        loadUser()
    }, [])

    // login context
    const loginUser =  (userForm) => {       
        return axios.post(`${apiUrl}/auth/login`, userForm)
            .then((res) => {
                if(res.data.success){
                    localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.accessToken)
                    
                }
                loadUser()
                return res.data
                
            })
            .catch((err) => {
                return {
                    success: false,
                    message: err
                }
            })
        
    }

    // register context
    const registerUser = async (userForm) => {
        return await axios.post(`${apiUrl}/auth/register`, userForm)
        .then((res) => {
            if(res.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN, res.data.accessToken)
            }
            loadUser()
            return res.data
        })
        .catch((err) => {
            return {
                success: false,
                message: err
            }
        })
    }

    // Logout 
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN);
        authDispatch({
            type: "SET_AUTH_FAIL"
        })
    }
    // Context data
    const AuthContextData = {loginUser, authState, registerUser, logoutUser}

    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider
