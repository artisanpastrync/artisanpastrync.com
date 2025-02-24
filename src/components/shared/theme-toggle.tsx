'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button, ButtonProps } from '@/components/ui/button';

export type ThemeToggleProps = ButtonProps;

export function ThemeToggle({ ...props }: ThemeToggleProps) {
    const { setTheme, systemTheme } = useTheme();

    const toggleTheme = () =>
        setTheme((theme) => {
            if (theme !== 'system') return 'system';
            return systemTheme === 'dark' ? 'light' : 'dark';
        });

    return (
        <Button variant='default' size='icon' {...props} onClick={toggleTheme}>
            <Sun className='hidden dark:block' />
            <Moon className='block dark:hidden' />
            <span className='sr-only'>Toggle theme</span>
        </Button>
    );

    // return (
    //     <Popover>
    //         <PopoverTrigger asChild>
    //             <Button variant='default' size='icon' {...props}>
    //                 {theme === 'light' && <Sun className='h-[1.2rem] w-[1.2rem]' />}
    //                 {theme === 'dark' && <Moon className='h-[1.2rem] w-[1.2rem]' />}
    //                 {theme === 'system' && <SunMoon className='h-[1.2rem] w-[1.2rem]' />}
    //                 <span className='sr-only'>Toggle theme</span>
    //             </Button>
    //         </PopoverTrigger>
    //         <PopoverContent className='flex flex-col gap-2 p-2' align='center'>
    //             <Button
    //                 variant={theme === 'light' ? 'outline' : 'ghost'}
    //                 onClick={() => setTheme('light')}
    //                 className='gap-2'
    //             >
    //                 <Sun className='h-[1.2rem] w-[1.2rem]' />
    //                 Light
    //             </Button>
    //             <Button
    //                 variant={theme === 'dark' ? 'outline' : 'ghost'}
    //                 onClick={() => setTheme('dark')}
    //                 className='gap-2'
    //             >
    //                 <Moon className='h-[1.2rem] w-[1.2rem]' />
    //                 Dark
    //             </Button>
    //             <Button
    //                 variant={theme === 'system' ? 'outline' : 'ghost'}
    //                 onClick={() => setTheme('system')}
    //                 className='gap-2'
    //             >
    //                 <SunMoon className='h-[1.2rem] w-[1.2rem]' />
    //                 System
    //             </Button>
    //         </PopoverContent>
    //     </Popover>
    // );
}
