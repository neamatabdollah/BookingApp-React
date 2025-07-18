import React from "react";
import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  // const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const savedUser = JSON.parse(localStorage.getItem("bookingUser"));

    if (!savedUser) {
      toast.error("No user registered yet!");
      return;
    }

    if (
      savedUser &&
      savedUser.email === data.email &&
      savedUser.password === data.password
    ) {
      // console.log("Login Success!");
      toast.success(`Welcome back, ${savedUser.name}! 👋`);
      navigate("/home");
    } else {
      // alert("Invalid credentials or not registered yet!");
      toast.error("No user registered yet!");
    }
  };
  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">
            Login
          </button>

          <p className="mt-3">
            Don't have an account?{" "}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
