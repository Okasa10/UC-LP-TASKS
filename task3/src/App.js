// importing css
import './Components/App.css';



// importing all the componenets of the form
import Navbar from './Components/FormComponets/Navbar.js';
import { Name, Email, Username } from './Components/FormComponets/Text.js'
import { Password, ConfirmPassword } from './Components/FormComponets/Password.js';
import { DOB } from './Components/FormComponets/Date.js';
import { Phone } from './Components/FormComponets/Phone.js';
import Login from './Components/Login.js';


// import states and pop ups
import { useState, useContext, createContext } from 'react';
import { Slide, Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Main from './Components/Main.js';
import AuthProvider from './Components/Auth.js'

//made to export bg theme to all pages
export const BgContext = createContext();
export const StateContext = createContext();



// all the form components are in this finction
export function FormComponent() {

  const { bg, obg, setBg, setobg } = useContext(BgContext);
  const { name, setName, email, setEmail, pass, setPass, confirmPass, setConfirmPass, dob, setDob, username, setUsername, phone, setPhone } = useContext(StateContext);



  // creating State for each property to be checked so that we know if the form is still submitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  //made to navigate to another file
  const navigate = useNavigate();

  //toast use karne ke liye
  const Emit = (text) => {
    return (
      toast.info((text), {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      }
      ))
  }

  const clearFields = () => {
    setName("");
    setConfirmPass("");
    setDob("");
    setEmail("");
    setPass("");
    setUsername("");
    setPhone("");
  }

  // checking all the requirements are fulfilled before submiting the form
  const Validate = () => {
    // checking if all fields are filled
    if (!name || !email || !pass || !confirmPass || !dob || !phone) {
      return toast.warn('Fill all the required details!', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
    else if ((!name.match(/^[a-zA-Z\s'-]{8,20}$/)) ||
      (!email.match(/([a-zA-Z0-9_\-.]+[@][a-zA-Z]+[.]{1}[a-z]{2,3})/)) ||
      (!pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\S])(?!.*\s).{8,20}$/)) ||
      (confirmPass !== pass)) {

      if (!name.match(/^[a-zA-Z\s'-]{8,20}$/)) {
        Emit('The name must be Minimum 8 letters and Maximum 20 letters')
      }


      if (!email.match(/^([a-zA-Z0-9_\-.]+[@]{1}[a-zA-Z]+[.]{1}[a-z]{2,3})$/)) {
        Emit('Enter the email in Standard format');
      }


      if (!pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\S])(?!.*\s).{8,20}/)) {
        Emit('The password must contain all the specified fields')
      }


      if (confirmPass !== pass) {
        toast.error('The confirm password must match the entered password', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
    else {
      setIsSubmitting(true);
      toast.success('Congratulations!! Your form was successfully submitted', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      //sending the user data to the server
      axios.post('https://auth-backend-138t.onrender.com/api/v1/users/register', {
        "username": `${username}`,
        "fullName": `${name}`,
        "email": `${email}`,
        "password": `${pass}`,
        "phone": `${phone}`,
        "dob": `${dob}`
      }
      )
        .then(function (response) {

          // to clear user inputs
          clearFields();
        })
        .catch(function (error) {

          if (error.response && error.response.status === 409) {
            toast.error('User already exists. Please try logging in.');
          } else {
            toast.error('An error occurred. Please try again.');
          }

        });
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 4000);
    }

  };

  //making extra already signed up btn 
  function LoggedIn() {
    return (
      <button type="button" className='btn btn-primary' onClick={loggedIn}>Already Signed Up</button>
    )
  }

  const loggedIn = () => {
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1000);
  }

  return (
    <>
      <Navbar setBg={setBg} setobg={setobg} title="SignUp Form" extra={<LoggedIn />} />
      <div style={obg} className='py-5'>
        <div className='Box container' style={bg}>
          <Name name={name} setName={setName} />
          <Email email={email} setEmail={setEmail} />
          <Username username={username} setUsername={setUsername} />
          <Password pass={pass} setPass={setPass} bg={bg} />
          <ConfirmPassword confirmPass={confirmPass} setConfirmPass={setConfirmPass} bg={bg} />
          <DOB dob={dob} setDob={setDob} />
          <Phone phone={phone} setPhone={setPhone} />
          <button type="button" className="btn btn-secondary my-4" onClick={Validate} disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

function App() {

  //defining all states in global context so useconteext can be used
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  // same reason as above
  const [bg, setBg] = useState({
    backgroundColor: '#ADEFD1FF',
    boxShadow: "0 4px 8px 0 rgba(0, 31, 63, 0.244), 0 6px 20px 0 rgba(0, 31, 63, 0.581)",
    color: '#00203FFF'
  })
  const [obg, setobg] = useState({
    backgroundColor: 'rgba(173, 239, 209, 0.629)'
  })
  return (
    <StateContext.Provider value={{ name, setName, email, setEmail, pass, setPass, confirmPass, setConfirmPass, dob, setDob, username, setUsername, phone, setPhone }}>
      <AuthProvider>
        <BgContext.Provider value={{ bg, setBg, obg, setobg }} >
          <Router>
            <ToastContainer />
            <Routes>
              <Route path='/' element={<FormComponent />} />
              <Route path="/login/*" element={<Login />} />
              <Route path="/mainpage/*" element={<Main />} />
            </Routes>
          </Router>
        </BgContext.Provider>
      </AuthProvider >
    </StateContext.Provider>
  );
}

export default App;