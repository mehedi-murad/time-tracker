import React, { useContext } from 'react';
import loginImg from '../../../assets/login/login.png'
import './Login.css'
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const { signInUser, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignin = () =>{
        googleSignIn()
        .then(result => {
            console.log(result.user)
            const userInfo = {
              name: result.user?.displayName,
              email: result.user?.email
            }
            fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify(userInfo)
            })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              navigate('/')
            })
  
        })
    }
    const handleLogin = e =>{
        e.preventDefault();

        const form = e.target;

        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        signInUser(email, password)
        .then((result) => {
            const user = result.user;
            console.log(user);
            navigate(location?.state ? location?.state : "/");
            Swal.fire({
            title: "Logged in!",
            text: "Successfully logged in.",
            });
            navigate(from, { replace: true });
        })
        .catch((error) => {
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You have put wrong credentials!",
            });
        });
    }
    return (
        <div className='loginBg min-h-screen flex justify-evenly items-center gap-6'>
            <div>
                <img className='w-[650px]' src={loginImg} alt="" />
            </div>
            <div className='glass px-10 py-20'>
                <h2 className='text-center font-bold text-3xl mb-10'>Login</h2>
            <form onSubmit={handleLogin} className='space-y-5'>
                <input type="email" name="email" placeholder="Your Email" className="input input-bordered input-warning  w-full" required />
                <input type="password" name="password" placeholder="Password" className="input input-bordered input-warning  w-full" required />
                <input
                className="bg-[#F92659] hover:bg-[#FE7800] px-4 py-2 text-white font-semibold rounded-lg mt-10 btn-block"
                type="submit"
                value="login"
                />
                </form>
                <p className='text-gray-400 text-center'>New Here? Please 
                    <Link to="/signup">
                        <span className='text-bold text-xl ml-4 underline'>Signup</span>
                    </Link>
                </p>
                <div className='divider divider-secondary text-white'>OR</div>
                <div onClick={handleGoogleSignin} className='btn btn-outline text-white flex'>
                  <FaGoogle></FaGoogle> <h2>Signin by Google</h2>
                </div>
            </div>
        </div>
    );
};

export default Login;