import { createBrowserRouter, redirect } from "react-router-dom";
import RouteLayout from "../layouts/RouteLayout";
import Register from "../views/Register";
import Login from "../views/Login";
import HomePage from "../views/HomePage";
import DetailCourse from "../views/DetailCourse";
import Course from "../components/Course";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        // loader: () => {
        //   return localStorage.getItem("token") ? null : redirect("/login");
        // },
      },
      {
        path: "/register",
        element: <Register />,
        loader: () => {
          return localStorage.getItem("token") ? redirect("/") : null;
        },
      },
      {
        path: "/login",
        element: <Login />,
        loader: () => {
          return localStorage.getItem("token") ? redirect("/") : null;
        },
      },
      {
        path: "/detail-course/:id",
        element: <DetailCourse />,
        children: [
          {
            index: true,
            element: <Course />,
            // loader: () => {
            //   redirect("/detail-course/:id");
            // },
          },
        ],
      },
    ],
  },
]);
