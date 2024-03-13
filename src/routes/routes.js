import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignInForm from '../containers/SignIn';
import SignupForm from '../containers/SignUp';
import { WelcomePage } from '../containers/WelcomePage';
import ProtectedRoute from './ProtectedRoute';


const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/sign-in" element={<SignInForm />} />
      <Route path="/" element={<SignupForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/landing" element={<WelcomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;