import React from 'react';
import Signin from '~/components/Signin/Signin';
import Signup from '~/components/Signup/Signup';
import configFile from '~/config';
import AdminPages from '~/Pages/Admin';
import { DashBoard } from '~/Pages/Admin/DashBoardPage';
import { SignInPage } from '~/Pages/Admin/SignInPage';
import { HomePage } from '~/Pages/User/HomePage';

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
];
