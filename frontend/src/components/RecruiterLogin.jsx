import { Mail, Users, LockKeyhole, X, Upload, ArrowLeft } from "lucide-react";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
  const [image, setImage] = useState(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const { setShowRecruiterLogin } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state === "Register" && !isTextDataSubmitted) {
      setIsTextDataSubmitted(true);
    } else {
      console.log("Final submission", { name, email, password, image });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(file);
    } else {
      alert("Please upload a valid image file (JPG or PNG)");
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", resetEmail);
    // Implement password reset logic here
    setShowForgotPassword(false);
  };

  if (showForgotPassword) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="animate-fadeIn w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="font-urbanist text-2xl font-bold text-gray-900">
                Reset Password
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Enter your email to reset your password
              </p>
            </div>
            <button
              onClick={() => setShowForgotPassword(false)}
              className="rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="flex rounded-lg border border-gray-300 transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <div className="flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="w-full rounded-r-lg border-0 px-3 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                  placeholder="Enter your email"
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="animate-fadeIn w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-urbanist text-2xl font-bold text-gray-900">
              {state === "Register" && isTextDataSubmitted
                ? "Upload Company Logo"
                : `Recruiter ${state}`}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {state === "Register" && isTextDataSubmitted
                ? "Upload your company logo to complete registration"
                : state === "Login"
                  ? "Welcome back! Please login to your account."
                  : "Create a new recruiter account"}
            </p>
          </div>
          <button
            onClick={() => setShowRecruiterLogin(false)}
            className="rounded-lg p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {state === "Register" && isTextDataSubmitted ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center">
                {image ? (
                  <div className="relative h-32 w-32">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Company Logo"
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">
                      Upload Logo
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsTextDataSubmitted(false)}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {state === "Register" && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <div className="flex rounded-lg border border-gray-300 transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                    <div className="flex items-center pl-3">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      className="w-full rounded-r-lg border-0 px-3 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                      placeholder="Enter company name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Company Email
                </label>
                <div className="flex rounded-lg border border-gray-300 transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <div className="flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full rounded-r-lg border-0 px-3 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                    placeholder="Enter company email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="flex rounded-lg border border-gray-300 transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <div className="flex items-center pl-3">
                    <LockKeyhole className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="w-full rounded-r-lg border-0 px-3 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-0"
                    placeholder="Enter password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {state === "Login" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-4 pt-4">
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2"
            >
              {state === "Login"
                ? "Login"
                : isTextDataSubmitted
                  ? "Create Account"
                  : "Next"}
            </button>

            <p className="text-center text-sm text-gray-600">
              {state === "Login"
                ? "Don't have an account?"
                : "Already registered?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setState(state === "Login" ? "Register" : "Login");
                  setIsTextDataSubmitted(false);
                }}
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                {state === "Login" ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecruiterLogin;
