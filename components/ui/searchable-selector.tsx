import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";

interface MultiSelectProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    options: string[];
    onValueChange: (value: string) => void;
    defaultValue?: string;
    placeholder?: string;
    asChild?: boolean;
    className?: string;
    value?: string;
}

const SearchableSelector = forwardRef<
    HTMLButtonElement,
    MultiSelectProps
>(
    ({
        options,
        onValueChange,
        defaultValue,
        placeholder,
        asChild,
        className,
        value,
        ...props
    }, ref) => {
        const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

        const handleTogglePopover = () => {
            setIsPopoverOpen(!isPopoverOpen);
        };

        return (
            <Popover
                open={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
                modal={false}
            >
                <FormControl>
                    <PopoverTrigger asChild>
                        <Button
                            ref={ref}
                            {...props}
                            className={cn(
                                "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit",
                                className
                            )}
                            onClick={handleTogglePopover}
                        >
                            <div className="flex items-center justify-between w-full mx-auto">
                                <span className="text-sm mx-3 text-black">
                                    {!value ? placeholder : value}
                                </span>
                                <ChevronDown className="h-4 cursor-pointer mx-2 text-black" />
                            </div>
                        </Button>
                    </PopoverTrigger>
                </FormControl>
                <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    onEscapeKeyDown={() => setIsPopoverOpen(false)}
                >
                    <Command>
                        <CommandInput
                            placeholder="Search..."
                        />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            {options.map((option) => (
                                <CommandItem
                                    key={option}
                                    onSelect={() => {
                                        onValueChange(option);
                                        setIsPopoverOpen(false);
                                    }}
                                >
                                    {option}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }
);


export default SearchableSelector;