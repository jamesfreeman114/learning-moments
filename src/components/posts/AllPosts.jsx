import { useState, useEffect } from "react"
import { getAllPosts } from "../../services/postService"
import { getAllTopics } from "../../services/topicService"
import "./AllPosts.css"
import { Post } from "./Post"
import { SearchBar } from "./SearchBar"
import { DropdownMenu } from "./Dropdown"
import { Link } from "react-router-dom"


export const AllPosts = () => {

    const [Posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [topicName, setTopicName] = useState('')

    useEffect(() => {
        const foundPost = Posts.filter((post) => {
            return post.title.toLowerCase().includes(searchTerm.toLowerCase())
        })
        setFilteredPosts(foundPost)
    }, [Posts, searchTerm])

    useEffect(() => {
        if (topicName) {
            const topicMatch = Posts.filter((post) => {
                return post.topic.name === topicName
            })
            setFilteredPosts(topicMatch)
        }
        else {
            setFilteredPosts(Posts)
        }
    }, [Posts, topicName])

    useEffect(() => {
        getAllPosts().then(postArr => {
            setPosts(postArr)
        })
    }, [])

    useEffect(() => {
        getAllTopics().then(topicArr => {
            setAllTopics(topicArr)
        })
    }, [])

    return (
        <div className="homepage">
            <div className="search-controls">
                < SearchBar
                    setSearchTerm={setSearchTerm}
                />
                <DropdownMenu
                    setTopicName={setTopicName}
                    allTopics={allTopics}
                />
            </div>

           <section className="all-posts">
                {filteredPosts.map((postObj) => {
                    return <Link to={`${postObj.id}`} key={postObj.id}>
                    < Post postObj={postObj}  />
                    </Link>
                })}
            </section>
        </div>

    )


}