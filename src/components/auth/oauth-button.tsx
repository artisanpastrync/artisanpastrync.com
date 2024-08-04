import { Provider } from '@supabase/supabase-js';

import { Button, ButtonProps } from '@/components/Button';
import { cn } from '@/lib/utils';

export interface OAuthButtonProps extends Omit<ButtonProps, 'children'> {
    name: Provider;
    displayName: string;
    icon?: JSX.Element;
}

export function OAuthButton({ name, displayName, icon, className, ...rest }: OAuthButtonProps) {
    return (
        <Button
            {...rest}
            className={cn('w-full flex flex-row gap-2 justify-center items-center', className)}
        >
            {icon}
            {displayName}
        </Button>
    );
}
