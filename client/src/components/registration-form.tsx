import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";

const registerSchema = z.object({
  username: z.string().min(1, "Teacher code is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegistrationForm() {
  const { registerMutation } = useAuth();
  const { toast } = useToast();
  const [country, setCountry] = useState("india");
  const [language, setLanguage] = useState("english");

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterValues) => {
    try {
      await registerMutation.mutateAsync({ 
        username: data.username, 
        password: data.password 
      });
    } catch (error) {
      console.error("Registration error:", error);
      // Error already handled by the mutation's onError callback
    }
  };

  return (
    <div className="space-y-4">
      {/* Country and Language Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <CountrySelector value={country} onChange={setCountry} />
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>

      {/* Registration Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-[#5BBDC6] hover:bg-[#4a9ea6] uppercase font-semibold"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Registering..." : "REGISTER"}
          </Button>
        </form>
      </Form>
    </div>
  );
}