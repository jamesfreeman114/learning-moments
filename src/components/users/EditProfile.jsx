import "./Profile.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getUserById } from "../../services/userService"

export const EditProfile = () => {

    

    const [user, setUser] = useState([])
    const {id} = useParams()

    useEffect(()=>{
        getUserById(id).then((userObj) => { 
            setUser(userObj[0])})
    },[id])




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
                    <button className="form-btn btn-primary">Save</button>
                </div>
            </fieldset>
        </form>
    )
}