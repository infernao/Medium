import { useParams } from "react-router-dom"; // Retrieves URL parameters, specifically the blog ID
import { useBlog } from "../hooks"; // Custom hook for fetching blog data
import { FullBlog } from "../components/FullBlog"; // Component to display full blog details
import { Appbar } from "../components/Appbar"; // Navigation bar component
import { BlogSkeleton } from "../components/BlogSkeleton"; // Loading placeholder component

export const Blog = () => { 
  const { id } = useParams(); // Extracts blog ID from URL
  const { loading, blog } = useBlog({
    id: id || "" // Fetches blog data using the extracted ID
  });

  if (loading || !blog) { 
    return (
      <div>
        <Appbar/>
        <div className="flex justify-center">
          <div>
            {[...Array(8)].map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
}

export default Blog;