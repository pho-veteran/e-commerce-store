import { Color, Size } from "@/types";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface VariantButtonsProps {
    data: (Size | Color)[];
    onClick: (id: string) => void;
    selectedValue: string | null;
    type: "size" | "color";
}

const VariantButtons: React.FC<VariantButtonsProps> = ({
    data,
    onClick,
    selectedValue,
    type
}) => {
    return (
        <div className="flex flex-wrap gap-2">
            {data.map((item) => (
                <div key={item.id} className="flex items-center">
                    <Button
                        className={cn(
                            "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300 flex gap-x-2 items-center hover:border-black hover:bg-neutral-100/90 shadow-none",
                            selectedValue === item.id &&
                            "border-black border-2"
                        )}
                        onClick={() => onClick(item.id)}
                    >
                        {type === "color" && (
                            <div
                                className="h-4 w-4 rounded-full border border-neutral-600"
                                style={{ backgroundColor: item.value }}
                            />
                        )}
                        <span>{item.name}</span>
                    </Button>
                </div>
            ))}
        </div>
    );
}

export default VariantButtons;