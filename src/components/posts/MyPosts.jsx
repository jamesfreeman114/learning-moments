import { useState, useEffect } from "react"
import { getAllPosts } from "../../services/postService"
import { deletePost } from "../../services/postService"
import { Link } from "react-router-dom"

export const MyPosts = ({ currentUser }) => {


    const [user, setUser] = useState()
    const [posts, setPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    const userId = currentUser.id

    const handleClick = (postId) => {
        deletePost(postId).then(() => {
            getAllPosts().then(allPosts => {
                setPosts(allPosts)
            })

        })

    }


    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(localLearningUser)
        setUser(learningUserObject)
    }, [])

    useEffect(() => {
        getAllPosts().then(allPosts =>
            setPosts(allPosts)
        )
    }, [])

    useEffect(() => {
        const myPosts = posts.filter(post => post.userId === userId)
        setFilteredPosts(myPosts)
    }, [posts, userId])

    return (
        <section className="MyPosts">
            <h2>My Posts</h2>
            <div className="user-post">
                {filteredPosts.map((postObj) => {
                    return (

                        <li key={postObj.id}>
                            <Link to={`/${postObj.id}`}>
                                {postObj.title}
                            </Link>
                            <button onClick={() => handleClick(postObj.id)}>
                                Delete
                            </button>
                        </li>

                    )
                })}
            </div>
        </section>
    )
}