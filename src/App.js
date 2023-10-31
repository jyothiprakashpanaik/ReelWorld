import './App.css';
import SignUp from './Components/Signup';
import { Routes, Route } from "react-router-dom";
import LogIn from './Components/Login';
import ForgetPassword from './Components/ForgetPassword';
import { AuthProvider } from './Context/AuthContext';
import Feed from './Components/Feed';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
import ManageAccount from './Components/ManageAccount';
import SideNavBar from './Components/SideNavBar';

function App() {
  return (

    <AuthProvider>
      <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />

          <Route exact path="/profile/:id" element={<PrivateRoute />}>
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
          <Route exact path="/manageaccount" element={<PrivateRoute />}>
            <Route path="/manageaccount" element={<ManageAccount />} />
          </Route>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Feed />} />
          </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
