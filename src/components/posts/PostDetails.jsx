import { useNavigate, useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPostById, editPost, likePost } from "../../services/postService"
import { getLikesByUserId, unlikePost } from "../../services/likeService"
import "./AllPosts.css"


export const PostDetails = ({ currentUser }) => {

    const currentUserId = currentUser.id



    const navigate = useNavigate()
    const [post, setPost] = useState({})
    const [likes, setLikes] = useState([])
    const { id } = useParams()

    const userLikedPost = likes.find(like => like.postId === parseInt(id))


    useEffect(() => {
        getLikesByUserId(currentUserId).then(allLikes => { setLikes(allLikes) })

    }, [currentUserId])

    const handleEdit = () => { navigate('edit-post') }

    const handleLike = (event) => {

        event.preventDefault()

        const likedPost = {

            id: post.id,
            title: post.title,
            body: post.body,
            date: post.date,
            topicId: post.topicId,
            userId: post.userId,
            likes: post.likes + 1

        }

        const newLike = {
            userId: currentUserId,
            postId: post.id

        }

        editPost(likedPost)
            .then(() => { likePost(newLike) })
            .then(() => { navigate("/favorites") })

    }

    const handleUnlike = (event) => {

        event.preventDefault()

        const unlikedPost = {

            id: post.id,
            title: post.title,
            body: post.body,
            date: post.date,
            topicId: post.topicId,
            userId: post.userId,
            likes: post.likes - 1

        }



        editPost(unlikedPost)
            .then(() => { unlikePost(userLikedPost.id) })
            .then(() => { navigate("/") })

    }


    useEffect(() => {
        getPostById(id).then((postObj) => {
            setPost(postObj)
        })

    }, [id])

    return (
        <section className="post-details">
            <div>
                <span className="post-topic">Title:</span>
                {post?.title}
            </div>
            <div>
                <span className="post-topic">Topic:</span>
                {post?.topic?.name}
            </div>
            <div>
                <span className="post-topic">Author:</span>
                <Link

                    to={`../profile/${post.userId}`}>
                    {post.user?.name}
                </Link>
                {/* {post.user?.name} */}
            </div>
            <div>
                <span className="post-topic">Date:</span>
                {post?.date}
            </div>
            <div>
                <span className="post-topic">Body:</span>
                {post?.body}
            </div>
            <div>
                <span className="post-topic">Number of Likes:</span>
                {post?.likes}
            </div>
            <div className="btn-container" >
                {/* If the logged in user is the user who made the post then an edit button should appear. This will later navigate to the Edit Post View */}

                {post.userId === currentUser.id ?
                    (<button className="btn-container btn-primary"
                        onClick={handleEdit}
                    >Edit</button>) : (
                        ""
                    )}



                {/* If the logged in user is NOT the user who made the post then a "like" button should appear This will later on update the number of likes on the post in the database using a PUT method and then navigate to the Favorites View*/}

                {post.userId != currentUser.id &&
                    !userLikedPost ?
                    (<button className="btn-container btn-primary"
                        onClick={handleLike}
                    >Like</button>) : (
                        ""
                    )}

                {/* If the logged in user is NOT the user who made the post AND then an "Unlike" button should appear This will later on update the number of likes on the post in the database using a PUT method and then navigate to the Favorites View*/}

                {post.userId != currentUser.id &&
                    userLikedPost ?
                    (<button className="btn-container btn-primary"
                        onClick={handleUnlike}

                    >Unlike</button>) : (
                        ""
                    )}


            </div>



        </section>
    )
}