import Link from 'next/link';

export const CustomLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} style={{ color: 'inherit', textDecoration: 'none' }}>
      {children}
    </Link>
  );
};
