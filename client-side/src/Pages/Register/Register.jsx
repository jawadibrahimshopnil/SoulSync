import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { AuthContext } from './../../Provider/AuthProvider';
import useAxiosPublic from './../../Hooks/useAxiosPublic';
import { toast } from "react-toastify";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [showPass, setShowPass] = useState(false);

    const { createUser, setUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const { name, photoUrl, email, password } = data;

        const user = { name, email };
        axiosPublic.post("/adduser", user)
            .then(({ data }) => {
                if (data.isUserExists) {
                    toast.error("Email Already Exists. Please Login");
                    navigate("/login")
                } else {
                    createUser(email, password)
                        .then(res => {
                            updateProfile(res.user, {
                                displayName: name,
                                photoURL: photoUrl,
                            })

                            setUser(res.user);
                            toast.success("Register Successful");
                            navigate("/")
                        })
                    if(data.insertedId){
                        toast.success("User Added to Database")
                    }
                }
            })

    }

    return (
        <section className="grid place-items-center bg-[url('/loginbg.jpg')] bg-cover h-screen p-6">
            <div className="absolute z-10 bg-black w-full h-screen bg-opacity-30"></div>
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-base-200 border bg-white relative z-20">
                <h1 className="text-3xl font-bold text-center">Register</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate="" className="space-y-6">
                    <div className="space-y-1">
                        <label htmlFor="name" className="block ">Name <span className="text-red-500">*</span></label>
                        <input {...register("name", { required: true })} type="text" name="name" id="name" placeholder="Name" className="w-full px-4 py-3 border rounded-md border-gray-400" />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="photoUrl" className="block ">Photo URL <span className="text-red-500">*</span></label>
                        <input {...register("photoUrl", { required: true })} type="text" name="photoUrl" id="photoUrl" placeholder="Photo URL" className="w-full px-4 py-3 border rounded-md border-gray-400" />
                    </div>
                    <div className="space-y-1">
                        <label htmlFor="email" className="block ">Email <span className="text-red-500">*</span></label>
                        <input {...register("email", { required: true })} type="email" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 border rounded-md border-gray-400" />
                    </div>
                    <div className="space-y-1 relative">
                        <label htmlFor="password" className="block ">Password <span className="text-red-500">*</span></label>
                        <input {...register("password", {
                            required: true,
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}\\[\]:;<>,.?/~|-]).{6,}$/
                            }
                        })}
                            aria-invalid={errors.password ? "true" : "false"}
                            type={showPass ? "text" : "password"} name="password" id="password" placeholder="Password" className="w-full px-4 py-3 border rounded-md border-gray-400" />
                        <span onClick={() => setShowPass(!showPass)} className="absolute right-2 top-10">
                            {
                                showPass ? <FaEyeSlash className="w-5 h-5" />
                                    : <FaEye className="w-5 h-5" />
                            }
                        </span>
                        <div className="flex justify-end text-sm ">
                            <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                        </div>

                        {errors.password &&
                            <div className="text-red-600">The password must have
                                <ul className="list-disc pl-5">
                                    <li>a capital letter</li>
                                    <li>a small letter</li>
                                    <li>a special character</li>
                                    <li>atleast 6 character</li>
                                </ul>
                            </div>}
                    </div>
                    <button className="block w-full p-3 text-center text-xl font-semibold rounded-md text-gray-50 bg-rose-500">Register</button>
                </form>

                <p className=" text-center sm:px-6 ">Already have an account?
                    <Link to='/login' rel="noopener noreferrer" href="#" className="underline text-blue-600"> Login</Link>
                </p>
            </div>
        </section>
    );
};

export default Register;