// @ts-nocheck
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {

  const {loading, blogs} = useBlogs();

    if (loading){
      return <div>
        <Appbar/>
        <div className="flex justify-center">
          <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          </div>
          
        </div>
      </div>
    }
  

  return (
    <div>
       <Appbar />
      <div  className="flex justify-center">
        <div className="">
        {blogs.map(blog => <BlogCard 
         id={blog.id}
         key={blog.id}
         authorId ={blog.authorId || "PJ"}
         title={blog.title}
         content={blog.content}
         publishedDate={"23rd June"} />) }
        
       
      </div>
      </div>
    </div>
    
  )
}

//Rendering a List of Blogs: The blogs.map function is used to loop over the blogs array and render a BlogCard for each blog post. Each BlogCard is passed the necessary props (like id, authorname, title, content, and publishedDate) to display the blog information.
//Layout: The Appbar is rendered at the top of the page, followed by a flex container that centers the BlogCard components. The blog posts are displayed inside this container.
