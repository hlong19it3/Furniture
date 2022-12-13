import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

import CustomAxios from '../../config/api';
// import { data } from 'autoprefixer'

function Signup(props) {
  // const navigate = useNavigate()

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState('');
  // const [pwdError, setPwdError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  // const validPassword = new RegExp(
  //   '^(?=.*d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-#$.%&*])(?=.*[a-zA-Z]).{8,16}$'
  // )
  // const validate = (password) => {
  //   if (!validPassword.test(password)) {
  //     setPwdError('Invalid password')
  //   } else {
  //     setPwdError('')
  //   }
  // }
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      await CustomAxios.post('/api/v1/users/signup', {
        firstName,
        lastName,
        email,
        address,
        phone,
        password,
      });
      alert('Signup successfully!');
      // console.log(res.data);
    } else {
      alert('wrong repeat password');
    }
  };

  return (
    <div id="bg">
      <div className="signup-page">
        <h2>SIGN UP</h2>
        <form onSubmit={handleSubmit} className="form-signup">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            required
            minLength={3}
            maxLength={25}
          ></input>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            required
            minLength={3}
            maxLength={25}
          ></input>

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            required
            minLength={10}
            maxLength={11}
          ></input>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
            minLength={3}
            maxLength={300}
          ></input>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          ></input>
          <input
            value={password}
            placeholder="Password"
            type={passwordShown ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          ></input>
          <i className="fa-solid fa-eye" id="showPassIcon1" onClick={togglePassword} />

          <input
            value={confirmPassword}
            placeholder=" Repeat password"
            type={passwordShown ? 'text' : 'password'}
            // onClick={validate}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>

          {/* {pwdError} */}
          <input type="submit" value="Sign up"></input>
          <br></br>
          <Link to="/signin" style={{ textDecoration: 'none', marginLeft: '108px', fontSize: '19px' }}>
            Already have account? Sign in now!
          </Link>
          <br></br>
          <Link to="/" style={{ textDecoration: 'none', marginLeft: '215px', fontSize: '19px' }}>
            Go to shop
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
