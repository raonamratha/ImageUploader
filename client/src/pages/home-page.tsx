import { Helmet } from "react-helmet";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | The Art of Living</title>
        <meta name="description" content="The Art of Living teacher portal dashboard - manage your classes and resources." />
      </Helmet>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Welcome, {user?.username}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>You have successfully logged in to The Art of Living teacher portal.</p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your class schedule will appear here.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your teaching resources will appear here.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}