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
import { signInWithLink } from '@/lib/auth/server';
import { objectToFormData } from '@/lib/utils';

export const linkLoginSchema = z.object({
    email: z.string().email(),
});

export type LinkLoginSchema = z.infer<typeof linkLoginSchema>;

export interface LinkLoginProps {}

export function LinkLogin() {
    const form = useForm<LinkLoginSchema>({
        resolver: zodResolver(linkLoginSchema),
        defaultValues: { email: '' },
    });

    async function onSubmit(values: LinkLoginSchema) {
        const formData = objectToFormData(values);
        // const redirectPath = await signInWithLink(formData);
        const { data, error } = await handleAuthRequest(formData, signInWithLink);

        if (!error) return console.log('success! check email!');

        form.setError('root', { message: error.message });

        console.error(error);

        console.log(error.message);

        if (error.status === 429) {
            console.log('Sign in failed, please try again later.');
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <h3 className='text-xl'>Sign in with Magic Link</h3>
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
