import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    data: {
        label?: string;
        value?: string;
        className?: string;
        message?: string;
    } | undefined;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
    data
}) => {
    return (
        <Badge
            variant="outline"
            className={cn("font-bold border-none whitespace-nowrap", data?.className)}
        >{data?.label}</Badge>
    );
}

export default StatusBadge;