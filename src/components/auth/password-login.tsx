'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import { signInWithPassword } from '@/lib/auth/server';
import { objectToFormData } from '@/lib/utils';

export const passwordLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().trim().min(1, 'Password is required'),
});

export type PasswordLoginSchema = z.infer<typeof passwordLoginSchema>;

export interface PasswordLoginProps {}

export function PasswordLoginForm(_props: PasswordLoginProps) {
    const form = useForm<PasswordLoginSchema>({
        resolver: zodResolver(passwordLoginSchema),
        defaultValues: { email: '', password: '' },
    });

    async function onSubmit(values: PasswordLoginSchema) {
        const formData = objectToFormData(values);
        const { data, error } = await handleAuthRequest(formData, signInWithPassword);

        console.log(data, error);

        if (!error) return console.log('success!');

        form.setError('password', { message: error.message });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <h3 className='text-xl'>Sign in with Password</h3>
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
                <Button type='submit'>Sign In</Button>
            </form>
        </Form>
    );
}
