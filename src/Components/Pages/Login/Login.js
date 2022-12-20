import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContest } from "../../Context/UseContext";
import video from "../../../Assets/video1.mp4";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { getValue } from "@testing-library/user-event/dist/utils";
const Login = () => {
  const {auth, user, loginWithEp, setLoading, loading, loginWithGoogle } = useContext(authContest);
  const [error, setError] = useState();
  const [emailVerify, setEmailVerify] = useState();
  const [resetPassword, setResetPassword] = useState(null)

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  // console.log(user);
 

  const handleLogin = (e) => {
    
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    


    loginWithEp(email, password)
      .then((res) => {
        if (!res.emailVerified) {
          console.log(res.user);
          setEmailVerify("Your Email is not verified Please Verify your Email");
        }
        setLoading(false);
          toast.success("Welcome to Your PakaPepe");
          navigate(from, { replace: true });
      })
      .catch((error) => {
        const errors = error.message;
        setError(errors);
        toast.error("Something went wrong");
        console.log(errors)
      });
    
  };

    const emailValue = e =>{
      const email = e.target.value;
      setResetPassword(email)
     
    }

  const forgotPassword =(e)=>{
    sendPasswordResetEmail(auth, resetPassword)
    toast.error('Please Check your Email and Reset Password')
  }

  // login with Google Handler
  const googleHandler = () => {
    loginWithGoogle()
      .then((result) => {
        console.log(result);
        toast.success("Welcome to Your Dream Bike");
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="text-white">
      <div className="video-container py-3 relative">
        <video
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "600px",
            position: "absolute",
            top: "0",
            backgroundPosition: "cover",
            backgroundRepeat: "no-repeat",
            left: "0",
            zIndex: "-10000",
            objectFit: "cover",
          }}
        >
          <source type="video/mp4" src={video}></source>
        </video>
        <div className="overlay">
          <div className="text text-left"></div>
        </div>
      </div>
      <div className="w-full  text-white max-w-md p-8 space-y-3 rounded-xl formBox  mx-auto my-4">
        <h1 className="text-2xl font-bold text-center">Login your Account</h1>
        <form onSubmit={handleLogin} className="space-y-12 ng-untouched ng-pristine ng-valid">
          <div className="space-y-4">
            {/* email field */}
            <div>
              <label htmlFor="Email" className="block mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Your email"
                onChange={emailValue}
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                data-temp-mail-org="0"
              />
              
            </div>
            
            {/* Password field */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <p onClick={forgotPassword} className="text-xs hover:underline text-gray-200">Forgot password?</p>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                required
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                data-temp-mail-org="0"
              />
              
            </div>
          </div>
          <div className="space-y-2">
            <div>
              
                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-yellow-500 text-gray-50">
                  Log in
                </button>
              
            </div>
            <p className="text-white font-bold">{error}</p>
            
          </div>
         
        </form>
        <p className="text-white font-bold">{emailVerify}</p>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm">Login with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={googleHandler}
            className="block w-full p-2 text-center rounded-sm text-gray-50 bg-yellow-500"
          >
            Login with google
          </button>
        </div>
        <p className="text-xs text-center sm:px-6">
          Don't have an account?
          <Link to="/register" className="underline text-yellow-700">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
