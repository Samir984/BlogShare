import { useState } from "react";
import Auth from "./../../services/auth";
import { v4 as uuidv4 } from "uuid";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = function (e) {
    e.preventDefault();
    if (!username || !email || !password) return;
    console.log("e");
    Auth.createUser(uuidv4(), email, password).then(
      function (response) {
        // Success
        console.log(response);
      },
      function (error) {
        // Failure
        console.log(error);
      }
    );
  };
  return (
    <div className="flex flex-col gap-2 w-80 self-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full p-1"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-1 mt-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-1 mt-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-blue-700 text-white font-semibold hover:bg-blue-800 mt-6 rounded w-full"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
