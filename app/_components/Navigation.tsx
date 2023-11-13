import { usePathname } from 'next/navigation';
import { NavigationItem } from './NavigationItem';

export const Navigation = () => {
  const pathname = usePathname();

  const links = [
    {
      href: '/chat',
      label: 'Chat',
    },
    {
      href: '/image',
      label: 'Image',
    },
  ];
  return (
    <nav>
      {links.map((link) => (
        <NavigationItem
          key={link.href}
          href={link.href}
          label={link.label}
          isCurrentPage={pathname === link.href}
        />
      ))}
    </nav>
  );
};
