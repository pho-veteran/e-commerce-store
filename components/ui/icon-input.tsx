import { useState } from "react";
import { Input } from "@/components/ui/input";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

const IconInput: React.FC<IconInputProps> = ({ icon, placeholder, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`flex items-center border-2 border-neutral-200 h-10 rounded-md shadow-sm ${isFocused ? 'border-black' : ''}`}>
      <Input
        {...props}
        placeholder={placeholder}
        className="border-none shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="border-l border-neutral-200 px-4 py-1">
        {icon}
      </div>
    </div>
  );
}

export default IconInput;