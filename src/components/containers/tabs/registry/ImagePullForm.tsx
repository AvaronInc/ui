
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Download } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Registry } from '@/types/containers';

interface ImagePullFormProps {
  registries: Registry[];
}

const ImagePullForm: React.FC<ImagePullFormProps> = ({ registries }) => {
  const imagePullForm = useForm();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Pull</CardTitle>
        <CardDescription>
          Pull container images from registries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...imagePullForm}>
          <form onSubmit={imagePullForm.handleSubmit((data) => console.log(data))} className="space-y-4">
            <FormField
              control={imagePullForm.control}
              name="registry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registry</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select registry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {registries?.map((registry, i) => (
                        <SelectItem key={i} value={registry.id}>
                          {registry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={imagePullForm.control}
              name="imageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. nginx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={imagePullForm.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. latest" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="pt-2">
              <Button type="submit" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Pull Image
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ImagePullForm;
