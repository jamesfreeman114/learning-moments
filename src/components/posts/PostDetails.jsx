import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPostById } from "../../services/postService"
import "./AllPosts.css"


export const PostDetails = ( {currentUser}) => {

    const [ post, setPost ] = useState({})
    const { id } = useParams()

    useEffect(()=>{
        getPostById(id).then((data) => {
            const postObj = data[0]
            setPost(postObj)
        })

    },[id])

    return (
        <section >
            <div>
                <span className="post-topic">Title:</span>
                {post?.title}
            </div>
            <div>
                <span className="post-topic">Topic:</span>
                {post.topic?.name}
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
            <div className="btn-container" >
                {/* If the logged in user is the user who made the post then an edit button should appear */}

                { post.userId === currentUser.id ? (<button>Edit</button>) : (
                    ""
                    )}



            {/* If the logged in user is NOT the user who made the post then a "like" button should appear */}

                {post.userId != currentUser.id ? (<button>Like</button> ): (
                    ""
                    )}

        </div>


        
        </section>
    )
}