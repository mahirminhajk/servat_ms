import { RegisterForm } from "@/components/register-form";
import { ROUTES } from "@/constants/routes";
import { Store } from "lucide-react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to={ROUTES.PRIVACY_POLICY}
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Store className="size-4" />
          </div>
          SERVAT BUSINESS
        </Link>
        <RegisterForm />
      </div>
    </div>
  );
}

export default Register;
