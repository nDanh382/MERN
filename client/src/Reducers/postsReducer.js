
const postsReducer = (state, action) => {
    const {type, data} = action;
    switch(type){
        case "POSTS_LOADED_SUCCESS":
            return {
                ...state,
                postsLoading: false,
                posts: data
            }
        case "POSTS_LOADED_FAIL":
            return {
                postsLoading: false,
                posts: [],
                ...state
            }
        case "FIND_POST": 
            return {
                ...state,
                post: data
            }
        case "DELETE_POST":
            return{
                ...state,
                posts: state.posts.filter(post => post._id !== data)
            }
        case "ADD_POST":
            return { 
                ...state,
                posts: [...state.posts, data]
            }
        case "UPDATE_POST": 
            const newPosts = state.posts.map(post => post._id === data._id ? data: post)
            return {
                ...state,
                posts: newPosts

            }
        default: 
            return state
    }
}
export default postsReducer