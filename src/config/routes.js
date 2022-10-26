import { lazy } from "react";
import PrivateRoute from "./PrivateRoute.component";
import ProtectedRoute from "./ProtectedRoute";

export const routes = {
  home: {
    name: "Home",
    path: "/",
    component: lazy(() => import("../modules/dashboard/Dashboard")),
    type: PrivateRoute,
    routeType: "customer",
  },
  myclass: {
    name: "Myclass",
    path: "/myclass",
    component: lazy(() => import("../modules/myclass/Myclass")),
    type: PrivateRoute,
    routeType: "customer",
  },
  myprofile: {
    name: "MyProfile",
    path: "/myprofile",
    component: lazy(() => import("../modules/myprofile/MyProfile")),
    type: PrivateRoute,
    routeType: "customer",
  },
  login: {
    name: "Login",
    path: "/login",
    component: lazy(() => import("../modules/signin/Signin")),
    type: ProtectedRoute,
    routeType: "customer",
  },
  signup: {
    name: "Signup",
    path: "/signup",
    component: lazy(() => import("../modules/signup/Signup")),
    type: ProtectedRoute,
    routeType: "customer",
  },
};

export const renderRoutes = Object.entries(routes);
