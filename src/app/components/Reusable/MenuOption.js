import Link from 'next/link';
export default function MenuOption({text}){
    return(
        <Link href="/" className="hover:text-green" >{text}</Link>
    )
}