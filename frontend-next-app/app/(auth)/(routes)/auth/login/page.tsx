"use client"
import { Logo } from '@/app/(dashboard)/_components/Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { LogIn } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
export default function LoginPage() {
  const formSchema = z.object({
    email: z.string().min(1, {
      message: "Email is required",
    }),
    password: z.string().min(8, {
      message: "Password must be longer than 8",
    }),
  })
  type FormSchema = z.infer<typeof formSchema>

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: FormSchema) => {
  }
  return (
    <div className="items-center justify-center h-screen grid grid-cols-2">
      <div className="p-6 w-48 md:w-96 h-96 md:h-[500px] bg-slate-200">
        <Logo color='blue' />
        <div className='flex flex-col justify-center mt-16 md:mt-28 gap-2 md:gap-4'>
          <p className='text-xl md:text-2xl font-semibold text-center'>Welcome back</p>
          <p className='text-xs md:text-base text-center'>You are just one step away to your feed!</p>
          <div className='flex flex-row justify-center text-xs md:text-sm'>
            <p className='py-2 px-1'>Don&apos;t have an account yet?</p>
            <Link href="/auth/register">
              <Button variant="link" size="sm" className='text-blue-500 p-0'>Register</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-2 md:p-14 w-48 md:w-96 h-96 md:h-[500px] bg-white">
        <div className='flex flex-row gap-2'>
          <LogIn className='text-blue-800 self-center' />
          <h1 className='text-2xl font-semibold text-blue-800'>Login</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 mt-4 p-6 md:pt-12'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) =>
                <FormItem>
                  <label className='text-sm' htmlFor='email'>Email</label>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder='e.g. john@doe.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) =>
                <FormItem>
                  <label className='text-sm' htmlFor='password'>Password</label>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={isSubmitting}
                      placeholder='Password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }
            />
            <div className='flex items-center justify-center w-full gap-x-2'>
              <Button
                className='w-full'
                disabled={!isValid || isSubmitting}
                type='submit'
                variant="blue"
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}