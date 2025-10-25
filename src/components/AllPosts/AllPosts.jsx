import { useState, useEffect } from "react"
import { getAllPosts } from "../../services/postService"
import "./AllPosts.css"


export const AllPosts = () => {

    const [Posts, setPosts] = useState([])

    useEffect(()=>{
        getAllPosts().then(postArr => {
        setPosts(postArr)})
    }, [])

    return (
        <section className="all-posts">
            {Posts.map((postObj) => {
                return <div
                    className="post" 
                    key ={postObj.id}>
                        <h2>{postObj.title}</h2>
                        <div>{postObj.date}</div>
                    </div>
            })}
        </section>
    )
    
    
}