import { Circle } from "./BlogCard"  //used within the BlogSkeleton component later on to render a small circular element.

export const BlogSkeleton = () => {
  //Defines a functional component called BlogSkeleton, which is typically used as a placeholder (skeleton screen) while the actual blog content is loading. Skeleton screens are shown instead of the actual content while data is being fetched, giving the user a sense that something is loading.
  return (
<div role="status" className="animate-pulse">  
//role="status": Adds an accessibility attribute to indicate that this element represents an ongoing process, in this case, "loading" content.
//className="animate-pulse": Applies the animate-pulse class from Tailwind CSS. This class creates a pulsing animation effect on the skeleton, simulating the loading process      
    <div className="p-4 border-b border-slate-300 pb-4 w-screen max-w-screen-md cursor-pointer">//outer div for the skeleton card
        <div className="flex"> //Creates a flex container for arranging the skeleton placeholders for the author, title, and content in a row.
        <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div> // represents a circular skeleton avatar placeholde
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div> //Represents a skeleton line for the author's name.
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

            <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                <Circle /> //Renders the Circle component imported earlier. This represents a small circle, which might be used to represent a visual separator or placeholder for some content
            </div>

           <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
           </div>
        </div>

        <div className="text-xl font-semibold pt-2"> //title section of the skeleton
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div> //A skeleton line for the title. This simulates the blog post title while it's loading
        </div>

        <div className="text-ms font-thin"> //container for a text block, likely the content preview
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>

        <div className="text-slate-500 text-sm pt-4"> //container for the "read time" or similar information
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        </div>
    
        <span className="sr-only">Loading...</span> //This element is hidden from view (sr-only class makes it visible only to screen readers). It is used for accessibility to inform users that the content is loading
      </div>
    </div>

  )
}

//BlogSkeleton is a placeholder component that simulates the layout of a blog card while the actual content is loading.
//It consists of several div elements styled with Tailwind CSS classes that represent skeleton lines (gray bars) and circles, which provide a visual cue that the content is still being fetched.
//The animate-pulse class creates a pulsing animation to indicate loading, which enhances the user experience by providing feedback while waiting for the content to load.
//The skeleton screen mimics the layout of the actual blog content, such as the avatar, author name, title, content preview, and reading time, until the real data is available
