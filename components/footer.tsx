import { Mail, MapPinned, Phone } from "lucide-react";
import Container from "./ui/container";

const Footer = () => {
    return (
        <footer className="bg-black border-t mt-20">
            {/* <div className="mx-auto py-10">
                
            </div> */}
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 w-full py-12 px-4 sm:px-6 text-white">
                    <div className="space-y-4 col-span-3 text-sm">
                        <div className="flex gap-x-2 items-center">
                            <MapPinned size={18} className="flex-shrink-0" />
                            Address: 470 Đ. Trần Đại Nghĩa, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng 550000
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <Phone size={18} className="flex-shrink-0" />
                            <span>
                                Phone Number: <a href="tel:0935029390">0935029390</a>
                            </span>
                        </div>
                        <div className="flex gap-x-2 items-center">
                            <Mail size={18} className="flex-shrink-0" />
                            Email: vinhnt.23it@vku.udn.vn
                        </div>
                    </div>
                </div>
                <p className="text-center text-xs text-white pb-6 sm:pb-10">
                    &copy; 2024 E-commerce Store. All rights reserved.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
