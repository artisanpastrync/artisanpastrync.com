'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

const supabase = createClient()

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login/error");
    }

    return redirect("/test");
}

export async function signup(formData: FormData) {

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/test') //change back to '/' once working
}

export async function signOut(formData: FormData) {
  // const { error } = await supabase.auth.signOut();
 
  // if (error) {
  //   return redirect("/error");
  // }
  redirect('/login')
}


export async function handleSignInWithGoogle(formData: FormData) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
           queryParams: {
                access_type: 'offline',
                prompt: 'consent',
    },
    },
  })

  if (data.url) {
    redirect(data.url)
  }
}
