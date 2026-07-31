import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";
import App from "./App";

export default function AuthGate() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">
        Loading...
      </div>
    );
  }

  return user ? <App /> : <Login />;
}