import { useState, useEffect } from "react"
import { getAllPosts } from "../../services/postService"
import { deletePost } from "../../services/postService"
import { Link } from "react-router-dom"
import "./AllPosts.css"

export const MyPosts = ({ currentUser }) => {

    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    const userId = currentUser.id

    const getAndSetPosts = () => {
        getAllPosts().then(allPosts => {
            setPosts(allPosts)
        })
    }

    const handleClick = (postId) => {
        deletePost(postId).then(() => {
            getAndSetPosts()
        })
    }


    useEffect(() => {
        getAndSetPosts()
    }, [])

    useEffect(() => {
        const myPosts = posts.filter(post => post.userId === userId)
        setFilteredPosts(myPosts)
    }, [posts, userId])

    return (
        <section className="container">
            <h2>My Posts</h2>
            <div className="user-post">
                <ul>
                    {filteredPosts.map((postObj) => {
                        return (

                            <li key={postObj.id}
                                className="my-post"
                            >
                                <Link
                                    className="my-post-topic"
                                    to={`/${postObj.id}`}>
                                    {postObj.title}
                                </Link>
                                <button
                                    className="my-post-btn-primary"
                                    onClick={() => handleClick(postObj.id)}>
                                    Delete
                                </button>
                            </li>

                        )
                    })}
                </ul>
            </div>
        </section>
    )
}