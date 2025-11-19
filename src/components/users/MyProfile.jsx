import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserById } from "../../services/userService"
import "./Profile.css"
import { getAllPosts } from "../../services/postService"

export const MyProfile =  ( ) => {

    const {id} = useParams()


    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        getAllPosts().then((posts)=> {
            const userPosts = posts.filter(post => post.userId === parseInt(id))
            setPosts(userPosts)
        })
    }, [id])

    useEffect(()=>{
        getUserById(id).then(users => setUser(users[0]))
    }, [id])

 

    return ( <section className="container">
            <div>{user?.name}</div>
            <div>{user?.email}</div>
            <div>{user?.cohort}</div>
            <div>{posts?.length}</div>
            </section>)
}