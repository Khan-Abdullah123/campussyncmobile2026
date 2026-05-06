import Calendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { fDate } from 'src/utils/format-time';

import { StyledCalendar } from '../../calendar/styles';
import { useCalendar } from '../../calendar/hooks/use-calendar';
import { CalendarToolbar } from '../../calendar/calendar-toolbar';

// ----------------------------------------------------------------------

export function AppCalendar({ title, subheader, ...other }) {
  const theme = useTheme();

  const {
    calendarRef,
    //
    view,
    date,
    //
    onDatePrev,
    onDateNext,
    onDateToday,
    onChangeView,
    onSelectRange,
    onClickEvent,
  } = useCalendar();

  return (
    <Card {...other}>
      <StyledCalendar sx={{ p: 2 }}>
        <CalendarToolbar
          date={fDate(date)}
          view={view}
          onNextDate={onDateNext}
          onPrevDate={onDatePrev}
          onToday={onDateToday}
          onChangeView={onChangeView}
          sx={{ mb: 2 }}
        />

        <Calendar
          weekends
          editable
          droppable
          selectable
          rerenderDelay={10}
          ref={calendarRef}
          initialDate={date}
          initialView={view}
          dayMaxEventRows={3}
          eventDisplay="block"
          headerToolbar={false}
          select={onSelectRange}
          eventClick={onClickEvent}
          height={500}
          plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin]}
          events={[
            { id: '1', title: 'Mathematics Test', start: '2026-04-28', color: theme.palette.error.main },
            { id: '2', title: 'Physics Assignment', start: '2026-04-30', color: theme.palette.warning.main },
            { id: '3', title: 'School Sports Day', start: '2026-05-05', color: theme.palette.info.main },
          ]}
        />
      </StyledCalendar>
    </Card>
  );
}
