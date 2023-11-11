import './App.css';
import SignUp from './Components/Signup';
import { Routes, Route } from "react-router-dom";
import LogIn from './Components/Login';
import ForgetPassword from './Components/ForgetPassword';
import InternalRoutes from './InternalRoutes';
import PrivateRoute from './Components/PrivateRoute';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (

    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />

        <Route path="*" element={<PrivateRoute />}>
          <Route path="*" element={<InternalRoutes />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
