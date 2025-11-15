import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPostById } from "../../services/postService"
import "./AllPosts.css"


export const PostDetails = ( {currentUser}) => {

    const navigate = useNavigate()
    const [ post, setPost ] = useState({})
    const { id } = useParams()


    const handleEdit = ()=>{navigate('edit-post')}


    useEffect(()=>{
        getPostById(id).then((postObj) => {
            setPost(postObj)
        })

    },[id])

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
                {post.user?.name}
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
            <div className= "btn-container" >
                {/* If the logged in user is the user who made the post then an edit button should appear. This will later navigate to the Edit Post View */}

                { post.userId === currentUser.id ? 
                    (<button    className="btn-container btn-primary"
                                onClick={handleEdit}
                    >Edit</button>) : (
                    ""
                    )}



            {/* If the logged in user is NOT the user who made the post then a "like" button should appear This will later on update the number of likes on the post in the database using a PUT method and then navigate to the Favorites View*/}

                {post.userId != currentUser.id ? (<button className="btn-container btn-primary">Like</button> ): (
                    ""
                    )}

        </div>


        
        </section>
    )
}