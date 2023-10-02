import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login, googleSinIn } from '../redux/features/authSlice';
import { GoogleLogin } from '@react-oauth/google';

const initialState = { email: '', password: '' };

const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const googleSuccess = (resp) => {
    const userObject = jwt_decode(resp?.credential);
    const { email, name, sub } = userObject;
    const result = { email, name, googleId: sub, token: resp?.credential };
    dispatch(googleSinIn({ result, navigate, toast }));
  };

  const googleFailure = (error) => {
    toast.error(error);
  };

  return (
    <div
      style={{
        margin: 'auto',
        padding: '15px',
        maxWidth: '450px',
        alignContent: 'center',
        marginTop: '120px',
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-2x" />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation
            onSubmit={handleSubmit}
            //isValidated
            className="row g-3"
          >
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide valid email"
              invalid
            >
              <MDBInput
                label="Email"
                type="email"
                value={email}
                name="email"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your password"
              invalid
            >
              <MDBInput
                label="Password"
                type="password"
                value={password}
                name="password"
                onChange={onInputChange}
                required
              />
            </MDBValidationItem>
            <div className="col-12">
              <MDBBtn type="submit" style={{ width: '100%' }}>
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />

          {/* <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            //cookiePolicy="single_host_origin"
            // render={(renderProps) => (
            //   <MDBBtn
            //     style={{ width: '100%' }}
            //     color="danger"
            //     onClick={renderProps.onClick}
            //     disabled={renderProps.disabled}
            //   >
            //     <MDBIcon className="me-2" fab icon="google" /> Google Sign In
            //   </MDBBtn>
            // )}
          /> */}
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
