import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import { FounderContent } from '@/types/cms';
import { assetUrl } from '@/lib/asset-url';

export default function OurFounder({ content }: { content?: FounderContent }) {
    return (
        <div className="w-full flex justify-center items-center pb-20 bg-background text-black flex-col">
            <div className="max-w-7xl flex items-start justify-start sm:items-center sm:justify-center sm:flex-row flex-col sm:p-0 p-4 lg:p-0 gap-4 sm:h-[500px]">
                <img className="rounded-md md:w-[750px] w-full h-full" src={assetUrl(content?.main_image) || "/images/founder.png"} alt="Founder" />
                <div className="flex flex-col space-y-4 md:h-full md:p-2.5">
                    <div className="flex flex-row items-center gap-2">
                        <span>{content?.label || "Our Founder"}</span>
                        <div className="w-[30%] max-w-48 h-[2.5px] bg-secondary rounded-md" />
                    </div>
                    <span className="text-6xl font-bold">{content?.title || "Our Founder, Our Foundation"}</span>
                    <span className="text-md">{content?.description || "Shahrier Baiya is the visionary founder of Mechanix Interior, a passionate entrepreneur who has transformed the interior design landscape with his innovative approach and unwavering commitment to excellence. With years of experience in the field, Shahrier brings a unique blend of creativity, technical expertise, and client-focused solutions to every project."}</span>
                    <div className="flex flex-col gap-1">
                        <img className="rounded-md md:w-[100px] w-full h-full min-h-16" src={assetUrl(content?.profile_image) || "/images/founder.png"} alt="Founder" />
                        <span className="font-bold">{content?.founder_name || "Shahrier"}</span>
                        <span>{content?.company_name || "Nex Group"}</span>
                        <Button className="w-max mt-4 px-8 py-6 text-base font-semibold rounded-full bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black transition-all duration-300 shadow-lg hover:shadow-xl" variant={"secondary"}>
                            {content?.cta_text || "About Us"}
                            <ArrowUp className="h-5 w-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
}
