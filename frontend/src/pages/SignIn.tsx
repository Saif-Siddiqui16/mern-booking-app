import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Login Successfulll !!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
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
        <h2 className="flex justify-center text-2xl font-semibold">Sign In</h2>
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
        <span>
          <button
            type="submit"
            className="bg-blue-400 text-white px-4 py-2 border rounded-md hover:bg-blue-300"
          >
            Sign In
          </button>
        </span>
        <div>
          <span className="text-sm font-serif">
            Or click here to sign up 👉{" "}
          </span>
          <Link
            to="/register"
            className="bg-slate-400 px-4 py-2 border rounded-md hover:bg-slate-300 text-black ml-2"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
