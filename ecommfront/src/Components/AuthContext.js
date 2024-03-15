import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

// firts step is create instance of createcontext
export const AuthContext = createContext();

// 3rd step is reducer create
const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload }
        case "LOGOUT":
            return { ...state, user: null }
        default:
            return state;
    }
}

// 2nd parent authcontext craete kro jisme usereducer use krenge aur index file mai use krenge above app taaki global ye code dominate kre jisse login ko help hoga

const ParentAuthContext = ({ children }) => {

    const initialState = { user: null };

    const [state, dispatch] = useReducer(reducer, initialState)

    const Login = (data) => {
        dispatch({ type: "LOGIN", payload: data })
    }

    const Logout = () => {
        localStorage.removeItem('mytoken')
        dispatch({ type: "LOGOUT" })
        toast.success('Successfully Logged out..')
    }

    useEffect(() => {
        async function getCurrentUser() {
            try {
                const response = await axios.post('http://localhost:8000/api/v1/auth/get-current-user', { token })
                if (response.data.success) {
                    Login(response.data.user)
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        const token = JSON.parse(localStorage.getItem("mytoken"))
        if (token) {
            getCurrentUser()
        }
    }, [])

    return (
        <AuthContext.Provider value={{ state, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export default ParentAuthContext;