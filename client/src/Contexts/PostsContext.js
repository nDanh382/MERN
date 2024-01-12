import axios from "axios";
import { createContext, useReducer, useState} from "react";
import postsReducer from "../Reducers/postsReducer";
import { apiUrl } from "./Constants";

//create Context
export const PostsContext = createContext();
const initPostsState = {
    postsLoading: true,
    posts: [],
    post: null
}
const PostsProvider = ({children}) => {
    const [postsState, postsDispatch] = useReducer(postsReducer, initPostsState)
	const [showAddPostModal, setShowAddPostModal] = useState(false)
	const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

    //get Post
    const getPosts = () => {
        axios.get(`${apiUrl}/posts`)
        .then((res)=> {
            if(res){
                postsDispatch({
                    type: "POSTS_LOADED_SUCCESS",
                    data: res.data.data
                })
            }
        })
        .catch((err) => {
            postsDispatch({
                type: "POSTS_LOADED_FAIL",
                data: err
            })
        })
    }	


    // Add post
    const addPost = (newPost) => {
        axios.post(`${apiUrl}/posts`, newPost)
        .then((res) => {
            if(res.data.success){
                postsDispatch({
                    type: "ADD_POST",
                    data: res.data.post
                })
                return res.data
            }
        })
        .catch((err) => {
            return err.res.data
        })
    }
    


    // find post
    
    const findPost = (postId) => {
		const post = postsState.posts.find(post => post._id === postId)
		postsDispatch({ type: "FIND_POST", data: post })
	}      
    // update post
    const updatePost = (updatedPost) => {
        axios.put(`${apiUrl}/posts/${updatePost._id}`, updatedPost)
        .then((res) => {
            if(res.data.success){
                postsDispatch({
                    type: "UPDATE_POST",
                    data: res.data.post
                })
                return res.data


            }
            console.log(res.data.post)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    // delete post
    const deletePost = (postId) => {
       axios.delete(`${apiUrl}/posts/${postId}`)
       .then((res) => {
        if(res.data.success){
            postsDispatch({
                type: "DELETE_POST",
                data: res.data.data
            })
        }
        console.log(res.data.data)
       })
       .catch((err) => {
        postsDispatch({
            type: "POSTS_LOADED_FAIL",
            data: err
        })
       })

    }

    
    
//data
    const postProviderData = {
        postsState, 
        getPosts, 
        findPost, 
        deletePost, 
        addPost, 
        updatePost,
        showAddPostModal,
		setShowAddPostModal,
		showUpdatePostModal,
		setShowUpdatePostModal,
        showToast,
		setShowToast,
    }


    return (
        <PostsContext.Provider value={postProviderData}>
            {children}
        </PostsContext.Provider>
    )
}
export default PostsProvider;