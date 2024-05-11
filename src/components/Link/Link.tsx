import Link from 'next/link';

export function CustomLink({
  href,
  children,
  target,
}: {
  href: string;
  children: React.ReactNode;
  target?: boolean;
}) {
  return (
    <Link
      href={href}
      target={target ? '_blank' : undefined}
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      {children}
    </Link>
  );
}
