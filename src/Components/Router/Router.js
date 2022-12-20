import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Home/Home';
import MainHome from '../MainHome/MainHome';
import OrganicFruits from '../Pages/OrganicFruits/OrganicFruits';
import Shop from '../Pages/Shop/Shop';
import Vegetables from '../Pages/Vegetables/Vegetables';
import Fruits from '../Pages/Fruits/Fruits';
import Contact from '../Pages/Contact/Contact';
import AboutUs from '../Pages/AboutUs/AboutUs';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';


const Router = () => {
    const router = createBrowserRouter([
        {path: '/', element: <MainHome></MainHome>, children:[
            {path: 'home', element: <Home></Home>},
            {path: 'vegetables', element: <Vegetables></Vegetables>},
            {path: 'shop', element: <Shop></Shop>},
            {path: 'organicFruits', element: <OrganicFruits></OrganicFruits>},
            {path: 'fruits', element: <Fruits></Fruits>},
            {path: 'aboutUs', element: <AboutUs></AboutUs>},
            {path: 'contact', element: <Contact></Contact>},
            {path: 'login', element: <Login></Login>},
            {path: 'register', element: <Register></Register>},
           
        ]},
    ])
    return (
        <div>
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
};

export default Router;