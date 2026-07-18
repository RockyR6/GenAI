import { useContext, useEffect } from "react"
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

useEffect(() => {
        // Fetch the current user when the component mounts
        const getAndSetCurrentUser = async () => {
            setLoading(true);
            try{
                const data = await getCurrentUser();
                setUser(data.user)
            }catch (error) {
                console.error("Error fetching current user:", error);
            } finally {
                setLoading(false);
            }
        }

        getAndSetCurrentUser();
    }, []);
return {
    // Return the user, loading state, and authentication functions from the hook
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        getCurrentUser
    }


}