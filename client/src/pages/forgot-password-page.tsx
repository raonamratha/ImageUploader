import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const resetPasswordSchema = z.object({
  teacherCode: z.string().min(1, "Teacher code is required"),
  email: z.string().email("Please enter a valid email address"),
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ForgotPasswordPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      teacherCode: "",
      email: "",
    },
  });

  async function onSubmit(data: ResetPasswordValues) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/reset-password", data);
      toast({
        title: "Reset email sent",
        description: "Check your email for password reset instructions.",
      });
      setTimeout(() => setLocation("/login"), 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send reset email",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Reset Password | The Art of Living</title>
        <meta name="description" content="Reset your password for The Art of Living teacher portal." />
      </Helmet>
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="60" viewBox="0 0 550 200" className="mb-2">
              <circle cx="275" cy="80" r="50" fill="#FDB913" />
              <path d="M275,130 C249,130 228,109 228,83 C228,57 249,36 275,36 C301,36 322,57 322,83 C322,109 301,130 275,130 Z M275,32 C246,32 224,54 224,83 C224,112 246,134 275,134 C304,134 326,112 326,83 C326,54 304,32 275,32 Z" fill="#FFFFFF" />
              <path d="M275,25 C304,25 328,49 328,78 C328,107 304,131 275,131 C246,131 222,107 222,78 C222,49 246,25 275,25 Z M275,21 C243,21 218,46 218,78 C218,110 243,135 275,135 C307,135 332,110 332,78 C332,46 307,21 275,21 Z" fill="#000000" />
              <path d="M220,83 L330,83" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M275,28 L275,138" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M242,50 L308,116" stroke="#FFFFFF" strokeWidth="2" />
              <path d="M308,50 L242,116" stroke="#FFFFFF" strokeWidth="2" />
              <text x="275" y="170" fontFamily="Arial" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#000">THE ART OF LIVING</text>
            </svg>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                Enter your teacher code and email to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-[#5BBDC6] hover:bg-[#4a9ea6]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant="link"
                onClick={() => setLocation("/login")}
              >
                Back to Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
