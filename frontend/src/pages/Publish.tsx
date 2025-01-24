import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
//it will be used to navigate to the newly created blog after publishing it.


export const Publish = () => {
    //functional React component that will handle the page where the user can create and publish a blog post
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate()

    return (
        <div><Appbar /> //enders the Appbar component at the top of the page (likely used for navigation and other UI elements
            <div className="flex justify-center w-full pt-8">
                <div className="max-w-screen-lg w-full">
                    {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label> */}
                    <input onChange={(e) => { //input field for the blog title
                        setTitle(e.target.value) //event handler listens for any change in the input field and updates the title state variable with the new value
                    }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Title">
                    </input>
                    <TextEditor onChange={(e) => {
                        // TextEditor component is used for the blog content (description). The onChange handler updates the description state variable when the user types in the textarea inside TextEditor      
                        setDescription(e.target.value)
                    }} />
                    <button onClick={async () => {
                        //button publishes the blog post when clicked.   
                        const token = localStorage.getItem("token");
                        if (!token) {
                            console.error("No token found.");
                            return;
                        }
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog/create`, {
                            title,
                            content: description
                        },

                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });



                        //Sends a POST request to the backend to publish the blog.
                        //The request includes title and description in the request body, and the authorization token is passed in the headers.
                        navigate(`/blog/${response.data.id}`)
                        //Once the response is received, the user is redirected to the newly created blog page using navigate
                    }} type="submit" className="mt-4 inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                        Publish post
                    </button>
                </div>

            </div>
        </div>
    )
}

function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) { //This destructures the onChange prop and types it to ensure it receives a function that handles ChangeEvent from a <textarea> element.
    // This is a functional component that takes a single prop onChange. The onChange function is used to update the content of the blog (the description) when the user types in the textarea.   
    return (
        <div className="mt-8"> //div contains the main TextEditor styling
            <div className="w-full mb-4">
                <div className="flex items-center justify-between px-3 py-2 border">

                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <textarea onChange={onChange} id="editor" rows={8} className="block w-full px-0 text-sm focus-outline-none text-gray-800 bg-white border-0  " placeholder="Write a blog..." required ></textarea>
            //The onChange handler passed from the Publish component is used to update the description
                    </div>
                </div>

            </div>
        </div>
    )
}
//The Publish component is a page where users can write a new blog post by entering a title and content. Once the user clicks "Publish post", a POST request is made to the backend to create a new blog, and the user is redirected to the newly created blog post. The TextEditor component is a simple textarea that allows users to input the description of the blog.



