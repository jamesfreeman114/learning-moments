import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css"


export const NavBar = ( {currentUser}) => {

    const currentUserId = currentUser.id

    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link className="navbar-link" to='/'>All Posts</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to='/new-posts'>New Post</Link>
            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to='/my-posts'>My Posts</Link>

            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to='/favorites'>Favorites</Link>

            </li>
            <li className="navbar-item">
                <Link className="navbar-link" to={`profile/${currentUserId}`}>Profile</Link>

            </li>
            {localStorage.getItem("learning_user") ? (
                <li className="navbar-item navbar-logout">
                    <Link
                        className="navbar-link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("learning_user")
                            navigate("/login", { replace: true })
                        }}
                    >
                        Logout
                    </Link>
                </li>
            ) : (
                ""
            )}
        </ul>
    )
}