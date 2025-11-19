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
            <h2 className="user-heading">User Profile</h2>
            <div>
                <span className="post-topic">Name: </span>
                {user?.name}
            </div>
            <div>
                <span className="post-topic">Email: </span>
                {user?.email}
            </div>
            <div>
                <span className="post-topic">Cohort: </span>
                {user?.cohort}
            </div>
            <div>
                <span className="post-topic">Total Posts: </span>
                {posts?.length}
            </div>
          
            </section>)
}