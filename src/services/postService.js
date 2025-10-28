export const getAllPosts = async () => {
    return await fetch("http://localhost:8088/posts?_expand=topic").then(res =>res.json())

}