export const getLikesByUserId = (userId) => {
    return fetch (`http://localhost:8088/userPostLikes?userId=${userId}&_expand=user&_expand=post`).then(res =>res.json())

}

export const unlikePost = (likeId) => {
    return fetch(`http://localhost:8088/userPostLikes/${likeId}`, {
        method: "DELETE"
    })
}