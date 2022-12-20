import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Register.css";
import video from "../../../Assets/video1.mp4";
import toast from "react-hot-toast";
import { authContest } from "../../Context/UseContext";
import { useForm } from "react-hook-form";
const Register = () => {
  const [error, setError] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || "/";
  const { auth, user, loginWithGoogle, creatingUserWithEp, updatingUser, verifyEmail, loading, setLoading } =
    useContext(authContest);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreatingUser = (e) => {
    const formData = new FormData();
    formData.append("image", e.image[0]);

    const url = "https://api.imgbb.com/1/upload?key=9f421b965d953a6b04039f9b09ad45b7";
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const image = data.data.display_url;
        console.log(image);
        // create User
        creatingUserWithEp(e.email, e.password)
          .then((users) => {
            verifyEmail(auth).then(() => {});
            toast.success("Please Verify Your Email")
            const userInformation = {
              userName: e.name,
              userEmail: e.email,
              userRole: e.role,
              userImg: image,
              signMethod: "Registration",
            };

            updatingUser(e.name, image)
              .then(() => toast.success("Created account successfully"))
              .catch((error) => {
                const errors = error.message;
                toast.error(errors);
              });

            fetch("http://localhost:5001/allUser", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(userInformation),
            })
              .then((res) => res.json())
              .then((data) => {
                setLoading(true);
              })
              .catch((error) => {
                const errors = error.message;
              });
            // navigating
            navigate('/login');
          })
          .catch((err) => console.error(err));
      });
  };

  // login with Google Handler
  const googleHandler = () => {
    loginWithGoogle()
      .then((result) => {
        const userName = result.user.displayName;
        const userEmail = result.user.email;
        const userImg = result.user.photoURL;
        const userinfoFromGoogle = {
          userName: userName,
          userEmail: userEmail,
          userImg: userImg,
          signMethod: "google",
          userRole: "Normal user",
        };
        console.log(result);

        fetch("http://localhost:5001/allUser", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userinfoFromGoogle),
        })
          .then((res) => res.json())
          .then((data) => {
            setLoading(true);
            console.log(result);
            toast.success("Welcome to Your PakaPepe");
            navigate(from, { replace: true });
          })
          .catch((error) => {
            const errors = error.message;
          });

        toast.success("Welcome to Your PakaPepe");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="text-white">
      <div className="video-container py-2 relative">
        <video
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "780px",
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
      <div className="w-full text-white max-w-md p-8 space-y-3 rounded-xl formBox  mx-auto my-4">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
        <form onSubmit={handleSubmit(handleCreatingUser)} className="space-y-12 ng-untouched ng-pristine ng-valid">
          <div className="space-y-4">
            {/* name field */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                placeholder="Your Name"
                {...register("name", { required: true, message: "Name required" })}
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                data-temp-mail-org="0"
              />
              {errors.name?.type === "required" && (
                <p className="text-yellow-600 font-bold" role="alert">
                  {" "}
                  Name is required
                </p>
              )}
            </div>
            {/* email field */}
            <div>
              <label htmlFor="Email" className="block mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
                {...register("email", { required: true, message: "Email required" })}
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                data-temp-mail-org="0"
              />
              {errors.email?.type === "required" && (
                <p className="text-yellow-600 font-bold" role="alert">
                  {" "}
                  Email is required
                </p>
              )}
            </div>

            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Your Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                placeholder="Your image"
                {...register("image", { required: true, message: "image required" })}
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                data-temp-mail-org="0"
              />
              {errors.image?.type === "required" && (
                <p className="text-yellow-600 font-bold" role="alert">
                  {" "}
                  image is required
                </p>
              )}
            </div>
            {/* Password field */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                {...register("password", { required: true, message: "password required" })}
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
              {errors.password?.type === "required" && (
                <p className="text-yellow-600 font-bold" role="alert">
                  {" "}
                  Password is required
                </p>
              )}
            </div>
            <p className="text-red-500">{error}</p>
          </div>
          <div className="space-y-2">
            <div>
              {loading ? (
                <h1>Wait a moment</h1>
              ) : (
                <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-yellow-500 text-gray-50">
                  Create Account
                </button>
              )}
            </div>
          </div>
        </form>
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
          Already have an account?
          <Link to="/login" className="underline text-yellow-400">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
