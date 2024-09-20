import React from "react";
import axios from "axios";
import config from "../config";

function LoginSignup() {
  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          // login
          e.preventDefault();

          const data = {
            email: e.target.email.value,
            password: e.target.password.value,
          };

          console.log(data);

          axios
            .post(`${config.backendUrl}/api/auth/login`, data)
            .then((res) => {
              console.log(res.data);

              localStorage.token = res.data.token;
              window.location = "/todo";
            })
            .catch((error) => {
              alert(error.response.data.error);
            });
        }}
      >
        <input name="email" type="email" required placeholder="Email" />
        <br />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <h1>Signup</h1>
      <form
        onSubmit={(e) => {
          // login
          e.preventDefault();

          const data = {
            email: e.target.email.value,
            password: e.target.password.value,
          };

          const confirmPassword = e.target.confirmPassword.value;

          if (data.password !== confirmPassword) {
            alert("passwords don't match");
            return;
          }

          console.log(data);

          axios
            .post(`${config.backendUrl}/api/auth/register`, data)
            .then((res) => {
              console.log(res.data);

              localStorage.token = res.data.token;
              window.location = "/todo";
            })
            .catch((error) => {
              alert(error.response.data.error);
            });
        }}
      >
        <input name="email" type="email" required placeholder="Email" />
        <br />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
        />
        <br />
        <input
          name="confirmPassword"
          type="password"
          required
          placeholder="Confirm Password"
        />
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default LoginSignup;
