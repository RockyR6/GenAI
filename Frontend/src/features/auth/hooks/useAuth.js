import { useContext } from "react"
import { AuthContext } from "../auth.context.jsx"
import { loginUser, registerUser, logoutUser, getCurrentUser } from "../services/auth.api.js"


export const useAuth = () => {
    // Access the authentication context using the useContext hook
    const context = useContext(AuthContext)
    // Destructure the context to get the user, setUser, loading, and setLoading values
    const { user, setUser, loading, setLoading } = context

    // Function to handle user login
    const handleLogin = async ({email, password}) => {
        setLoading(true)
        try{
            const data = await loginUser ({email, password})
            // Update the user state with the logged-in user's data
            setUser(data.user)
        }catch(error){
            console.error("Error logging in user:", error)
        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async ({username, email, password}) => {
        setLoading(true)
        try{
            const data = await registerUser({username, email, password})
            setUser(data.user)
        }catch(error){
            console.error("Error registering user:", error)
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async () => {
    setLoading(true)
    try{
        await logoutUser()
        setUser(null)
    }catch(error){
        console.error("Error logging out user:", error)
    }finally{
        setLoading(false)
    }
    
    
}
return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        getCurrentUser
    }


}