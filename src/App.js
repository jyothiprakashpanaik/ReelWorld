import './App.css';
import SignUp from './Components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from './Components/Login';
import ForgetPassword from './Components/ForgetPassword';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="login" element={<LogIn/>}/>
      <Route path="signup" element={<SignUp/>}/>
      <Route path="forgetpassword" element={<ForgetPassword/>}/>
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
