import "./Profile.css"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getUserById, updateUser } from "../../services/userService"

export const EditProfile = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        getUserById(id).then((userObj) => { 
            setUser(userObj[0])})
    },[id])

    const handleSave = (event) => {
        event.preventDefault()

        if (user.name && user.email && user.cohort) {
            const editedUser = {
                ...user,
                name: user.name,
                email: user.email,
                cohort: user.cohort
            }

            updateUser(editedUser).then(()=>{
                window.alert("Employee updated!")
                navigate(`/profile/${user.id}`)
            })
        }

        else {
            window.alert("Please complete the form.")
        }
    }




    return (

        <form className="form-container">
        <h2>Edit Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Name</label>
                    <input  type="text"
                            required
                            value={user?.name || ""}
                            onChange={(event) => {
                                const copy = {...user}
                                copy.name = event.target.value
                                setUser(copy)
                            }} 
                    />                    
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Email</label>
                    <input  type="text"
                            required
                            value={user.email}
                            onChange={(event) => {
                                const copy = {...user}
                                copy.email = event.target.value
                                setUser(copy)
                            }}
                            
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Cohort</label>
                    <input  type="text"
                            required
                            value={user.cohort}
                            onChange={(event) => {
                                const copy = {...user}
                                copy.cohort = event.target.value
                                setUser(copy)
                            }}        
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="form-btn btn-primary"
                            onClick={handleSave}>Save</button>
                </div>
            </fieldset>
        </form>
    )
}