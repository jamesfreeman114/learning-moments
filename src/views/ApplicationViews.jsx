import { Route, Routes, Outlet } from "react-router-dom"
import { AllPosts } from "../components/posts/AllPosts"
import { NavBar } from "../components/nav/NavBar"
import { useState, useEffect } from "react"
import { PostDetails } from "../components/posts/PostDetails"
import { NewPostForm } from "../components/forms/NewPostForm"
import { MyPosts } from "../components/posts/MyPosts"
import { EditPost } from "../components/posts/EditPost"
import { Favorites } from "../components/posts/FavoritePosts"
import { MyProfile } from "../components/users/MyProfile"


export const ApplicationViews = () => {

    const [currentUser, setCurrentUser] = useState({})


    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(localLearningUser)
        setCurrentUser(learningUserObject)
    }, [])

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NavBar currentUser={currentUser}/>
                        <Outlet />
                    </>

                }
            >
                <Route index element={<AllPosts />} />
                <Route path="post/:id" element={<PostDetails currentUser={currentUser} />} />
                <Route path="new-posts" element={<NewPostForm />} />

                <Route path="my-posts" element={<MyPosts currentUser={currentUser} />} />
                <Route path=":id/edit-post" element={<EditPost currentUser={currentUser} />} />
                <Route path="favorites" element={<Favorites currentUser={currentUser} />} />
                <Route path="profile/:id">
                    <Route index element={< MyProfile />} />
                    
                </Route> 

            </Route>
        </Routes>
    )

}