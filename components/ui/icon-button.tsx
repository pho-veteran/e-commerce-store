import { cn } from "@/lib/utils";
import { forwardRef, MouseEventHandler } from "react";

interface IconButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    icon: React.ReactElement;
    className?: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ onClick, icon, className }, ref) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
                className
            )}
            ref={ref}
        >
            {icon}
        </button>
    );
});

export default IconButton;
