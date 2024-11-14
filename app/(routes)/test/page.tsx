import AddressForm from "@/components/form/address-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TestPage = () => {
    return (
        <div>
            <AddressForm
                initialData={undefined}
            />
        </div>
    );
}

export default TestPage;