import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes> {/* This component is a container for defining the application's routes.
               It is used to wrap all the individual <Route> components that specify
               which components should be rendered based on the URL path. */}
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

//Navigation: Users can navigate between the routes such as /, /signin, /blogs, /blog/:id, and /publish without reloading the page. The correct component will be rendered based on the URL.
//Client-Side Routing: This is a client-side routing setup, meaning the app's content will dynamically change when users click links or navigate to different paths without a full page reload.


