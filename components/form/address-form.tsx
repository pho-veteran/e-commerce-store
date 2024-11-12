"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

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
import { isValidPhoneNumber } from "react-phone-number-input";
import { PhoneInput } from "@/components/ui/phone-input";
import AddressSelector from "./address-selector";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import useAddressModal from "@/hooks/use-address-modal";

interface AddressFormProps {
    initialData: Address | undefined;
}

const formSchema = z.object({
    name: z.string().min(3),
    phone: z
        .string()
        .refine(isValidPhoneNumber, { message: "Invalid phone number" })
        .or(z.literal("")),
    generalAddress: z.string(),
    streetAddress: z.string(),
    type: z.enum(["HOME", "WORK"], {
        required_error: "You need to select a address type.",
    }),
    isDefault: z.boolean(),
});

type AddressFormValues = z.infer<typeof formSchema>;

const AddressForm: React.FC<AddressFormProps> = ({
    initialData,
}) => {
    const router = useRouter();
    const params = useParams();
    const addressModal = useAddressModal();

    const [loading, setLoading] = useState(false);

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

    const onSubmit = async (data: AddressFormValues) => {
        try {
            setLoading(true);

            if (!initialData) {
                await axios.post(`/api/addresses`, data);
            } else {
                await axios.patch(
                    `/api/addresses/${initialData.id}`,
                    data
                );
            }
            router.refresh();
            addressModal.onClose();
            
            console.log(data);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(
                `/api/${params.storeId}/categories/${params.addressId}`
            );
            router.refresh();
            router.push(`/${params.storeId}/categories`);
            toast.success("Address deleted successfully");
        } catch (error) {
            toast.error(
                "Make sure to delete all products associated with this address."
            );
        } finally {
            setLoading(false);
        }
    };

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
                                            defaultValue={field.value}
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
