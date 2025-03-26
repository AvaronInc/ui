
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('login');

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2">
          <img 
            src="/lovable-uploads/ede20021-c7ab-4b80-ae9a-9356f305c24c.png" 
            alt="Logo" 
            className="h-20 mx-auto"
          />
        </div>
        <h3 className="text-xl font-medium text-primary mb-4">Avaron Infrastructure Manager</h3>
        <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
        <CardDescription>
          Login or create an account to continue
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <CardContent className="pt-6">
          <TabsContent value="login">
            <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
          </TabsContent>
          
          <TabsContent value="signup">
            <SignupForm 
              isLoading={isLoading} 
              setIsLoading={setIsLoading} 
              onSuccess={() => setActiveTab('login')}
            />
          </TabsContent>
        </CardContent>
      </Tabs>
      <CardFooter className="flex flex-col space-y-2 border-t pt-4">
        <p className="text-sm text-muted-foreground text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
