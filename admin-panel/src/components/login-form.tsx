import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema, LoginFormValues } from "@/lib/validationSchema";
import { useLogin } from "@/api/features/authHook";
import { API_ROUTES } from "@/constants/apiRoutes";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setUser } from "@/app/features/user/userSlice";
import { setLogined } from "@/app/features/system/systemSlice";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutate: login, isPending } = useLogin();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (data: typeof API_ROUTES.LOGIN.data) => {
    login(data, {
      onSuccess: (data) => {
        toast({
          title: "Login successful",
          description: `Welcome back, ${data.data.name}`,
        });
        console.log(data);
        dispatch(setLogined(true));
        dispatch(
          setUser({
            isAdmin: false,
            name: data.data.name,
            phone: data.data.phone,
            profile: data.data?.profile || "",
          })
        );
        navigate(ROUTES.DASHBOARD, { replace: true });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    const modifiedData = {
      phone: `91${data.phone}`,
      password: data.password,
    };
    handleLogin(modifiedData);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your phone number</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91"
                    pattern="^[0-9]*"
                    inputMode="numeric"
                    {...register("phone")}
                    error={errors.phone?.message}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to={ROUTES.PRIVACY_POLICY}
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <>Logging in</> : "Login"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an business account?{" "}
                <Link
                  to={ROUTES.REGISTER}
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our{" "}
        <Link to={ROUTES.PRIVACY_POLICY}>Terms of Service</Link> and{" "}
        <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>.
      </div>
    </div>
  );
}

//TODO: create a privacy policy page
//TODO: add spinner to login button
