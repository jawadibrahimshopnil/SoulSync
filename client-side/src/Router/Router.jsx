import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Layout/Root";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Home from "../Pages/Home/Home";
import Biodatas from "../Pages/Biodatas/Biodatas";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Dashboard from "../Layout/Dashboard";
import ErrorPage from "../Pages/ErrorPage";
import Login from './../Pages/Login/Login';
import Register from './../Pages/Register/Register';
import EditBio from "../Pages/Dashboard/User/EditBio/EditBio";
import ViewBio from "../Pages/Dashboard/User/ViewBio/ViewBio";
import ContactReq from "../Pages/Dashboard/User/ContactReq/ContactReq";
import FavBio from "../Pages/Dashboard/User/FavBio/FavBio";
import GotMarried from "../Pages/Dashboard/User/GotMarried/GotMarried";
import BiodataDetails from './../Pages/BiodataDetails/BiodataDetails';
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ApprovedPremium from './../Pages/Dashboard/Admin/ApprovedPremium';
import ContactPay from "../Pages/Payment/ContactPay";
import SuccessStory from "../Pages/Dashboard/Admin/SuccessStory";
import RequestedContact from "../Pages/Dashboard/Admin/RequestedContact";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/biodatas",
                element: <Biodatas></Biodatas>,
            },
            {
                path: "/biodatas/:id",
                element: <PrivateRoute><BiodataDetails></BiodataDetails></PrivateRoute>,
            },
            {
                path: "/aboutus",
                element: <AboutUs></AboutUs>
            },
            {
                path: "/contactus",
                element: <ContactUs></ContactUs>
            },
            {
                path: "/contactpay/:biodataId",
                element: <ContactPay></ContactPay>
            },
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute> <Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'editbio',
                element: <EditBio></EditBio>
            },
            {
                path: 'viewbio',
                element: <ViewBio></ViewBio>
            },
            {
                path: 'contactreq',
                element: <ContactReq></ContactReq>
            },
            {
                path: 'favbio',
                element: <FavBio></FavBio>
            },
            {
                path: 'gotmarried',
                element: <GotMarried></GotMarried>
            },
            {
                path: 'admin-home',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute> 
            },
            {
                path: 'approved-premium',
                element: <ApprovedPremium></ApprovedPremium>
            },
            {
                path: 'contact-request',
                element: <AdminRoute><RequestedContact></RequestedContact></AdminRoute> 
            },
            {
                path: 'success-story',
                element: <AdminRoute><SuccessStory></SuccessStory></AdminRoute> 
            },
        ]
    },
    {
        path: '/login',
        element: <Login></Login>,
    },
    {
        path: '/register',
        element: <Register></Register>,
    },

]);