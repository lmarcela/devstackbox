import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

const techStack = ['React.js', 'Next.js', 'Material UI', 'Tailwind', 'TypeScript'];
const libraries = ['Zod', 'React Query', 'React Hook Form'];

export default function BuiltWith() {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" fontWeight="medium" gutterBottom>
          🛠️ Tech Stack
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
          {techStack.map(tech => (
            <Chip key={tech} label={tech} color="primary" variant="outlined" />
          ))}
        </Stack>

        <Divider className="my-2" />

        <Typography variant="h6" gutterBottom>
          ⚙️ Form & Data Handling
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          {libraries.map(lib => (
            <Chip key={lib} label={lib} color="secondary" variant="outlined" />
          ))}
        </Stack>

        <Box>
          <List>
            <ListItem className="py-0">
              <ListItemText
                primary={
                  <>
                    <Typography component="span" fontWeight="bold">
                      Zod
                    </Typography>{' '}
                    is used for form schema validation
                  </>
                }
              />
            </ListItem>
            <ListItem className="py-0">
              <ListItemText
                primary={
                  <>
                    <Typography component="span" fontWeight="bold">
                      React Hook Form
                    </Typography>{' '}
                    handles efficient form state and submission
                  </>
                }
              />
            </ListItem>
            <ListItem className="py-0">
              <ListItemText
                primary={
                  <>
                    <Typography component="span" fontWeight="bold">
                      React Query
                    </Typography>{' '}
                    manages server state, caching and async data
                  </>
                }
              />
            </ListItem>
          </List>
        </Box>
      </CardContent>
    </Card>
  );
}
