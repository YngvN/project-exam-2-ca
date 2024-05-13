import React from 'react';
import { Routes, Route } from "react-router-dom";

import { Layout } from './sections/layout';
import Home from './pages/home/home';
import Booking from './pages/booking/booking';
import Profile from './pages/profile/profile';

import { LoginLayout } from './pages/login/loginLayout';
import Login from './pages/login/login';
import CreateUser from './pages/login/createUser';

import 'bootstrap/dist/css/bootstrap.min.css';

import RouteNotFound from './pages/404notfound';

function App() {
  return (
    <div>
      <Routes>

        {/* Add /auth to path of LoginLayout */}
        <Route path="/" element={<LoginLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="create" element={<CreateUser />} />
        </Route>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="booking" element={<Booking />} />
          <Route path="*" element={<RouteNotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
