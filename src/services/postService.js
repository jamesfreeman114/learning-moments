export const getAllPosts = async () => {
    return await fetch("http://localhost:8088/posts?_expand=topic").then(res =>res.json())

}

export const getPostById = (id) => {
    return fetch (`http://localhost:8088/posts?id=${id}&_expand=user&_expand=topic`).then((res) => res.json())
}