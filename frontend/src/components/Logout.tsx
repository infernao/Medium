// import { useState } from "react";
import { useNavigate } from "react-router-dom";

// export interface LogoutInputType{
//     login: string,
//     logout: string,
//   }
  
export const Logout = () => {
    // const [isLoggedin, setIsLoggedin] = useState(false);
    const navigate = useNavigate()
    // setIsLoggedin(true)

    const logout = () => {
        // localStorage.removeItem("token");
        // setIsLoggedin(false);
        navigate('/') // user clicks on the logout button, they will be redirected to the homepage ("/")
    };

    // const login = () =>{
    //     navigate("/signin")
    // }

  return (
    //component is returning JSX (the layout structure), which defines what the Logout component will render on the screen
    <div>
        <button 
        //    onClick={() => {
        //     `type === "login" : ${login} ? ${logout}`
        //    }}
        onClick={logout} //onClick event listener is set to call the logout function when the button is clicked. This will trigger the redirect to the root route ("/"
           type="button"
            className="ml-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          >
           Logout
          </button>
    </div>
  )
}