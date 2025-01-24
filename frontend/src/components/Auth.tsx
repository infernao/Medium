import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
//Link is a component from react-router-dom used to navigate between pages in a React app (like anchor tags in HTML).
//useNavigate is a React Router hook for programmatic navigation, allowing you to navigate to other pages without needing to use Link
import { BACKEND_URL } from "../config"
import axios from "axios"
import { SignupInput } from "@100xdevs/medium-common"
//ChangeEvent is a type from React used for typing events in form inputs.


export const Auth = ({type}: {type: "signup" | "signin"}) => {
//This is a functional React component named Auth.
 //It accepts a type prop, which can be either "signup" or "signin". The type of this prop is defined as "signup" | "signin", meaning the component can behave differently based on whether it's for signing up or signing in.
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    username: "",
    email: "",
    password: ""
    //This initializes the postInputs state to hold form data for name, email, and password.
  })

  async function sendRequest () {
    //asynchronous function responsible for sending the POST request to the backend for either signing up or signing in
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
      //The URL is dynamic and changes based on the type prop (either "signup" or "signin"). It appends the correct route (/signup or /signin) to the backend URL.
      //The postInputs state (form data) is sent as the body of the POST request.
      const jwt = response.data;
      console.log(jwt["jwt"])
      //backend typically returns a JSON Web Token (JWT) after successful authentication. This line stores that JWT in a variable jwt
      localStorage.setItem("token", jwt);
      //The JWT is saved in the browser's local storage with the key "token". This is typically done so that the token can be accessed for authentication in future requests
      navigate("/blogs")
      //After a successful request, the user is redirected to the /blogs page using navigate. This is where you'd typically show the user's blog posts or some protected content.
    } catch (e){
      alert("Error while signing up")
    }
  }


//jsx rendering
  return (
    <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div>
            <div className="text-4xl font-extrabold pb-2">
            Welcome to Medium! <br />
            </div>
            <div className="text-3xl font-extrabold ">
            Create an account
            </div>
            <div className="text-slate-500 mt-3 mb-3">
                {type === "signin" ? "Dont have an account:?" : "Already have an account?"}
                <Link className="pl-2 underline" to={type=== "signin" ? "/" : "/signin"}>
                  {type === "signin" ? "Sign Up" : "Sign In"}
                </Link>
            //Link is used to navigate between routes. If the type is "signin", it shows a link to the signup page (/), and if it's "signup", it links to the signin page (/signin).    
            </div>
            
            //conditional rendering based on the type prop. If the type is "signup", it shows an input field for the user's name.
            {type === "signup" ? <LabelledInput label="Name" placeholder="Pushpak Jha" onChange={(e) =>{
              setPostInputs({
                ...postInputs,
                username: e.target.value
              })
            }}/> : null}

            <LabelledInput label="Username" placeholder="pushpakjha@gmail.com" onChange={(e) =>{
              setPostInputs({
                ...postInputs,
                email: e.target.value
              })
            }}/>

            <LabelledInput label="Password" type={"password"} placeholder="123456" onChange={(e) =>{
              setPostInputs({
                ...postInputs,
                password: e.target.value
              })
//LabelledInput is a reusable component for rendering input fields with labels.
//It takes label, placeholder, onChange, and an optional type prop for input fields.
//onChange is called when the user types into the input, updating the corresponding state (postInputs
            }}/>

          <button onClick={sendRequest} type="button" className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up" : "Sign In"}</button>

          </div>
        </div>
    </div>
    
  )
}

interface LabelledInputType{
  label: string,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputType){
  return <div>

          <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">{label}</label>
          <input onChange={onChange} type={type || "text"} id="first_name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
            
        </div>
}

export default Auth