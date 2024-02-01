import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Registeration Successful !!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (errors: Error) => {
      showToast({ message: errors.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <h2 className="flex justify-center text-2xl font-semibold">
          Sign Up Here:
        </h2>
        <label className="font-semibold">
          First Name :
          <input
            type="text"
            className="border border-blue-400 w-full rounded p-1 font-normal"
            {...register("firstName", {
              required: "This field is required",
            })}
          />
          {errors.firstName && (
            <span className="text-red-400">{errors.firstName.message}</span>
          )}
        </label>
        <label className="font-semibold">
          Last Name :
          <input
            type="text"
            className="border border-blue-400 w-full rounded p-1 font-normal"
            {...register("lastName", {
              required: "This field is required",
            })}
          />
          {errors.lastName && (
            <span className="text-red-400">{errors.lastName.message}</span>
          )}
        </label>
        <label className="font-semibold">
          Email :
          <input
            type="email"
            className="border border-blue-400 w-full rounded p-1 font-normal"
            {...register("email", {
              required: "This field is required",
            })}
          />
          {errors.email && (
            <span className="text-red-400">{errors.email.message}</span>
          )}
        </label>
        <label className="font-semibold">
          Password :
          <input
            type="password"
            className="border border-blue-400 w-full rounded p-1 font-normal"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
        </label>
        <label className="font-semibold">
          Confirm Password :
          <input
            type="password"
            className="border border-blue-400 w-full rounded p-1 font-normal"
            {...register("confirmPassword", {
              validate: (val) => {
                if (!val) {
                  return "This field is required";
                }
                if (val.length < 6) {
                  return "Password should be atleast 6 characters long";
                }
                if (watch("password") != val) {
                  return "Confirm Password didnot match with password";
                }
                return true;
              },
            })}
          />
        </label>
        <span>
          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 border rounded-md hover:bg-blue-300"
          >
            Sign Up
          </button>
        </span>
        <div>
          <span className="text-sm font-serif">
            Or click here to sign in 👉{" "}
          </span>
          <Link
            to="/sign-in"
            className="bg-slate-400 px-4 py-2 border rounded-md hover:bg-slate-300 text-black ml-2"
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Register;
