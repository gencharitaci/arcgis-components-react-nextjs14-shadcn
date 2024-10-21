import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo() {
    return (
        <div
            className={cn(
                "flex items-center justify-center"
            )}
        >
            <Image
                src="/esri_small_logo2.png"
                width={225} // Adjust logo size based on collapse state
                height={61}
                alt="Charlotte-Mecklenburg County Stowm Water Services"
            />
        </div>
    )
}



