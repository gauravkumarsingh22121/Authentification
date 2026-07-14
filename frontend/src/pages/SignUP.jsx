import React, { useContext, useState } from "react";
import axios from "axios";
import dp from "../assets/dp.png";
import { dataContext } from "../context/UserContext";
import {useNavigate} from 'react-router-dom'
import {useRef} from "react"

const SignUP = () => {
  const { serverUrl ,userData,setUserData,getUserData} = useContext(dataContext);
  let navigate=useNavigate()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let file=useRef(null)

  const handleSignUP = async (e) => {
    e.preventDefault();

    try {
      let formdata=new FormData()
      formdata.append("firstName",firstName)
      formdata.append("lastName",lastName)
      formdata.append("userName",userName)
      formdata.append("email",email)
      formdata.append("password",password)
      if(backendImage){
        formdata.append("profileImage",backendImage)
      }

      let {data} = await axios.post(
        serverUrl + "/api/signup",
        formdata,
        {
          withCredentials: true,
          headers:{"Content-Type":"multipart/form-data"}
        }
      );
      await getUserData()
      setUserData(data.user)
      navigate("/")
      

      console.log(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  let [frontendImage,setFrontendImage]=useState(dp)
  let [backendImage,setBackendImage]=useState(null)
  const handleImage = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setBackendImage(selectedFile);

    const image = URL.createObjectURL(selectedFile);
    setFrontendImage(image);
  };


  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="w-[90%] max-w-[500px] bg-[#141f1f] rounded-xl flex flex-col items-center p-8">
        <h1 className="text-white text-3xl font-semibold mb-8">
          Sign Up
        </h1>

        <form
          className="w-full flex flex-col items-center gap-5"
          onSubmit={handleSignUP}
        >
          <input type="file" hidden ref={file} onChange={handleImage} />
          {/* Profile Image */}
          <div
            className="w-[100px] h-[100px] rounded-full bg-white relative overflow-hidden border-2 border-white cursor-pointer"
            onClick={() => file.current.click()}
          >
            <img
              src={frontendImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 flex justify-center items-center text-white text-4xl transition-all duration-300">
              +
            </div>
          </div>

          <div className="w-full flex gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 h-12 bg-white rounded-lg px-4 outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 h-12 bg-white rounded-lg px-4 outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            type="text"
            placeholder="Username"
            className="w-full h-12 bg-white rounded-lg px-4 outline-none"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 bg-white rounded-lg px-4 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full h-12 bg-white rounded-lg px-4 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
          <p className=" text-white cursor-pointer" onClick={()=>navigate("/login")}>Already have an account ? <span className=" text-[#0ed3e1]">Login</span></p>
        </form>
      </div>
    </div>
  );
};

export default SignUP;