import { useContext, useState } from "react";
// import api from "./Helpers/Axios.Config";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Register = () => {

    const [userData, setUserData] = useState({ userName: '', userEmail: '', userPassword: '', userNumber: '' });

    const navigate = useNavigate();

    const { state, Login } = useContext(AuthContext);

    const handleOnChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const sendData = async (event) => {
        event.preventDefault();
        if (userData.userName && userData.userEmail && userData.userPassword && userData.userNumber) {
            if (userData.userPassword.length >= 6) {
                try {
                    const response = await axios.post('http://localhost:8000/api/v1/auth/register', { userData })

                    if (response.data.success) {
                        localStorage.setItem('mytoken', JSON.stringify(response.data.token));
                        Login(response.data.user);
                        setUserData({ userName: '', userEmail: '', userPassword: '', userNumber: '' })
                        toast.success(response.data.message)
                        navigate('/home');
                    }
                    else {
                        toast.error(response.data.message)
                    }
                } catch (error) {
                    toast.error(error.response.data.message)
                    setUserData({ userName: '', userEmail: '', userPassword: '', userNumber: '' })
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
            <div>Register</div>
            <form onSubmit={sendData}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="userName" id="name" value={userData.userName} onChange={handleOnChange} /> <br />
                <label htmlFor="email">Email:</label>
                <input type="email" name="userEmail" id="email" value={userData.userEmail} onChange={handleOnChange} /> <br />
                <label htmlFor="password">Password:</label>
                <input type="password" name="userPassword" id="password" value={userData.userPassword} onChange={handleOnChange} /> <br />
                <label htmlFor="number">Number:</label>
                <input type="number" name="userNumber" id="number" value={userData.userNumber} onChange={handleOnChange} /> <br />
                <input type="submit" value="Register Here" />
            </form>
        </>
    )
}

export default Register;