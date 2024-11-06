import { cn } from "@/lib/utils";
import { HeartOff } from "lucide-react";

interface NoResultsProps {
    message?: string;
    className?: string;
}

const NoResults: React.FC<NoResultsProps> = ({ message, className }) => {
    return (
        <div className={cn("flex flex-col items-center justify-center h-full w-full text-neutral-500", className)}>
            <HeartOff className="w-12 h-12 mb-4" />
            {message ? (
                <p>{message}</p>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
}

export default NoResults;