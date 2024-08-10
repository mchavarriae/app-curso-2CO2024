import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, errors: LoginErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) navigate('/add-task');
    }, [isAuthenticated]);

    const onSubmit = handleSubmit((async values => {
        const res = await signin(values);
    }))

    return (<div className="flex items-center justify-center h-screen">
        <div className="bg-zinc-800 max-w-screen-md w-full p-10 rounded-md">
            <h1 className="text-2xl font-bold">Login</h1>
            {
                LoginErrors && LoginErrors.map((error, i) => (
                    <div className='bg-red-500 p-2 text-white' key={i}>{error}</div>
                ))
            }
            <form onSubmit={onSubmit}>
                <input type='email' {...register("email", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"
                    placeholder='Email'></input>
                {errors.email && (<p className='text-red-500'>Email is required</p>)}
                <input type='password' {...register("password", { required: true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"
                    placeholder='Password'></input>
                {errors.password && (<p className='text-red-500'>Pasword is required</p>)}
                <button type='submit'>Login</button>
            </form>
            <p className="flex gap-x-2 justify-between">
            Don't have an account? <Link to="/register" className="text-sky-500">Sign Up</Link>
            </p>
        </div>
    </div>)
}

export default LoginPage;