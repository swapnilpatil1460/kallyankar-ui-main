import LoginForm from "../components/Forms/LoginForm";
import { KalyankarLogo } from "../assets/images";

const LoginPage = () => {
  return (
    <section className="min-h-screen w-full bg-theme-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-10 flex flex-col items-center">
          <span className="rounded-2xl bg-white p-2 shadow-lg mb-6 inline-block">
            <img src={KalyankarLogo} alt="Kalyankar Batteries" className="h-20 w-20 rounded-xl object-contain" />
          </span>
          <h1 className="text-3xl font-bold text-white tracking-widest uppercase mb-2">
            Kalyankar <span className="text-theme-c1">Batteries</span>
          </h1>
          <p className="text-gray-400 text-sm">Sign in to access your dashboard</p>
        </div>

        {/* Authentication Card */}
        <div className="bg-theme-c2 rounded-xl shadow-2xl border border-theme-c3 p-8">
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
