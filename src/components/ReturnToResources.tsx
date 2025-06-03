import { Button } from '@mui/material';
import Link from 'next/link';

export const ReturnToResources = () => {
  return (
    <Button
      component={Link}
      href="/resources"
      className="rounded 
                  hover:opacity-90 mt-2 px-4 py-2 normal-case w-full"
      variant="outlined"
    >
      RETURN TO RESOURCES
    </Button>
  );
};
