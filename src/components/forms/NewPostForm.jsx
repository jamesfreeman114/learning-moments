import { useState, useEffect } from "react"
import { DropdownMenu } from "../posts/Dropdown"
import { getAllTopics } from "../../services/topicService"
import { createPost } from "../../services/postService"
import { useNavigate } from "react-router-dom"



export const NewPostForm = () => {

    const navigate = useNavigate()
    const currentDate = new Date()


    const [allTopics, setAllTopics] = useState([])
    const [topicName, setTopicName] = useState("")
    const [topicId, setTopicId] = useState(0)
    const [name, setName] = useState("")
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

            title: name,
            body: body,
            date: currentDate,
            topicId: topicId,
            userId: userId,
            likes: 0
        }


        createPost(newPost).then(() => {
            navigate(`/MyPosts`)
        })
    }




    return (
        < section className="new-post">
            <h2>New Post Form</h2>
            <input className="new-post-input"
                type="text"
                placeholder="Name"
                onChange={(event) => setName(event.target.value)}>

            </input>
            <input className="new-post-input"
                type="text"
                placeholder="Body"
                onChange={(event) => setBody(event.target.value)}>

            </input>
            <select
                onChange={(event) => {
                    const selectedId = parseInt(event.target.value)
                    const selectedTopic = allTopics.find(topic => topic.id === selectedId)

                    setTopicId(selectedId)
                    setTopicName(selectedTopic.name)
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
            <button className="btn-primary"
                onClick={handleSave}

            >
                Save
            </button>
        </ section>
    )
}
