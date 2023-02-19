import { useState, useEffect, createContext, useContext } from "react"
import { NotificationManager } from "react-notifications"
// import { BackendApi } from "../client/backend-api"
import axios from "axios";
const UserContext = createContext({
    user: null,
    loginUser: () => { },
})

const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(user && user.role === 1)
    }, [user])

    useEffect(() => {
        axios.get(`http://localhost:3000/Users/${email}`).then(({user,error})=>{
            if (error) {
                console.error(error)
            } else {
                setUser(user)
            }
        }).catch(console.error)
    },[])
    //     BackendApi.user.getProfile().then(({ user, error }) => {
    //         if (error) {
    //             console.error(error)
    //         } else {
    //             setUser(user)
    //         }
    //     }).catch(console.error)
    // }, [])

    const loginUser = async (email, password) => {
        // let result = axios.post("http://localhost:3000/Users/login",{email,password})
        const { user, error } = await axios.post("http://localhost:3000/Users/login",{email,password})
        if (error) {
            NotificationManager.error(error)
        } else {
            NotificationManager.success("Logged in successfully")
            setUser(user)
        }
    }

    const logoutUser = async () => {
        setUser(null)
        await axios.post("http://localhost:3000/Users/logout")
        // await BackendApi.user.logout()
    }

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, isAdmin }}>
            {children}
        </UserContext.Provider>
    )
}

export { useUser, UserProvider }