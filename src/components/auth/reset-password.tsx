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
import { PasswordInput } from '@/components/ui/password-input';
import { handleAuthRequest } from '@/lib/auth/client';
import { updatePassword } from '@/lib/auth/server';
import { objectToFormData } from '@/lib/utils';

export const resetPasswordSchema = z
    .object({
        password: z.string().min(8),
        confirm: z.string(),
    })
    .refine(({ password, confirm }) => password === confirm, {
        path: ['confirm'],
        message: 'Passwords must match',
    });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
    const form = useForm<ResetPasswordSchema>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { password: '', confirm: '' },
    });

    async function onSubmit(data: ResetPasswordSchema) {
        const formData = objectToFormData(data);
        const result = await handleAuthRequest(formData, updatePassword);
        console.log(result);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <h3 className='text-xl'>Reset Password</h3>
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
                <Button type='submit'>Sign In</Button>
            </form>
        </Form>
    );
}
