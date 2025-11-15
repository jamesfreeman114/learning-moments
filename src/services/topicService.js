export const getAllTopics = async () => {
    return await fetch("http://localhost:8088/topics").then(res =>res.json())

}

export const getTopicById = (id) => {
    return fetch(`http://localhost:8088/posts?id=${id}`).then(res =>res.json())
}