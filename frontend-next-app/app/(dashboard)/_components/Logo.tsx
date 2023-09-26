import Image from "next/image";
import Link from "next/link";
export const Logo = ({ color }: { color: "blue" | "green" | "black" | "white" }) => {
    return (
        <Link href="/">
            <Image 
                height={50}
                width={180}
                alt="logo"
                src={`/checkpeas-${color}.png`}
                />
        </Link>
    )
}