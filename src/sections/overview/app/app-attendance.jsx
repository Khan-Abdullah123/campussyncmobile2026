import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

// ----------------------------------------------------------------------

const HEAD_LABEL = [
  { id: 'name', label: 'Student Name' },
  { id: 'rollNo', label: 'Roll No' },
  { id: 'status', label: 'Status' },
];

export function AppAttendance({ title, subheader, list, onTakeAttendance, ...other }) {
  const present = list.filter((s) => s.status === 'present').length;
  const absent = list.filter((s) => s.status === 'absent').length;

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <Button
            size="small"
            variant="contained"
            startIcon={<Iconify icon="solar:check-circle-bold" />}
            onClick={onTakeAttendance}
          >
            Take Attendance
          </Button>
        }
        sx={{ mb: 2 }}
      />

      <Box sx={{ px: 3, pb: 2, display: 'flex', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'success.main' }} />
          <Typography variant="body2">Present: <strong>{present}</strong></Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'error.main' }} />
          <Typography variant="body2">Absent: <strong>{absent}</strong></Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'grey.400' }} />
          <Typography variant="body2">Total: <strong>{list.length}</strong></Typography>
        </Box>
      </Box>

      <Scrollbar sx={{ minHeight: 280 }}>
        <Table sx={{ minWidth: 480 }}>
          <TableHeadCustom headLabel={HEAD_LABEL} />
          <TableBody>
            {list.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar src={student.avatarUrl} alt={student.name} sx={{ width: 32, height: 32 }} />
                    <Typography variant="body2">{student.name}</Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" color="text.secondary">{student.rollNo}</Typography>
                </TableCell>

                <TableCell>
                  <Label
                    variant="soft"
                    color={student.status === 'present' ? 'success' : 'error'}
                  >
                    {student.status}
                  </Label>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Scrollbar>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View all students
        </Button>
      </Box>
    </Card>
  );
}
