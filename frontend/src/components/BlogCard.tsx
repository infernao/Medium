import { Link } from "react-router-dom"

interface BlogCardProps{
    authorId: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export const BlogCard = ({
 //This is a functional React component that takes the properties defined in the BlogCardProps interface   
    authorId,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
  return ( 
  <Link to={`/blog/${id}`}>
  // When clicked, the Link will navigate the user to a dynamic route /blog/{id}, where {id} is replaced by the actual id value passed to the BlogCard component. This link corresponds to a single blog's detail page.  
  <div className="p-4 border-b border-slate-300 pb-4 w-screen max-w-screen-md cursor-pointer">
    //container div for each blog card
        <div className="flex">// Creates a Flexbox container for the content inside the card, which allows for flexible layout positioning.
            <div className="">
            <Avatar size={"small"} name={authorId}/>//renders an Avatar component, passing the authorname prop as the name and setting the size of the avatar to "small". This will display the author's avatar (a circular image with the first letter of the author's name).
            </div>
           <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
           {authorId} //contains the author's name and applies several Tailwind CSS styles
           </div>
           <div className="pl-2 flex justify-center flex-col mt-1">
            <Circle /> // Renders a Circle component, which is a small circle
           </div>
           <div className="text-sm pl-2 font-thin text-slate-500 flex justify-center flex-col">
           {publishedDate} 
           </div>
        </div>
        <div className="text-2xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-sm font-thin"> //container for displaying a preview of the content
            {content.slice(0,100)+"..."} // Displays the first 100 characters of the blog content and appends ellipsis (...) to indicate that the content is truncated
        </div>
        <div className="text-slate-400 text-sm pt-4"> //container for displaying the estimated reading time
            {`${Math.ceil(content.length / 100)} minutes(s) read`}
        </div>
    
    </div>
  </Link>
    
  )
}

export function Circle(){ //This is a functional component that renders a small circle using Tailwind CSS classes.
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size= "small"}: { name: string, size: "small" | "big"}){
    //functional component that renders an avatar (circular profile image) with the initial of the author's name.
    return <div className={`relative inline-flex items-center justify-center 
    overflow-hidden bg-gray-400 rounded-full ${size === "small" ? "w-6 h-6": "w-10 h-10"}`}>
        
        <span className={`${size === "small" ? "text-xs" : "text-md"} font-small text-gray-900 dark:text-gray-300`}>
            {name[0]} //Extracts the first letter of the name string.
        </span>
    </div>
    
}

//BlogCard: This component displays a card for a blog post, showing the author, title, a truncated version of the content, and the published date. It calculates the estimated reading time and uses an avatar for the author's profile picture.
//Circle: This component renders a small circle, used to separate elements in the BlogCard.
//Avatar: This component renders a circular avatar with the author's first letter, adjusting its size based on the size prop.