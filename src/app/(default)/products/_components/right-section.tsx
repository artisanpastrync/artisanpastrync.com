import { cn } from '@/lib/utils';

export const RightSection = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <section className={cn('flex flex-col gap-4', className)}>{children}</section>;
};
