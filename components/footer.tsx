import { Award, Headset, LockKeyhole, Mail, MapPinned, Phone, Truck } from "lucide-react";
import Container from "./ui/container";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-black border-t">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full py-12 px-6 sm:px-8 text-white gap-6">
                    <div className="space-y-4 text-sm">
                        <div className="font-bold">
                            Contact
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <MapPinned size={18} className="flex-shrink-0" />
                            Address: 470 Đ. Trần Đại Nghĩa, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng 550000
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <Phone size={18} className="flex-shrink-0" />
                            <span className="hover:underline">
                                Phone Number: <a href="tel:0935029390">0935029390</a>
                            </span>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <Mail size={18} className="flex-shrink-0" />
                            Email: vinhnt.23it@vku.udn.vn
                        </div>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="font-bold">
                            Policies
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <Truck size={18} className="flex-shrink-0" />
                            Nationwide Shipping
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <Award size={18} className="flex-shrink-0" />
                            Quality Assurance
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <LockKeyhole size={18} className="flex-shrink-0" />
                            Secure Payment Methods
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <Headset size={18} className="flex-shrink-0" />
                            24/7 Customer Support
                        </div>
                    </div>
                </div>
                <div className="flex justify-center h-8 relative gap-x-6 mb-6">
                    <Image
                        src="/payment-method-imgs/ghtk.png"
                        alt="Giao Hàng Tiết Kiệm"
                        width={200}
                        height={50}
                        className="h-auto w-auto max-h-8"
                    />
                    <Image
                        src="/payment-method-imgs/vnpay-full.png"
                        alt="Giao Hàng Tiết Kiệm"
                        width={180}
                        height={50}
                        className="h-auto w-auto max-h-8"
                    />
                </div>
                <p className="text-center text-xs text-white pb-6 sm:pb-10">
                    &copy; 2024 E-commerce Store. All rights reserved.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
