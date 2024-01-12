export const authReducer = (state, action) => {
    switch(action.type){
        case "SET_AUTH":
            return {
                ...state
            }
        case "SET_AUTH_SUCCESS": 
            return{
                authLoading: false,
                userData: action.data,
                isAuthenticated: true
            }
        case "SET_AUTH_FAIL":
            return{
                authLoading: false,
                userData: null,
                isAuthenticated: false
            }
            default:
                return state
    }
}