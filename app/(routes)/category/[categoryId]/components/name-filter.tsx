"use client";
import SearchInput from "@/components/ui/search-input";
import { useSearchParams, useRouter } from "next/navigation";
import qs from "query-string";

const NameFilter: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get("name");

    const onSubmit = (name: string) => {
        const current = qs.parse(searchParams.toString());

        const query: { [key: string]: string | null } = {
            ...current,
            name: name
        };

        if (current[name] === name) {
            query[name] = null;
        }

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipNull: true }
        );

        router.push(url, { scroll: false });
    };

    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold">Name</h3>
            <hr className="my-4" />
            <div>
                <SearchInput 
                    defaultValue={selectedValue || ""}
                    onSubmit={onSubmit}
                    type="category"
                />
            </div>
        </div>
    );
};

export default NameFilter;
