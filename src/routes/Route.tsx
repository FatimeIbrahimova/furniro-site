
import { lazy } from 'react';

const MainRoot = lazy(() => import('../components/MainRoot'));
const Blog = lazy(() => import('../pages/Blog'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const Contact = lazy(() => import('../pages/Contact'));
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const ProductDetails = lazy(() => import('../pages/ProductDetails'));
const Register = lazy(() => import('../pages/Register'));
const Profile=lazy(()=>import("../pages/Profile"))
const ResetPassword = lazy(() => import('../pages/ResetPassword'));
const Shop = lazy(() => import('../pages/Shop'));
const Wishlist = lazy(() => import('../pages/Wishlist'));
const NotFound = lazy(() => import('../pages/NotFound'));

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }: any) => {
  const TOKEN = localStorage.getItem("token");
  return TOKEN ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;

export const ROUTES = [
    {
        path:"/",
        element:<MainRoot/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"shop",
                element:<Shop/>
            },
            {
                path:"blog",
                element:<Blog/>
            },
            {
                path:"contact",
                element:<ProtectedRoute element={<Contact/>}/>
            },
            {
				path: "/product/:id",
				element: <ProductDetails/>,
			},
            {
                path:"cart",
                element: <ProtectedRoute element={<Cart/>} />,
            },
            {
                path:"checkout",
                element:<ProtectedRoute element={<Checkout/>} />
            },
            {
                path:"login",
                element:<Login/> 
            },
            {
                path:"register",
                element:<Register/> 
            },
            {
                path:"profile",
                element:<ProtectedRoute element={<Profile/>} />
            },
            {
                path:"password",
                element:<ProtectedRoute element={<ResetPassword/> } />
            },
            {
                path:"wishlist",
                element:<ProtectedRoute element={<Wishlist/>} /> 
            }
        ]
    },
    {
		path: "/*",
		element: <NotFound/>,
	},
];