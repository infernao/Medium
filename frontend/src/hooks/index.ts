import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export  interface Blog{
    "content": string;
    "title": string;
    "id": string;
    "authorId": string
}


export const useBlog = ({ id }: { id: string }) =>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();


    useEffect(() => {
        if (id) {
            axios.get(`${BACKEND_URL}/api/v1/blog/one/${id}`, {
                headers: {
                    Authorization: `bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                console.log(response.data);
                setBlog(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching blog:", error);
                setLoading(false);
            });
        }
    }, [id]); 

    return {
        loading,
        blog
    }
}

export const useBlogs = () =>{
    const [loading, setLoading] = useState(true);
    // const [blogs, setBlogs] = useState<Blog[]>([]);
    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers:{
                Authorization: `bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                setBlogs(response.data);
                setLoading(false)
            })
    },[])

    return {
        loading,
        blogs
    }
}