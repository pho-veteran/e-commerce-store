import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
    defaultValue: string;
    onSubmit: (searchValue: string) => void;
    type: "nav" | "category";
}

const SearchInput: React.FC<SearchInputProps> = ({ defaultValue, onSubmit, type }) => {
    const [searchValue, setSearchValue] = useState(defaultValue);

    if (type === "category") {
        return null;
    }

    return (
        <div className="relative w-full flex items-center rounded-lg border border-neutral-400 py-2">
            <div className="flex items-center w-full">
                <div className="px-4 py-1">
                    <Search size={18} className="text-neutral-400 " />
                </div>
                <input
                    placeholder="Type something to search..."
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value)
                    }}
                    className="focus-visible:outline-none flex-grow w-full"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSubmit(searchValue);
                        }
                    }}
                />
            </div>
            <button
                className="text-black px-4 py-1 border-l border-neutral-400 font-semibold"
                onClick={() => onSubmit(searchValue)}
            >Search</button>
        </div>
    );
}

export default SearchInput;