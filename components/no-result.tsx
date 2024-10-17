import { HeartOff } from "lucide-react";

const NoResults = () => {
    return ( 
        <div className="flex flex-col items-center justify-center h-full w-full text-neutral-500">
            <HeartOff className="w-12 h-12 mb-4" />
            No results found.
        </div>
     );
}
 
export default NoResults;