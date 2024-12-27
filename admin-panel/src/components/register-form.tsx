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

import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  registerValidationSchema,
  RegisterFormValues,
} from "@/lib/validationSchema";
import { useRegister, useVerifyOTP } from "@/api/features/authHook";
import { API_ROUTES } from "@/constants/apiRoutes";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setUser } from "@/app/features/user/userSlice";
import { setLogined } from "@/app/features/system/systemSlice";
import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutate: providerRegister, isPending } = useRegister();
  const { mutate: verifyOTP, isPending: isOTPPending } = useVerifyOTP();

  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isOTP, setIsOTP] = useState(false);
  const [otpValue, setOtpValue] = useState("");

  const handleRegister = (data: typeof API_ROUTES.REGISTER.data) => {
    providerRegister(data, {
      onSuccess: (data) => {
        toast({
          title: "OTP Sent",
          description: data.message,
        });
        setIsOTP(true);
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: error.message,
        });
      },
    });
  };

  const handleVerifyOTP = (data: typeof API_ROUTES.VERIFY_OTP.data) => {
    verifyOTP(data, {
      onSuccess: (data) => {
        toast({
          title: "OTP Verified",
          description: data.message,
        });
        dispatch(
          setUser({
            id: data.data.id,
            name: data.data.name,
            phone: data.data.phone,
            isAdmin: false,
            profile: data.data?.profile || "",
          })
        );
        dispatch(setLogined(true));
        navigate(ROUTES.DASHBOARD);
      },
      onError: (error) => {
        console.log("error", error);
        toast({
          variant: "destructive",
          title: "OTP Verification Failed",
          description: error.message,
        });
      },
    });
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    const modifiedData = {
      name: data.name,
      phone: `91${data.phone}`,
      password: data.password,
    };
    handleRegister(modifiedData);
  };

  const onOTPSubmit = () => {
    console.log("OTP submitted", otpValue);
    handleVerifyOTP({ otp: otpValue });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {!isOTP ? "Create Business Account" : "Verify OTP"}
          </CardTitle>
          <CardDescription>
            {!isOTP
              ? "Start doing business with Servat today"
              : "Enter the OTP sent to your phone"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isOTP ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Input
                      id="name"
                      placeholder="Name"
                      {...register("name")}
                      error={errors.name?.message}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone"
                      pattern="^[0-9]*"
                      inputMode="numeric"
                      {...register("phone")}
                      error={errors.phone?.message}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="password"
                      placeholder="Password"
                      type="password"
                      {...register("password")}
                      error={errors.password?.message}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      type="password"
                      {...register("confirmPassword")}
                      error={errors.confirmPassword?.message}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Registering" : "Register"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an business account?{" "}
                  <Link
                    to={ROUTES.LOGIN}
                    className="underline underline-offset-4"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          ) : (
            <div className="">
              <div className="flex flex-col gap-4 justify-center items-center">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={(value) => setOtpValue(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <div className="text-center text-sm">
                  {otpValue === "" ? (
                    <>Enter your one-time password.</>
                  ) : (
                    <>You entered: {otpValue}</>
                  )}
                </div>
              </div>
              <div className="grid gap-2 mt-4">
                <Button onClick={onOTPSubmit} disabled={otpValue.length !== 6 || isOTPPending}>
                  Submit
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking register, you agree to our{" "}
        <Link to={ROUTES.PRIVACY_POLICY}>Terms of Service</Link> and{" "}
        <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>.
      </div>
    </div>
  );
}

//TODO: add spinner to register button
