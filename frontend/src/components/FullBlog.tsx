import { Blog } from "../hooks/index"; //imports the Blog type or interface from the hooks/index file. This type is expected to define the shape of the blog object passed into the FullBlog component
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    //starts the JSX that will be rendered by the FullBlog component.
    <div>
      <Appbar /> {/* Renders the Appbar component (the navigation bar), which is likely used to display a header with links or the site logo */}
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-10 pt-20 max-w-screen-xl ">
          <div className="col-span-8">
            <div className="text-3xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-3">Posted on 26th June 2024</div>
            <div className="">{blog.content}</div>
          </div>

          <div className="col-span-4">
            <div className="text-slate-600 text-lg">
                Author
            </div>
            
            <div className="flex"> //Creates a flex container for the avatar and author details, aligning them horizontally
                <div className="pr-4 flex flex-col justify-center">
                <Avatar size={"small"} name={blog.authorId || "Anonymous"}/>
                </div>
              <div> //Contains the author's name and a description
                <div className="text-xl font-bold">
                  {blog.authorId || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//FullBlog is a functional component that displays a blog post in a detailed view.
// It uses the Appbar component for the header/navigation bar.
// The layout consists of two sections:
// The left column (spanning 8 out of 12 grid columns) shows the blog's title, publication date, and content.
// The right column (spanning 4 out of 12 grid columns) shows the author's information, including their avatar, name, and a short description.
// The blog's data is passed as the blog prop, which contains information such as the blog's title, content, and the author's name.
// The Avatar component is used to display the author's avatar, which can be based on the author's name or default to "Anonymous".