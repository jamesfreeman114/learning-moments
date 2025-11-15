import { useState, useEffect } from "react"
import { getAllTopics } from "../../services/topicService"
import { createPost } from "../../services/postService"
import { useNavigate } from "react-router-dom"
import "./Form.css"



export const NewPostForm = () => {

    const navigate = useNavigate()
    const currentDate = new Date()


    const [allTopics, setAllTopics] = useState([])
    const [topicId, setTopicId] = useState(0)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [userId, setUserId] = useState("")

    useEffect(() => {
        getAllTopics().then(topicArr => { setAllTopics(topicArr) }

        )
    }, [])

    useEffect(() => {
        const learningUser = localStorage.getItem("learning_user")
        if (learningUser) {
            const parsedUser = JSON.parse(learningUser)
            setUserId(parsedUser.id)
        }
    }, [])

    const handleSave = (event) => {
        event.preventDefault()


        const newPost = {

            title: title,
            body: body,
            date: currentDate,
            topicId: topicId,
            userId: userId,
            likes: 0
        }


        createPost(newPost).then(() => {
            navigate(`/my-posts`)
        })
    }




    return (
        <form className="form-container">
            <h2 className="form-heading">New Post Form</h2>
            <fieldset>
                <div className="form-group">
                    <label className="label-input"> Title: </label>
                    <input className="form-control"
                        type="text"
                        placeholder="Title"
                        onChange={(event) => setTitle(event.target.value)}>

                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label className="label-input"> Body: </label>
                <input className="form-body"
                    type="text"
                    placeholder="Type your helpful hint here..."
                    onChange={(event) => setBody(event.target.value)}>

                </input>
               
                </div>
            </fieldset>
            <fieldset>
                <div className="form-dropdown">
                <select 
                    onChange={(event) => {
                        const selectedId = parseInt(event.target.value)
                        setTopicId(selectedId)

                    }}
                >
                    <option value="">Select a topic</option>
                    {allTopics.map((topic) => {
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
