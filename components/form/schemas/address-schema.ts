import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const formSchema = z.object({
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

export type AddressFormValues = z.infer<typeof formSchema>;