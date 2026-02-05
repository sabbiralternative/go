import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";
import assets from "../../assets";

const Login = () => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    setDisabled(true);

    const loginData = {
      username: username,
      password: password,
    };

    const secret = "USER_SESSION_SECRET";
    const json = JSON.stringify(loginData);

    async function hmacSHA256(message, key) {
      const enc = new TextEncoder();
      const keyData = await crypto.subtle.importKey(
        "raw",
        enc.encode(key),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
      );
      const signature = await crypto.subtle.sign(
        "HMAC",
        keyData,
        enc.encode(message),
      );
      return btoa(String.fromCharCode(...new Uint8Array(signature)));
    }

    const hmac = await hmacSHA256(json, secret);

    fetch(API.login, {
      method: "POST",

      headers: {
        "content-type": "application/json",
        secret: hmac,
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) {
          setDisabled(false);
          if (data?.result?.changePassword) {
            navigate(`/change-password?token=${data?.result?.token}`);
          }
          if (data?.result?.changePassword === false) {
            const readOnly = data?.result?.readOnly;
            const adminToken = data?.result?.token;
            const adminName = data?.result?.loginname;
            const adminRole = data?.result?.role;
            const adminSite = data?.result?.site;
            dispatch(
              setUser({
                readOnly,
                adminToken,
                adminName,
                adminRole,
                adminSite,
              }),
            );
            localStorage.setItem("adminToken", adminToken);
            toast.success("Login Success");
            navigate("/");
          }
        } else {
          setDisabled(false);
          setErrorMessage(data?.error?.status?.[0]?.description);
        }
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [errorMessage]);
  return (
    <div className="login-body">
      <form onSubmit={handleSubmit(onSubmit)} className="login-container">
        {/* Logo */}
        <div className="login-logo">
          <img src={assets.logo} alt="Console" />
        </div>
        {/* Username */}
        <div className="form-group">
          <label>Username</label>
          <input
            {...register("username", {
              required: true,
            })}
            type="text"
            placeholder="Username"
          />
        </div>
        {/* Password */}
        <div className="form-group password-group">
          <label>Password</label>
          <input
            {...register("password", {
              required: true,
            })}
            type="password"
            placeholder="********"
          />
          <i className="fa-solid fa-eye" />
        </div>
        {/* Login Button */}
        <button className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
