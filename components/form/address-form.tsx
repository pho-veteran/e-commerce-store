"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Address } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import AddressSelector from "./address-selector";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

import { formSchema, AddressFormValues } from "./schemas/address-schema";

interface AddressFormProps {
    initialData: Address | undefined;
    loading: boolean;
    onSubmit: (data: AddressFormValues) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
    initialData,
    loading,
    onSubmit
}) => {
    const title = initialData ? "Edit Address" : "New Address";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<AddressFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? initialData : {
            name: "",
            phone: "",
            generalAddress: "",
            streetAddress: "",
            type: "HOME",
            isDefault: false,
        },
    });

    return (
        <div className="w-full">
            <h2 className="text-black font-bold text-xl my-4">{title}</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid sm:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={loading}
                                            placeholder="Full Name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <PhoneInput
                                            placeholder="Enter a phone number"
                                            defaultCountry="VN"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="generalAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City, District, Ward</FormLabel>
                                <FormControl>
                                    <AddressSelector
                                        loading={loading}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="streetAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Street Name, Building, House No.</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        disabled={loading}
                                        placeholder="Street Name, Building, House No."
                                        lang="vn"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address Type</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex space-x-2"
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="HOME" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Home
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="WORK" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Work
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                    {!initialData?.isDefault && (
                        <FormField
                            control={form.control}
                            name="isDefault"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 w-fit">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel>Set as default address</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AddressForm;
