import { ScheduleEvent } from "backend";
import { useState } from "react";
import {
  DateSelectArg,
  EventApi,
  EventContentArg,
  formatDate,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Api from "@/Api";
import "./index.css";

let eventGuid = 0;

export function createEventId() {
  return String(eventGuid++);
}

export default function Calendar({ canDelete }: { canDelete?: boolean }) {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  useWebsocket((data: ScheduleEvent) => {
    const localEvent = events.find((item) => item.id === data.id);
    if (!localEvent) {
      setEvents([...events, data]);
    } else {
      setEvents(
        events.map((eve) => {
          if (eve.id === data.id) {
            return data;
          }
          return eve;
        })
      );
    }
  });
  useEffect(() => {
    Api.getScheduleEvents().then((list) => {
      setEvents(list);
    });
  }, []);

  async function handleDateSelect({ start, view }: DateSelectArg) {
    // Align start time to the nearest 15-minute interval

    const startTime = new Date(start);
    const startMinutes = Math.floor(startTime.getMinutes() / 15) * 15;
    startTime.setMinutes(startMinutes);
    startTime.setSeconds(0);
    startTime.setMilliseconds(0);

    // Set end time to 15 minutes after start
    const endTime = new Date(startTime.getTime());
    endTime.setMinutes(startMinutes + 15);

    const input = prompt("Event name"); // Default title if prompt is canceled
    if (!input) return;
    // Create new event with unique ID
    const newEvent = {
      // id: createEventId(),
      title: input,
      // moment().format('MMMM Do YYYY, h:mm:ss a');
      start: moment(startTime).format("YYYY-MM-DDTHH:mm:ss"),
      end: moment(endTime).format("YYYY-MM-DDTHH:mm:ss"),
      status: null,
    };

    const res = await Api.addScheduleEvents(newEvent);
    // Append new event to existing events
    setEvents([...events, res]);

    // Unselect to prevent visual confusion
    view.calendar.unselect();
  }
  async function handleEventClick(clickInfo: { event: EventApi }) {
    if (canDelete === true) {
      const updatedEvent = {
        title: clickInfo.event.title,
        id: clickInfo.event.id,
        start: clickInfo.event.start,
        end: clickInfo.event.end,
        status: "CLOSE",
      };
      await Api.updateScheduleEvents(updatedEvent as unknown as ScheduleEvent);
      setEvents(
        events?.map((item) => {
          if (item.id === clickInfo.event.id) {
            return updatedEvent;
          }
          return item;
        })
      );
    }
  }

  function handleEvents(events: EventApi[]) {
    setCurrentEvents(events); // Update Sidebar events
  }

  function formatEvent(events: ScheduleEvent[]) {
    return events.map((e) => {
      if (e.status === "CLOSE") {
        Object.assign(e, {
          color: "grey",
        });
      }
      return e;
    });
  }

  return (
    <div className="demo-app">
      <Sidebar currentEvents={currentEvents} />
      <div className="demo-app-main">
        <FullCalendar
          // key={currentEvents.length}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridDay",
          }}
          initialView="timeGridDay"
          slotMinTime="09:00:00"
          slotMaxTime="17:00:00"
          slotDuration="00:15:00"
          snapDuration="00:15:00"
          selectConstraint={{
            duration: { minutes: 15 }, // Enforce 15-minute selections
          }}
          editable={false}
          selectable={true}
          unselectAuto={true}
          selectMirror={false}
          dayMaxEvents={true}
          events={formatEvent(events)} // Render all events from state
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick} // Handle individual event clicks
          eventsSet={handleEvents} // Update when events change
        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <div className="relative">
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      {eventInfo.event.extendedProps.status === "CLOSE" && (
        <span className="float-right mr-2">CLOSED</span>
      )}
    </div>
  );
}

function Sidebar({ currentEvents }: { currentEvents: EventApi[] }) {
  return (
    <div className="demo-app-sidebar">
      <div className="demo-app-sidebar-section">
        <h2>All Events ({currentEvents.length})</h2>
        <ul>
          {currentEvents.map((event) => (
            <SidebarEvent key={event.id} event={event} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function SidebarEvent({ event }: { event: EventApi }) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start ?? "", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
