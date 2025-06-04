import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import StorageIcon from '@mui/icons-material/Storage';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';

export default function ResourcesSection() {
  return (
    <Box className="max-w-4xl mx-auto mt-12 px-4">
      <Typography variant="h5" className="flex items-center gap-2 mb-2">
        <StorageIcon fontSize="medium" /> Resources Section
      </Typography>
      <Divider className="mb-4" />
      <Stack spacing={2}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              You can manage your learning resources with the following routes:
            </Typography>

            <Box ml={2}>
              <List dense>
                <ListItem className="py-0">
                  <ListItemText
                    primary={
                      <>
                        <code>/resources</code> — List of all saved resources
                      </>
                    }
                  />
                </ListItem>
                <ListItem className="py-0">
                  <ListItemText
                    primary={
                      <>
                        <code>/resources/add</code> — Create a new resource
                      </>
                    }
                  />
                </ListItem>
                <ListItem className="py-0">
                  <ListItemText
                    primary={
                      <>
                        <code>/resources/{'{slug}'}</code> — View a resource detail
                      </>
                    }
                  />
                </ListItem>
                <ListItem className="py-0">
                  <ListItemText
                    primary={
                      <>
                        <code>/resources/{'{slug}'}/edit</code> — Edit a resource
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Box>
            <Button
              component={Link}
              href="/resources"
              variant="contained"
              startIcon={<LibraryBooksIcon />}
              className="bg-primary hover:brightness-110 transition-all duration-200 shadow-lg hover:shadow-xl text-white font-semibold text-lg px-6 py-3 rounded-xl normal-case inline-flex items-center"
            >
              Explore Resources
            </Button>
          </CardContent>
        </Card>
        <Typography variant="body1">
          The <strong>Resources</strong> section is where you can explore and manage a curated list
          of development tools, libraries, and learning materials. Each item includes metadata like
          title, URL, description, category, and tags to help you filter and search efficiently.
        </Typography>
        <Typography variant="body1">
          🔗 All data is currently stored and managed through <strong>Firebase Firestore</strong>,
          allowing real-time updates and seamless cloud synchronization. Users can add, edit, and
          delete entries dynamically.
        </Typography>
        <Typography variant="body1">
          📄 For practical purposes, pagination is handled on the <strong>client side</strong> using
          React state and logic to simulate page behavior.
        </Typography>
        <Typography variant="body1">
          🛠️ In a future version, the application will migrate to{' '}
          <strong>PostgreSQL via Supabase</strong>, enabling true server-side pagination, filtering,
          and more efficient querying using SQL.
        </Typography>
      </Stack>
    </Box>
  );
}
