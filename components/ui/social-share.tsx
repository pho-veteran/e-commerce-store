"use client"
import { useEffect, useState } from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    TwitterShareButton,
    TwitterIcon,
} from "react-share"

interface SocialShareProps {
    mediaUrl: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
    mediaUrl,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const pathName = window.location.href;

    return (
        <div className="flex flex-col space-y-6 flex-grow-0">
            <FacebookShareButton url={pathName} windowWidth={680} windowHeight={630}>
                <FacebookIcon size={36} round={true} />
            </FacebookShareButton>
            <PinterestShareButton url={pathName} media={mediaUrl} windowWidth={680} windowHeight={630}>
                <PinterestIcon size={36} round={true} />
            </PinterestShareButton>
            <TwitterShareButton url={pathName} windowWidth={680} windowHeight={630}>
                <TwitterIcon size={36} round={true} />
            </TwitterShareButton>
        </div>
    );
}

export default SocialShare;