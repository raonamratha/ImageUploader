import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import CountrySelector from "./country-selector";
import LanguageSelector from "./language-selector";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  teacherCode: z.string().min(1, "Teacher code is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [, setLocation] = useLocation();
  const { loginMutation } = useAuth();
  const [country, setCountry] = useState("india");
  const [language, setLanguage] = useState("english");

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      teacherCode: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginValues) => {
    try {
      await loginMutation.mutateAsync({ 
        username: data.teacherCode, 
        password: data.password 
      });
    } catch (error) {
      console.error("Login error:", error);
      // Error is already handled by the mutation's onError callback
    }
  };

  const navigateToFAQ = () => {
    setLocation("/faq");
  };

  const handleForgotPassword = () => {
    setLocation("/forgot-password");
  };

  return (
    <div className="space-y-4">
      {/* Country and Language Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <CountrySelector value={country} onChange={setCountry} />
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>

      {/* Login Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="teacherCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teacher Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <div className="flex justify-end">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-xs text-[#5BBDC6]" 
                    onClick={handleForgotPassword}
                  >
                    Forget Password?
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-[#5BBDC6] hover:bg-[#4a9ea6] uppercase font-semibold"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "LOGIN"}
          </Button>
        </form>
      </Form>

      {/* FAQ Button */}
      <Button 
        type="button" 
        onClick={navigateToFAQ}
        className="w-full bg-[#FF6A35] hover:bg-[#e85e2f] uppercase font-semibold"
      >
        Frequently Asked Questions
      </Button>
    </div>
  );
}
