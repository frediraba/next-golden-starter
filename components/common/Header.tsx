import Link from 'next/link';
import Container from './Container';
import ThemeToggle from './ThemeToggle';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header() {
  return (
    <header className="border-b bg-background/50 backdrop-blur">
      <Container className="flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold">
            Next Golden Starter
          </Link>
          <nav className="hidden gap-3 sm:flex">
            <Link href="/en" className="text-sm hover:underline">
              Home
            </Link>
            <Link href="/en/db-demo" className="text-sm hover:underline">
              DB Demo
            </Link>
            <Link href="/ui-demo" className="text-sm hover:underline">
              UI Demo
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
