import OAuthButton from "@/components/auth/OAuthButton";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
import { Link } from "react-router-dom";

export default function VerifyPage() {
  return (
    <>
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-center">
          Verify Your Email
        </h3>
        <p className="mt-2 text-foreground/80">
          To complete your registration, please check your inbox and click on
          the verification link {`we've`}{" "}
          sent to your email address. This helps us confirm your identity and
          keep your account secure.
        </p>
        <p className="mt-3 text-muted-foreground">
          {`Didn't`} receive the email? Check your spam or junk folder, or{"  "}
          <a
            href="#"
            className="text-primary ml-2 font-semibold hover:underline"
          >
            Click here to resend it
          </a>.
        </p>
      </div>
      <VerifyEmailForm />
      <div className="my-3 flex items-center justify-between gap-5">
        <div className="h-[1px] w-[50%] bg-border" />
        <div>OR</div>
        <div className="h-[1px] w-[50%] bg-border" />
      </div>
      <div className="flex flex-col gap-2">
        <OAuthButton type="google" />
        <OAuthButton type="github" />
      </div>

      <div className="mt-5 text-center text-muted-foreground">
        I already have an account
        <Link
          className="font-semibold cursor-pointer underline hover:text-foreground"
          to="/login"
        >
          {"  "}
          Log in
        </Link>
      </div>
    </>
  );
}
