import LoginForm from "../components/Forms/LoginForm";
import Heading from "../components/UI/Heading";

const styleSection = {
  backgroundImage:
    "linear-gradient(to right bottom, rgba(102, 179, 255, 0.8), rgba(191, 255, 0.8))",
};

const styleHeading = {
  fontSize: "1.5rem",
  fontWeight: 900,
  backgroundImage: "linear-gradient(to right, #ffffff, #ffffcc)",
  WebkitBackgroundClip: "text",
  color: "transparent",
  letterSpacing: "0.2rem",
  transition: "all 0.2s",
};

const LoginPage = () => {
  return (
    <section className="min-h-screen mx-0 md:mx-auto" style={styleSection}>
      <div className="h-full">
        <div className="g-6 flex  h-full items-center justify-center ">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 hidden md:block">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 py-4 flex-col justify-center items-center w-100">
            <div className="pt-5 w-full">
              <h1
                className="text-center animate-bounce uppercase"
                style={styleHeading}
              >
                Kalyankar Batteries
              </h1>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
