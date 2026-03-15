import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KeyRound, Loader } from "lucide-react";

const ResetPasswordPage = () => {
const [formData, setFormData] = useState({
  password: "",
  confirmPassword:"", 
})
const [errors,setErrors]= useState({});
const[useSearchParams]= useSearchParams();
const navigate = useNavigate();

const dispatch= useDispatch();
const {isUpdatingPassword} = useSelector(state => state.auth);
const token = searchParams.get("token");

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
  const newErrors = {};

  // PASSWORD VALIDATION
  if (!formData.password) {
    newErrors.password = "Password is required";
  } else {
    const password = formData.password;

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least 1 uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Password must contain at least 1 lowercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least 1 number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = "Password must contain at least 1 special character";
    }
  }

  // CONFIRM PASSWORD VALIDATION
  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Confirm password is required";
  } else if (formData.confirmPassword !== formData.password) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

 const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try{
          await dispatch(resetPassword({token, password: formData.password, confirmPassword: formData.confirmPassword})).unwrap();
          navigate("/login");
    }catch(error){
        setErrors({
          general:error|| "Failed to reset password. Please try again.",
        });
    }
    
  };


  return <>
  
  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Reset Password</h1>
          <p className="text-slate-600 mt-2">enter your new password.</p>
        </div>

        {/* RESET PASSWORD FORM */}
        <div className="card p-6 bg-white shadow-md rounded-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General error */}
            {errors.general && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

           

            {/* NEW PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your new password"
                className={`input ${errors.password ? "input-error" : ""}`}
              />
              {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
            </div>

            {/* CONFIRM Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your Password"
                className={`input ${errors.confirmPassword ? "input-error" : ""}`}
              />
              {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
            </div>

          

            {/* Submit */}
            <button
              type="submit"
              disabled={isUpdatingPassword}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdatingPassword? (
                <div className="flex justify-center items-center">
                  <Loader className="animate-spin -m-1 mr-3 h-5 w-5" /> Resetting...
                </div>
              ) : (
                "Reset Password"
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
  
  
  </>;
};

export default ResetPasswordPage;
