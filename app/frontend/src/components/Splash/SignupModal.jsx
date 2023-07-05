import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SignupModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(sessionActions.removeSessionErrors());
  };

  const errors = useSelector(state => state.errors);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("demo@user.io");
  const [firstName, setFirstName] = useState("Demo");
  const [lastName, setLastName] = useState("User");
  const [password, setPassword] = useState("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
  };

  return (
    <div>
      <Button onClick={handleOpen}>Signup</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit}>
      <ul>
        { errors ? errors.map(error => <li key={error}>{error}</li>) : null }
      </ul>
      <label>
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
        </Box>
      </Modal>
    </div>
  );
}

// function SignupFormPage() {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
//   const [email, setEmail] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === confirmPassword) {
//       setErrors([]);
//       return dispatch(sessionActions.signup({ email, username, password }))
//         .catch(async (res) => {
//         let data;
//         try {
//           // .clone() essentially allows you to read the response body twice
//           data = await res.clone().json();
//         } catch {
//           data = await res.text(); // Will hit this case if the server is down
//         }
//         if (data?.errors) setErrors(data.errors);
//         else if (data) setErrors([data]);
//         else setErrors([res.statusText]);
//       });
//     }
//     return setErrors(['Confirm Password field must be the same as the Password field']);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <ul>
//         {errors.map(error => <li key={error}>{error}</li>)}
//       </ul>
//       <label>
//         First Name
//         <input
//           type="text"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Last Name
//         <input
//           type="text"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Email
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Password
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Confirm Password
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//       </label>
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// }

// export default SignupFormPage;