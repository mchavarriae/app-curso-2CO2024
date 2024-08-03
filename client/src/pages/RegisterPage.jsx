import React from 'react'
import { useForm } from "react-hook-form";//va a manejar el estado y el submit action
import { useAuth } from "./context/AuthContext";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const {signup} = useAuth(); 
  const onSubmit = handleSubmit(( async values => {
    signup(values);
  }));
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input type='text' {...register("username", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"
          placeholder='Username'
        ></input>
        <input type='email' {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"
          placeholder='Email'></input>
        <input type='password' {...register("password", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md m-2"
          placeholder='Password'></input>
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
