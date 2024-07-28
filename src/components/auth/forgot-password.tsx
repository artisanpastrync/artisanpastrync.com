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
import { handleAuthRequest } from '@/lib/auth/client';
import { requestPasswordUpdate } from '@/lib/auth/server';
import { objectToFormData } from '@/lib/utils';

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
    const form = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: '' },
    });

    async function onSubmit(data: ForgotPasswordSchema) {
        const formData = objectToFormData(data);
        const result = await handleAuthRequest(formData, requestPasswordUpdate);
        console.log(result);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <h3 className='text-xl'>Forgot Password</h3>
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
                <Button type='submit'>Sign In</Button>
            </form>
        </Form>
    );
}
