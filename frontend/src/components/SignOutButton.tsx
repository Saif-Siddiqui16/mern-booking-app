import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      showToast({ message: "Logout Successful !!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (errors: Error) => {
      showToast({ message: errors.message, type: "ERROR" });
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };

  return (
    <>
      <span className="bg-blue-600 p-2 text-white hover:bg-blue-500 border border-white rounded-lg">
        <button onClick={handleSubmit}>SignOut</button>
      </span>
    </>
  );
};

export default SignOutButton;
