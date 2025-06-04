'use client';

import HomeIcon from '@mui/icons-material/Home';
import { Link, Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

const NavegationComponent = () => {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const breadcrumbItems = [
    <Link
      key="home"
      component={NextLink}
      href="/"
      underline="hover"
      color="inherit"
      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
    >
      <HomeIcon fontSize="small" />
    </Link>,
    ...segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const isLast = index === segments.length - 1;
      const isNonClickable = segment === 'edit' || segment === 'add';

      const label = decodeURIComponent(segment)
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      if (isLast || isNonClickable) {
        return (
          <Typography color="text.primary" key={href}>
            {label}
          </Typography>
        );
      }

      return (
        <Link key={href} component={NextLink} href={href} underline="hover" color="inherit">
          {label}
        </Link>
      );
    }),
  ];

  return (
    <MUIBreadcrumbs aria-label="breadcrumb" className="py-3">
      {breadcrumbItems}
    </MUIBreadcrumbs>
  );
};

export default NavegationComponent;
