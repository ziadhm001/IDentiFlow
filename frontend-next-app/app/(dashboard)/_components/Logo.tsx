import Image from "next/image";
export const Logo = ({ color }: { color: "blue" | "green" | "black" | "white" }) => {
    return (
        <Image 
            height={50}
            width={250}
            alt="logo"
            src={`/checkpeas-${color}.png`}
        />
    )
}