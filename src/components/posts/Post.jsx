import "./AllPosts.css"

export const Post = ({ postObj }) => {
    return (
        <div className="post">
            <h2 className="post-topic">{postObj.topic.name}</h2>
            <div className="post-title">{postObj.title}</div>
            <div className="post-likes">Likes: {postObj.likes}</div>
        </div>
    )

}