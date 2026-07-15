import LoginForm from "../components/Forms/LoginForm";
import { KalyankarLogo } from "../assets/images";

const LoginPage = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4" style={{ background: '#0a0a0a' }}>
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-10 flex flex-col items-center">
          <span className="rounded-2xl bg-white p-2 shadow-lg mb-6 inline-block">
            <img src={KalyankarLogo} alt="Kalyankar Batteries" className="h-20 w-20 rounded-xl object-contain" />
          </span>
          <h1 className="text-3xl font-bold text-white tracking-widest uppercase mb-2">
            Kalyankar <span className="text-red-600">Batteries</span>
          </h1>
          <p className="text-gray-400 text-sm">Sign in to access your dashboard</p>
        </div>

        {/* Authentication Card */}
        <div className="rounded-xl shadow-2xl p-8" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
          <LoginForm />
        </div>
        
        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Kalyankar Batteries. Authorized Access Only.</p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

