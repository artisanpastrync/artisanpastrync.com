'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/Button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { handleAuthRequest } from '@/lib/auth/client';
import { signUp } from '@/lib/auth/server';
import { objectToFormData } from '@/lib/utils';

export const signUpSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
        confirm: z.string().min(8, 'Password must be at least 8 characters long'),
    })
    .refine(({ password, confirm }) => password === confirm, {
        path: ['confirm'],
        message: 'Passwords must match',
    });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export interface SignUpFormProps {}

export function SignUpForm() {
    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: { email: '', password: '', confirm: '' },
    });

    async function onSubmit(values: SignUpSchema) {
        const formData = objectToFormData(values);
        const { data, error } = await handleAuthRequest(formData, signUp);
        console.log(data, error);
        if (!error) return console.log('success!');

        form.setError('confirm', { message: error.message });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <h3 className='text-xl'>Create an Account</h3>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input placeholder='me@example.com' {...field} type='email' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='confirm'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Sign up</Button>
            </form>
        </Form>
    );
}
