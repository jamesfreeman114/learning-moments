import "./AllPosts.css"
import { useEffect, useState } from "react"
import { getPostById, editPost } from "../../services/postService"
import { getAllTopics } from "../../services/topicService"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const EditPost = () => {

    const navigate = useNavigate()

    const [post, setPost] = useState({})
    const [topics, setTopics] = useState([])
    const {id} = useParams()


    useEffect(() => {
        getPostById(id).then((postObj) => {
            setPost(postObj)
        })
    }, [id])

    useEffect(()=> {
        getAllTopics().then((data) => setTopics(data))
    }, [])


    
    const handleSave = (event) => {
        event.preventDefault()

        if (post.title && post.body && post.topicId) {
            const editedPost = {
            id: post.id,
            title: post.title,
            body: post.body,
            date: post.date,
            topicId: post.topicId,
            userId: post.userId,
            likes: post.likes

        }
        editPost(editedPost).then(()=>{navigate("../my-posts")})


        } else {
            window.alert("Please complete the form!")
        }
        
    }

  

    return  (
        <form className="form-container">
            <h2 className="form-heading">New Post Form</h2>
            <fieldset>
                <div className="form-group">
                    <label className="label-input"> Title: </label>
                    <input className="form-control"
                        type="text"
                        value={post?.title || ""}
                        onChange={(event) => {
                            const copy = { ...post}
                            copy.title = event.target.value
                            setPost(copy)
                        }}

                       >

                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label className="label-input"> Body: </label>
                <input className="form-body"
                    type="text"
                    value={post?.body || ""}
                        onChange={(event) => {
                            const copy = { ...post}
                            copy.body = event.target.value
                            setPost(copy)
                        }}
                    >

                </input>
               
                </div>
            </fieldset>
            <fieldset>
                <div className="form-dropdown">
                <select
                    value ={post?.topicId || ""}
                    onChange={(event)=> {
                                    const copy = {...post}
                                    copy.topicId = parseInt(event.target.value)
                                    setPost(copy)
                                }}
                >
                    <option value="">Select a topic</option>
                    {topics.map((topic) => {
                        return (
                            <option
                                className="post-option"
                                key={topic.id}
                                value={topic.id}
                                
                            >
                                {topic.name}
                            </option>
                        )
                    })}
                </select>
                </div>
            </fieldset>
            <fieldset>
                <button className="btn-primary"
                    onClick={handleSave}

                >
                    Save
                </button>
            </fieldset>
        </form>
    )
}