import { getLikesByUserId, unlikePost } from "../../services/likeService"
import "./AllPosts.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { editPost } from "../../services/postService"


export const Favorites = ( {currentUser} ) => {

    const userId = currentUser.id

    const [likes, setLikes] = useState([])


    useEffect(()=>{
        getLikesByUserId(userId).then(allLikes => {
            setLikes(allLikes)
        })

    },[userId])




    const handleUnlike = (likeObj) => { 

                const post = likeObj.post

                const postCopy = {
                     id: post.id,
                     title: post.title,
                     body: post.body,
                     date: post.date,
                     topicId: post.topicId,
                     userId: post.userId,
                     likes: post.likes -1
                }

                editPost(postCopy).then(()=>
                    {unlikePost(likeObj.id).then(()=>{
                        getLikesByUserId(userId).then(allLikes => {
                            setLikes(allLikes)
                        })
                    })
                })

        }


    return ( <section className="container">
            <h2>My Favorite Posts</h2>
            <div className="user-post">
                <ul>
                    {likes.map((postObj) => {
                        return (

                            <li key={postObj.id}
                                className="my-post"
                            >
                                <Link
                                    className="my-post-topic"
                                    to={`/${postObj.post.id}`}>
                                    {postObj.post.title}
                                </Link>
                                <button
                                    className="my-post-btn-primary"
                                    onClick={()=>{handleUnlike(postObj)}}
                                    >
                                    Unlike
                                </button>
                            </li>

                        )
                    })}
                </ul>
            </div>
        </section>)
}