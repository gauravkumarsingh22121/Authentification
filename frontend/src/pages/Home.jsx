import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { dataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import dp from "../assets/dp.png";

const Home = () => {
    let { userData, setUserData, getUserData, serverUrl } = useContext(dataContext)
    let navigate = useNavigate()

    if (!userData) {
        navigate("/login")
        return null;
    }

    const handleLogOut = async () => {
        try {
            await axios.post(
                serverUrl + "/api/logout",
                {},
                {
                    withCredentials: true
                }
            )

            setUserData(null)
            navigate("/login")
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full h-screen bg-[#0d1818] flex flex-col justify-center items-center gap-[20px]'>

            <div className="w-[100px] h-[100px] rounded-full bg-white relative overflow-hidden border-2 border-white">
                <img
                    src={userData.profileImage || dp}
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </div>

            <p className='text-white text-[20px] font-semibold'>
                Hey, <span>{userData.firstName}</span>, welcome to Your Account
            </p>

            <button
                className="w-full h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                onClick={handleLogOut}
            >
                LogOut
            </button>

        </div>
    )
}

export default Home