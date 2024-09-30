// importing css
import './App.css';

// importing all the componenets of the form
import Navbar from './Components/Navbar';
import { Name, Email, Username } from './Components/Text'
import { Password, ConfirmPassword } from './Components/Password';
import { DOB } from './Components/Date';
import { Phone } from './Components/Phone';

// import states and pop ups
import { useState } from 'react';
import { Slide, Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  // creating State for each property to be checked
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [bg, setBg] = useState({
    backgroundColor: '#ADEFD1FF'
  })


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


  // checking all the requirements are fulfilled before submiting the form
  const Validate = () => {
    // checking if all fields are filled
    if (name === "" || email === "" || pass === "" || confirmPass === "" || dob === "" || phone === "") {
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
        // return <Emit text={'The name must be Minimum 8 letters and Maximum 20 letters'} />
      }
      if (!email.match(/^([a-zA-Z0-9_\-.]+[@]{1}[a-zA-Z]+[.]{1}[a-z]{2,3})$/)) {
        Emit('Enter the email in Standard format');
        // return <Emit text={'Enter the email in Standard format'} />
      }
      if (!pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\S])(?!.*\s).{8,20}/)) {
        Emit('The password must contain all the specified fields')
        // return <Emit text={'The password must contain all the specified fields'} />
      }
      else {
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
    }
    else {
      return toast.success('Congratulations!!Your form was successfully submitted', {
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
    }
  }


  return (
    <>
      <ToastContainer />
      <Navbar setBg={setBg} />
      <div className="Box" style={bg} >
        <>
          <Name name={name} setName={setName} />
          <Email email={email} setEmail={setEmail} />
        </>
        <>
          <Username username={username} setUsername={setUsername} />
          <Password pass={pass} setPass={setPass} bg={bg} />
          <ConfirmPassword confirmPass={confirmPass} setConfirmPass={setConfirmPass} bg={bg} />
        </>
        <>
          <DOB dob={dob} setDob={setDob} />
          <Phone phone={phone} setPhone={setPhone} />
          <button type="button" className="btn btn-secondary my-4" onClick={Validate}>Submit </button>
        </>
      </div>
    </>
  );
}

export default App;
