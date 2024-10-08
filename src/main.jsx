
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from './Store/Store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './Component/index.js'
import SignUp from './pages/Sign up.jsx'
import AllPosts from './pages/AllPost.jsx'
import Addpost from './pages/Addpost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
const router=createBrowserRouter([{
  path:"/",
  element:<App/>,
  children:[
    {
      path: "/",
      element: <Home />,
  },
  {
      path: "/login",
      element: (
          <AuthLayout authentication={false}>
              <Login />
          </AuthLayout>
      ),
  },
  {
      path: "/signup",
      element: (
          <AuthLayout authentication={false}>
              <SignUp />
          </AuthLayout>
      ),
  },
  {
      path: "/all-posts",
      element: (
          <AuthLayout authentication>
              {" "}
              <AllPosts />
          </AuthLayout>
      ),
  },
  {
      path: "/add-post",
      element: (
          <AuthLayout authentication>
              {" "}
              <Addpost />
          </AuthLayout>
      ),
  },
  {
      path: "/edit-post/:slug",
      element: (
          <AuthLayout authentication>
              {" "}
              <EditPost />
          </AuthLayout>
      ),
  },
  {
      path: "/post/:slug",
      element: <Post />,
  },
],




}])

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>,
)
