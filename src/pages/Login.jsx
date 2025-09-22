import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // para redirección
import { supabase } from "../supabaseClient"; // tu cliente de supabase

const JSIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M11.5 9.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm-3 0c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S10.83 8 10 8s-1.5.67-1.5 1.5zm-3 0c0 .83.67 1.5 1.5 1.5S7 10.33 7 9.5 6.33 8 5.5 8 4 8.67 4 9.5zm3.94 4.06c-.49.49-1.28.49-1.77 0-.49-.49-.49-1.28 0-1.77.49-.49 1.28-.49 1.77 0 .49.49.49 1.28 0 1.77zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </svg>
);

const ReactIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm5 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM12 6c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const TailwindIcon = (props) => (
  <svg fill="none" viewBox="0 0 54 33" {...props}>
    <path
      fill="currentColor"
      d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45-4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
    />
  </svg>
);

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isLogin) {
      // Registro en tabla 'usuarios'
      if (password !== confirmPassword) {
        setErrorMsg("Las contraseñas no coinciden");
        return;
      }

      const { data, error } = await supabase
        .from("usuarios")
        .insert([{ nombre, email, password }]); // ⚠️ texto plano por ahora

      if (error) {
        setErrorMsg(error.message);
      } else {
        alert("Usuario registrado con éxito!");
        setIsLogin(true);
        setNombre("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      // Login simple verificando tabla
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error || !data) {
        setErrorMsg("Email o contraseña incorrecta");
      } else {
        navigate("/main");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0d111e] text-gray-300 font-sans">
      <div className="relative w-full max-w-sm mx-4">
        <div className="bg-black/20 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-8 space-x-4">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isLogin
                  ? "bg-blue-600/40 border border-blue-500 text-white"
                  : "text-gray-400"
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                !isLogin
                  ? "bg-blue-600/40 border border-blue-500 text-white"
                  : "text-gray-400"
              }`}
            >
              REGISTER
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {!isLogin && (
                <div>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
              )}
              <div>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type="password"
                  id="password"
                  className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <div className="relative flex items-center">
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full bg-black/30 border border-gray-700 rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            <div className="text-center mt-4">
              {isLogin && (
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Forgot Password?
                </a>
              )}
            </div>

            {errorMsg && <p className="text-red-500 mt-2 text-center">{errorMsg}</p>}

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-blue-700 transition-all"
            >
              {isLogin ? "Sign In" : "Register"}
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-8 opacity-40">
          <JSIcon className="w-5 h-5" />
          <ReactIcon className="w-5 h-5" />
          <TailwindIcon className="h-3" />
        </div>
      </div>
    </div>
  );
}

export default Login;
