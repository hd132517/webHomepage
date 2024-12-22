import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
            <Link href="/">Calendar</Link>
            {' | '}
            <Link href="/chat">Chat</Link>
        </nav>
    );
}