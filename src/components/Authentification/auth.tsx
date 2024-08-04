import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, ButtonProps } from "../Button";
// import { checkMenuStatusClick, checkMenuStatusTab } from "../Navbar";

export type NavButton = Pick<ButtonProps, 'href' | 'onClick' | 'variant' | 'className'> & {
    label: string;
};

const defaultButtons: NavButton[] = [
    // { label: 'Sign up', variant: 'inverted', href: '/login'},
    { label: 'Log in', href: '/login'},
];

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server'
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <>
    <div className='hidden lg:flex space-x-4'>
        <form  action={signOut}>
       <Button variant="inverted">Sign out</Button>
       </form>
    </div>
    <form className="lg:hidden" action={signOut}>
        <Button variant="inverted">Sign out</Button>
    </form>
    </>
  ) : (
    <>
    <div className='hidden lg:flex space-x-4'>
    {defaultButtons.map(({ label, ...buttonProps }) => (
        <Button {...buttonProps} key={label}>
            {label}
        </Button>
    ))}
    </div>
    <div className="lg:hidden">
        {defaultButtons.map(({ label, ...buttonProps }) => (
            <Button    
                {...buttonProps}
                key={label}
                // onClick={checkMenuStatusClick}
                // tabIndex={1}
                >
                    {label}
            </Button>
    ))}
    </div>
    </>
  )
}