import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ImageContainer from "./ImageContainer";
import logo from "../assets/Img/logo.png";
import google from "../assets/Img/google.png";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      let signIn = await signInWithPopup(auth, provider);
      console.log("signin", signIn.user);
      localStorage.setItem("email", signIn.user.email)
      localStorage.setItem("displayName", signIn.user.displayName)
      navigate("/feed");
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  return (
    <>
      <div className="relative h-screen lg:w-[50%] w-[90%] m-auto bg-gray-100 overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <ImageContainer />
        </div>

        {/* Drawer Section */}
        <div
          id="login-container"
          className="absolute w-[95%] m-auto bottom-0 left-0 right-0 bg-white lg:rounded-t-[8rem] rounded-t-[4rem] z-10 p-6 shadow-lg"
        >
          <div id="second-part" className="text-black flex flex-col items-center">
            {/* Logo Section */}
            <div className="flex flex-col items-center">
              <div id="logo-container" className="flex items-center gap-2">
                <img src={logo} alt="logo" className="w-12 h-8" />
                <h1 className="text-2xl font-semibold font-Karla">Vibesnap</h1>
              </div>

              <div id="logo-para" className="mt-2 text-center">
                <p className="text-lg font-KumbhSans">
                  Moments That Matter, Shared Forever.
                </p>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="bg-gray-900 text-white rounded-full flex items-center gap-3 px-6 py-2 mx-auto mt-7 hover:bg-gray-800"
          >
            <img src={google} alt="google-logo" className="w-5 h-5" />
            <p className="font-bold text-lg font-Karla">
              Continue with Google
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
