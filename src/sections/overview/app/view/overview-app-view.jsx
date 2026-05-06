import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { _mock } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';

import { svgColorClasses } from 'src/components/svg-color';

import { useMockedUser } from 'src/auth/hooks';

import { AppWidget } from '../app-widget';
import { AppAlerts } from '../app-alerts';
import { AppWelcome } from '../app-welcome';
import { AppCalendar } from '../app-calendar';
import { AppFeatured } from '../app-featured';
import { AppAttendance } from '../app-attendance';
import { AppNewInvoice } from '../app-new-invoice';
import { AppTopAuthors } from '../app-top-authors';
import { AppTopRelated } from '../app-top-related';
import { AppWidgetSummary } from '../app-widget-summary';
import { AppAreaInstalled } from '../app-area-installed';
import { AppCurrentDownload } from '../app-current-download';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();
  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>

        {/* ── PRIORITY 1 — DAILY USE ────────────────────────────────── */}

        {/* Hero / Welcome Card */}
        <Grid xs={12} md={8}>
          <AppWelcome
            title={`Welcome back 👋 \n ${user?.displayName}`}
            description="You have 4 classes today. Don't forget to mark attendance for Grade 8A Mathematics."
            img={<SeoIllustration hideBackground />}
            stats={[
              { label: 'Class', value: 'Grade 8A' },
              { label: 'Subject', value: 'Mathematics' },
            ]}
            action={
              <Button variant="contained" color="primary">
                Take Attendance
              </Button>
            }
          />
        </Grid>

        {/* Today's Timetable Card */}
        <Grid xs={12} md={4}>
          <AppFeatured
            title="Today's Timetable"
            list={[
              {
                id: '1',
                title: 'Mathematics — 8A',
                description: '08:00 AM – 09:30 AM  ·  Room 102',
                coverUrl: _mock.image.cover(1),
              },
              {
                id: '2',
                title: 'Physics — 9B',
                description: '10:00 AM – 11:30 AM  ·  Lab 2',
                coverUrl: _mock.image.cover(2),
              },
              {
                id: '3',
                title: 'Mathematics — 8C',
                description: '12:30 PM – 02:00 PM  ·  Room 105',
                coverUrl: _mock.image.cover(3),
              },
            ]}
          />
        </Grid>

        {/* Stat Cards */}
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Attendance Today"
            percent={2.6}
            total={28}
            chart={{
              categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              series: [25, 27, 26, 28, 28],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Homework Completion"
            percent={0.2}
            total={85}
            chart={{
              colors: [theme.vars.palette.info.main],
              categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              series: [70, 75, 82, 85, 85],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Pending Assignments"
            percent={-0.1}
            total={12}
            chart={{
              colors: [theme.vars.palette.error.main],
              categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              series: [15, 12, 14, 10, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Upcoming Exams"
            percent={0.5}
            total={3}
            chart={{
              colors: [theme.vars.palette.warning.main],
              categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              series: [1, 2, 2, 3, 3],
            }}
          />
        </Grid>

        {/* Full Width Calendar */}
        <Grid xs={12}>
          <AppCalendar
            title="School Calendar"
            subheader="April 2026"
          />
        </Grid>

        {/* ── PRIORITY 2 — CLASS CONTROL ───────────────────────────── */}

        {/* Student Performance Donut */}
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Student Performance"
            subheader="Average class scores by subject"
            chart={{
              series: [
                { label: 'Mathematics', value: 85 },
                { label: 'Physics', value: 72 },
                { label: 'Chemistry', value: 68 },
                { label: 'Biology', value: 75 },
              ],
            }}
          />
        </Grid>

        {/* Class Analytics Bar Chart */}
        <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Class Analytics"
            subheader="Attendance and Submission Trends"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              series: [
                {
                  name: '2024',
                  data: [
                    { name: 'Attendance', data: [92, 94, 91, 95, 93, 94] },
                    { name: 'Homework', data: [80, 82, 78, 85, 83, 85] },
                    { name: 'Assignments', data: [75, 78, 72, 80, 77, 78] },
                  ],
                },
              ],
            }}
          />
        </Grid>

        {/* Attendance Section */}
        <Grid xs={12} md={12} lg={12}>
          <AppAttendance
            title="Today's Attendance"
            subheader="Grade 8A — Monday, 28 April 2026"
            list={[
              { id: '1', name: 'Alice Johnson', rollNo: '01', avatarUrl: _mock.image.avatar(1), status: 'present' },
              { id: '2', name: 'Bob Smith', rollNo: '02', avatarUrl: _mock.image.avatar(2), status: 'present' },
              { id: '3', name: 'Charlie Brown', rollNo: '03', avatarUrl: _mock.image.avatar(3), status: 'absent' },
              { id: '4', name: 'Diana Prince', rollNo: '04', avatarUrl: _mock.image.avatar(4), status: 'present' },
              { id: '5', name: 'Edward Stark', rollNo: '05', avatarUrl: _mock.image.avatar(5), status: 'absent' },
            ]}
            onTakeAttendance={() => console.info('Taking attendance...')}
          />
        </Grid>

        {/* ── PRIORITY 3 — TASK MANAGEMENT ─────────────────────────── */}

        {/* Homework & Assignments Table */}
        <Grid xs={12} lg={8}>
          <AppNewInvoice
            title="Homework & Assignments"
            tableData={[
              { id: '1', invoiceNumber: 'Quadratic Equations', category: 'Mathematics', price: 32, status: 'paid' },
              { id: '2', invoiceNumber: "Newton's Laws", category: 'Physics', price: 28, status: 'progress' },
              { id: '3', invoiceNumber: 'Chemical Bonding', category: 'Chemistry', price: 30, status: 'out of date' },
            ]}
            headLabel={[
              { id: 'title', label: 'Assignment Title' },
              { id: 'subject', label: 'Subject' },
              { id: 'submitted', label: 'Submitted' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>

        {/* Alerts / Notifications */}
        <Grid xs={12} md={6} lg={4}>
          <AppAlerts
            title="Alerts & Notifications"
            subheader="Today's important updates"
            list={[
              { id: '1', type: 'absent', message: '3 students absent in Grade 8A', time: 'This morning' },
              { id: '2', type: 'deadline', message: 'Physics homework due tomorrow', time: 'Due: 29 Apr' },
              { id: '3', type: 'exam', message: 'Mathematics Test — 28 Apr', time: 'Today, 10:00 AM' },
              { id: '4', type: 'fee', message: '5 students have pending fees', time: 'Action needed' },
            ]}
          />
        </Grid>

        {/* ── PRIORITY 4 — STUDENT MANAGEMENT ──────────────────────── */}

        {/* Top Students */}
        <Grid xs={12} md={6} lg={6}>
          <AppTopAuthors
            title="Top Students"
            list={[
              { id: '1', name: 'Alice Johnson', avatarUrl: _mock.image.avatar(1), totalFavorites: 980 },
              { id: '2', name: 'Bob Smith', avatarUrl: _mock.image.avatar(2), totalFavorites: 920 },
              { id: '3', name: 'Diana Prince', avatarUrl: _mock.image.avatar(4), totalFavorites: 875 },
              { id: '4', name: 'Edward Stark', avatarUrl: _mock.image.avatar(5), totalFavorites: 840 },
            ]}
          />
        </Grid>

        {/* Student List */}
        <Grid xs={12} md={6} lg={6}>
          <AppTopRelated
            title="Student List"
            list={[
              { id: '1', name: 'Alice Johnson', shortcut: _mock.image.avatar(1), price: 98, downloaded: 95, ratingNumber: 5, totalReviews: 120, size: 1024 },
              { id: '2', name: 'Bob Smith', shortcut: _mock.image.avatar(2), price: 92, downloaded: 88, ratingNumber: 4.5, totalReviews: 80, size: 512 },
              { id: '3', name: 'Charlie Brown', shortcut: _mock.image.avatar(3), price: 75, downloaded: 70, ratingNumber: 3.5, totalReviews: 60, size: 256 },
            ]}
          />
        </Grid>

        {/* ── PRIORITY 5 — ADMIN / SUPPORT ──────────────────────────── */}

        {/* Fees Section */}
        <Grid xs={12} lg={8}>
          <AppNewInvoice
            title="Fees Section"
            tableData={[
              { id: '1', invoiceNumber: 'Alice Johnson', category: 'Grade 8A', price: 12000, status: 'paid' },
              { id: '2', invoiceNumber: 'Bob Smith', category: 'Grade 8A', price: 12000, status: 'progress' },
              { id: '3', invoiceNumber: 'Charlie Brown', category: 'Grade 8A', price: 12000, status: 'out of date' },
            ]}
            headLabel={[
              { id: 'name', label: 'Student Name' },
              { id: 'class', label: 'Class' },
              { id: 'amount', label: 'Amount' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>

        {/* Insights Cards */}
        <Grid xs={12} md={6} lg={4}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <AppWidget
              title="Total Students"
              total={32}
              icon="solar:users-group-rounded-bold"
              chart={{ series: 100 }}
            />

            <AppWidget
              title="Today's Classes"
              total={4}
              icon="solar:calendar-date-bold"
              chart={{
                series: 50,
                colors: [theme.vars.palette.warning.light, theme.vars.palette.warning.main],
              }}
              sx={{ bgcolor: 'warning.dark', [`& .${svgColorClasses.root}`]: { color: 'warning.light' } }}
            />

            <AppWidget
              title="Attendance Today"
              total="94%"
              icon="solar:user-rounded-bold"
              chart={{
                series: 94,
                colors: [theme.vars.palette.info.light, theme.vars.palette.info.main],
              }}
              sx={{ bgcolor: 'info.dark', [`& .${svgColorClasses.root}`]: { color: 'info.light' } }}
            />
          </Box>
        </Grid>

      </Grid>
    </DashboardContent>
  );
}
