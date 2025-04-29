import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Append domain if the user only entered a username
      const fullEmail = email.includes("@") ? email : `${email}@example.com`;

      if (isSignUp) {
        // Create new user
        await createUserWithEmailAndPassword(auth, fullEmail, password);
        // Store account name in localStorage for compatibility with existing code
        localStorage.setItem("account", email);
        navigate("/choice-game");
      } else {
        // Sign in existing user
        await signInWithEmailAndPassword(auth, fullEmail, password);
        // Store account name in localStorage for compatibility with existing code
        localStorage.setItem("account", email);
        navigate("/choice-game");
      }
    } catch (err) {
      // Handle authentication errors
      if (err instanceof Error) {
        setError(err.message || "登錄失敗，請檢查您的憑據");
        console.error("Authentication error:", err);
      } else {
        setError("登錄過程中發生錯誤");
        console.error("Unknown error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isSignUp ? "創建新帳戶" : "登錄到你的帳戶"}
          </h2>
        </div>
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                電子郵件或用戶名
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="電子郵件或用戶名"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                密碼
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? "處理中..." : isSignUp ? "註冊" : "登錄"}
            </button>
            
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-indigo-600 hover:text-indigo-500"
                onClick={() => setIsSignUp(!isSignUp)}
                disabled={isLoading}
              >
                {isSignUp ? "已有帳戶？登錄" : "沒有帳戶？註冊"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
