import { Route, Routes, Outlet } from "react-router-dom"
import { AllPosts } from "../components/posts/AllPosts"
import { NavBar } from "../components/nav/NavBar"
import { useState, useEffect } from "react"


export const ApplicationViews = () => {

    const [currentUser, setCurrentUser] = useState({})

useEffect(() => {
  const localLearningUser = localStorage.getItem("learning_user")
  const learningUserObject = JSON.parse(localLearningUser)
  setCurrentUser(learningUserObject)
}, [])

    return(
        <Routes>
            <Route 
                path="/"
                element={
                   <>
                    <NavBar />
                    <Outlet />
                   </>  
                    
                }
            >
                <Route index element= {<AllPosts />} />
            </Route>
        </Routes>
    )

}