// src/components/UpcomingMeetings.tsx
import React from 'react';

interface Meeting {
  title: string;
  timeSlot: string;
  date: string;
}

interface UpcomingMeetingsProps {
  meetings: Meeting[];
  onReschedule: (meeting: Meeting) => void;
}

const UpcomingMeetings: React.FC<UpcomingMeetingsProps> = ({ meetings, onReschedule }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Upcoming Meetings</h2>
      {meetings.length === 0 ? (
        <p>No upcoming meetings.</p>
      ) : (
        <ul className="space-y-4">
          {meetings.map((meeting, index) => (
            <li key={index} className="border p-4 rounded-md shadow-md">
              <h3 className="text-lg font-semibold">{meeting.title}</h3>
              <p>{meeting.date}</p>
              <p>{meeting.timeSlot}</p>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => onReschedule(meeting)}
              >
                Reschedule
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingMeetings;
