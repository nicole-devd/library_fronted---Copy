import React, { useState } from 'react'
import LibraryButton from './LibraryButton'

function LibraryLogin() {
  const [doYouHaveAnAccount, setDoYouHaveAnAccount] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleToggleAccount = () => {
    setDoYouHaveAnAccount(!doYouHaveAnAccount);
  };

  const handleLogin = () => {
    alert(`Username is: ${userName} and Password is: ${password}`);
  };

  return (
    <>
      {doYouHaveAnAccount ? (
        <div style={{ border: "3px solid blue", marginTop: "190px" }}>
          <label>UserName:</label>
          <input
            type="text"
            placeholder='Enter Your username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          /><br />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <LibraryButton buttonLabel="LOGIN" onClickButton={handleLogin} /><br />
          <label>New here? </label>
          <LibraryButton buttonLabel="Create Account" onClickButton={handleToggleAccount} />
        </div>
      ) : (
        <div style={{ border: "3px solid indigo", marginTop: "190px" }}>
          <label>Student ID:</label>
          <input type="text" placeholder='Enter Your Student ID' /><br />
          <label>Email:</label>
          <input type="email" /><br />
          <label>Password:</label>
          <input type="password" /><br />
          <label>Confirm Password:</label>
          <input type="password" /><br />
          <LibraryButton buttonLabel="REGISTER" /><br />
          <label>Already have an account? </label>
          <LibraryButton buttonLabel="Sign In" onClickButton={handleToggleAccount} />
        </div>
      )}
    </>
  )
}

export default LibraryLogin