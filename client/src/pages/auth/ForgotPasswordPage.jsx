import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KeyRound, Loader } from "lucide-react";
import { forgotPassword } from "../../store/slices/authSlice";
const ForgotPasswordPage = () => {
  const { isRequestingForToken } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [isSubmitted, setisSubmitted] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return;
    }

    setError("");
    try {
      await dispatch(forgotPassword({ email })).unwrap();
      setisSubmitted(true);
    } catch (error) {
      setError(error || "Failed to send password reset link. please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow p-6 sm:p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
            Check your email
          </h2>

          <p className="text-sm text-slate-600 mb-3">
            We have sent you a password reset link to your email address.
          </p>

          <p className="text-sm text-slate-600 mb-6 break-all">
            If an account with <strong>{email}</strong> exists, you will receive a password reset email shortly.
          </p>

          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full py-2 rounded border border-gray-300 hover:bg-gray-50"
            >
              Back to login
            </Link>

            <button
              onClick={() => setisSubmitted(false)}
              className="w-full text-blue-600 text-sm hover:underline"
            >
              Send another email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Forgot Password?</h1>
          <p className="text-slate-600 mt-2">
            Enter your email address to receive a link to reset your password.
          </p>
        </div>

        <div className="card p-6 bg-white shadow-md rounded-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Enter your email"
                className={`input ${error ? "input-error" : ""}`}
                disabled={isRequestingForToken}
              />
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isRequestingForToken}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRequestingForToken ? (
                <div className="flex justify-center items-center">
                  <Loader className="animate-spin -m-1 mr-3 h-5 w-5" /> Sending...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
