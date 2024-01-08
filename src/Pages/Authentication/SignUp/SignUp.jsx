import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../../assets/login/login.png";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const SignUp = () => {
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //for google signin
  const handleGoogleSignin = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      navigate("/");
    });
  };

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      updateUser(data.name, data.photoURL)
        .then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            avatar: data.photoURL,
          };

          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/login");
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div className="loginBg min-h-screen flex justify-evenly items-center gap-6">
      <div>
        <img className="w-[650px]" src={loginImg} alt="" />
      </div>
      <div className="glass px-10 py-20">
        <h2 className="text-center font-bold text-3xl mb-10">Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-[450px]">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              {...register("name", { required: true })}
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-red-500 mt-2">Name is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Photo Url</span>
            </label>
            <input
              type="text"
              placeholder="Photo URL"
              name="photo"
              {...register("photoURL", { required: true })}
              className="input input-bordered"
            />
            {errors.photoURL && (
              <span className="text-red-500 mt-2">Photo url is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              placeholder="email (example@gmail.com)"
              name="email"
              {...register("email", { required: true })}
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-red-500 mt-2">Email is required</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="password (example - 123456Aa@)"
              name="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              className="input input-bordered"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500 mt-2">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500 mt-2">
                Password must be 6 characters
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-500 mt-2">
                Password not exceeded 20 characters
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500 mt-2">
                Password must have an uppecase a lowercase a special character
                and numbers
              </span>
            )}
          </div>

          <div className="form-control">
            <input
              className="bg-[#F92659] px-4 py-2 text-white font-semibold rounded-lg mt-10 btn-block"
              type="submit"
              value="Signup"
            />
          </div>
        </form>
        <p className="text-gray-400 text-center">
          Already Have an Account? Please
          <Link to="/login">
            <span className="text-bold text-xl ml-4 underline">Login</span>
          </Link>
        </p>
        <div className="divider divider-secondary text-white">OR</div>
        <div onClick={handleGoogleSignin} className="btn btn-outline text-white flex">
          <FaGoogle></FaGoogle> <h2>Signin by Google</h2>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
