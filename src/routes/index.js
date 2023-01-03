import React from 'react';
import Signin from '~/components/Signin/Signin';
import Signup from '~/components/Signup/Signup';
import ResetPassword from '~/components/ResetPassword/ResetPassword';
import configFile from '~/config';
import AdminPages from '~/Pages/Admin';
import { DashBoard } from '~/Pages/Admin/DashBoardPage';
import { SignInPage } from '~/Pages/Admin/SignInPage';
import { HomePage } from '~/Pages/User/HomePage';
import { AboutUs } from '~/Pages/User/AboutUs';
import { ProductDetail } from '~/Pages/User/ProductDetail';
import { Cart } from '~/Pages/User/Cart';
import { Checkout } from '~/Pages/User/Checkout';
import Profile from '~/Pages/User/UserPage/Profile';
import Orders from '~/Pages/User/UserPage/Orders';
import ChangePassword from '~/Pages/User/UserPage/ChangePassword';

export const adminRoutes = [
  { path: configFile.routes.admin, component: DashBoard },
  {
    path: configFile.routes.signInAdmin,
    component: SignInPage,
    layout: React.Fragment,
  },
  {
    path: configFile.routes.adminRoute,
    component: AdminPages,
  },
];
export const userRoutes = [
  {
    path: configFile.routes.signInUser,
    component: Signin,
    layout: React.Fragment,
  },
  {
    path: configFile.routes.signUpUser,
    component: Signup,
    layout: React.Fragment,
  },
  {
    path: configFile.routes.home,
    component: HomePage,
  },
  {
    path: configFile.routes.aboutUs,
    component: AboutUs,
  },
  {
    path: configFile.routes.resetPassword,
    component: ResetPassword,
    layout: React.Fragment,
  },
  {
    path: configFile.routes.product,
    component: ProductDetail,
  },
  {
    path: configFile.routes.cart,
    component: Cart,
  },
  {
    path: configFile.routes.checkout,
    component: Checkout,
  },
  {
    path: configFile.routes.profile,
    component: Profile,
  },
  {
    path: configFile.routes.orderHistory,
    component: Orders,
  },
  {
    path: configFile.routes.changePassword,
    component: ChangePassword,
  },
];
