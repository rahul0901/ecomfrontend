import { useContext, useState } from "react";
// import api from "./Helpers/Axios.Config";
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [loginData, setLoginData] = useState({ userEmail: '', userPassword: '' });

    const route = useNavigate();


    const { Login, state } = useContext(AuthContext)

    console.log(loginData, 'loginData')


    const handleOnChange = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value })
    }

    const sendData = async (event) => {
        event.preventDefault();
        if (loginData.userEmail && loginData.userPassword) {
            if (loginData.userPassword.length >= 6) {
                try {
                    const response = await axios.post('http://localhost:8000/api/v1/auth/login', { loginData })

                    setLoginData(response.data)

                    if (response.data.success) {
                        localStorage.setItem('mytoken', JSON.stringify(response.data.token));
                        Login(response.data.user)
                        setLoginData({ userEmail: '', userPassword: '' })
                        toast.success(response.data.message)
                        route('/home')
                    }
                    else {
                        toast.error(response.data.message)
                    }
                } catch (error) {
                    toast.error(error.response.data.message)
                    setLoginData({ userEmail: '', userPassword: '' })
                }
            }
            else {
                toast.error('Password must be more than 6 letters!')
            }
        }
        else {
            toast.error('All Fields are Mandatory!')
        }
    }

    return (
        <>
            <div>Login</div>
            <form onSubmit={sendData}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="userEmail" id="email" value={loginData.userEmail} onChange={handleOnChange} /> <br />
                <label htmlFor="password">Password:</label>
                <input type="password" name="userPassword" id="password" value={loginData.userPassword} onChange={handleOnChange} /> <br />
                <input type="submit" value="Login Here" />
            </form>
        </>
    )
}

export default Login;