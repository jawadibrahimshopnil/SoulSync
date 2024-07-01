import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import useAxiosPublic from './../../Hooks/useAxiosPublic';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showPass, setShowPass] = useState(false);
    const axiosPublic = useAxiosPublic();

    const { setLoading, signInUser, setUser, signInWithGoogle } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = (data) => {
        const { email, password } = data;

        signInUser(email, password)
            .then((res) => {
                setUser(res.user);
                toast.success("Login Successful");
                navigate(location?.state?.from?.pathname ? location?.state?.from?.pathname : '/')
            })
            .catch(err => {
                setLoading(false)
                toast.error(`${err?.code}`);
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(res => {
                setUser(res.user);
                const user = {
                    name: res.user.displayName,
                    email: res.user.email
                }
                axiosPublic.post("/adduser", user)
                    .then(({ data }) => {
                            if (data.insertedId) {
                                toast.success("User Added to Database");
                                navigate("/");
                            }
                    })
                toast.success("Login Successful");
                navigate(location?.state?.from?.pathname ? location?.state?.from?.pathname : '/')
            })
            .catch(err => {
                setLoading(false)
                toast.error(err.code)
            })
    }

    return (
        <section className="grid place-items-center p-6 bg-[url('/loginbg.jpg')] bg-cover h-screen">
            <div className="absolute z-10 bg-black w-full h-screen bg-opacity-30"></div>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl  border  bg-white relative z-20">
                <h1 className="text-3xl font-bold text-center">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="space-y-6">
                    <div className="space-y-1">
                        <label htmlFor="email" className="block">Email</label>
                        <input {...register("email", { required: true })} type="email" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 border rounded-md border-gray-400" />
                    </div>
                    <div className="space-y-1 relative">
                        <label htmlFor="password" className="block">Password</label>
                        <input {...register("password", {
                            required: true
                        })}
                            aria-invalid={errors.password ? "true" : "false"}
                            type={showPass ? "text" : "password"} name="password" id="password" placeholder="Password" className="w-full px-4 py-3 border rounded-md border-gray-400" />
                        <span onClick={() => setShowPass(!showPass)} className="absolute right-2 top-[40%]">
                            {
                                showPass ? <FaEyeSlash className="w-5 h-5" />
                                    : <FaEye className="w-5 h-5" />
                            }
                        </span>

                        {errors.password && <p className="text-red-600">The password must have an uppercase, lowercase and atleast 6 character</p>}
                        <div className="flex justify-end text-sm ">
                            <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                        </div>
                    </div>
                    <button className="block w-full p-3 text-xl font-semibold text-center rounded-md text-gray-50 bg-rose-600">Login</button>
                </form>
                {/* social login */}
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    <p className="px-3 ">Login with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                </div>
                <div className="my-6 space-y-4">
                    <button onClick={handleGoogleSignIn} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md border-gray-600 hover:bg-gray-100">
                        <FcGoogle className="w-8 h-8" />
                        <p>Login with Google</p>
                    </button>
                </div>
                {/* redirect to register */}
                <p className="text-center sm:px-6">Don&apos;t have an account?
                    <Link to='/register' rel="noopener noreferrer" href="#" className="underline text-blue-600"> Register</Link>
                </p>
            </div>
        </section>
    );
};

export default Login;