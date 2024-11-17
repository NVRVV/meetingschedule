import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Define the type for a meeting
interface Meeting {
  title: string;
  service: string;
  summary: string;
  selectedDate: string;
  selectedTime: string;
  duration: number;
}

// Function to generate time slots, last ending at midnight (12 AM)
const timeslots = (duration: number) => {
  const slots = [];
  let start = 6 * 60; // Start at 6:00 AM in minutes
  const end = 21 * 60; // Until midnight in minutes

  while (start + duration <= end) {
    const hours = Math.floor(start / 60);
    const minutes = start % 60;
    const endHours = Math.floor((start + duration) / 60);
    const endMinutes = (start + duration) % 60;
    const formattedStart = `${hours % 24 === 0 ? 12 : hours % 24}:${minutes
      .toString()
      .padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
    const formattedEnd = `${endHours % 24 === 0 ? 12 : endHours % 24}:${endMinutes
      .toString()
      .padStart(2, '0')} ${endHours >= 12 ? 'PM' : 'AM'}`;
    slots.push(`${formattedStart} - ${formattedEnd}`);
    start += duration;
  }

  return slots;
};

const ScheduleMeeting = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [duration, setDuration] = useState(30);
  const [selectedTime, setSelectedTime] = useState('');
  const [title, setTitle] = useState('');
  const [service, setService] = useState('');
  const [summary, setSummary] = useState('');
  const [meetings, setMeetings] = useState<Meeting[]>([]); // Define the meetings array as an array of Meeting
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Store the index of the meeting being edited

  useEffect(() => {
    // Request notification permission when component mounts
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    const newMeeting: Meeting = {
      title,
      service,
      summary,
      selectedDate: selectedDate.toLocaleDateString(),
      selectedTime,
      duration,
    };

    if (editingIndex !== null) {
      // Reschedule existing meeting
      const updatedMeetings = [...meetings];
      updatedMeetings[editingIndex] = newMeeting;
      setMeetings(updatedMeetings);
      setEditingIndex(null);
      sendEmailNotification(
        'user@example.com', // Replace with user's email
        'Meeting Rescheduled',
        `Your meeting '${title}' has been rescheduled to ${selectedDate.toLocaleDateString()} at ${selectedTime}`
      );
      sendWebsiteNotification('Meeting Rescheduled', `Your meeting '${title}' has been rescheduled.`);
    } else {
      // Schedule new meeting
      setMeetings([...meetings, newMeeting]);
      sendEmailNotification(
        'user@example.com', // Replace with user's email
        'New Meeting Scheduled',
        `Your meeting '${title}' is scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}`
      );
      sendWebsiteNotification('New Meeting Scheduled', `Your meeting '${title}' is scheduled.`);
    }

    alert('Meeting successfully scheduled!');
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setService('');
    setSummary('');
    setSelectedTime('');
    setStep(1);
  };

  const handleReschedule = (index: number) => {
    const meeting = meetings[index];
    setTitle(meeting.title);
    setService(meeting.service);
    setSummary(meeting.summary);
    setSelectedDate(new Date(meeting.selectedDate));
    setSelectedTime(meeting.selectedTime);
    setDuration(meeting.duration);
    setEditingIndex(index);
    setStep(1); // Go back to step 1 to edit the meeting
  };

  const sendEmailNotification = (to: string, subject: string, message: string) => {
    // Placeholder for email sending logic (replace with actual API)
    console.log(`Email sent to ${to}: ${subject} - ${message}`);
  };

  const sendWebsiteNotification = (title: string, message: string) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body: message });
    }
  };

  return (
    <div style={styles.container}>
      <h1>Upcoming Meetings</h1>
      <ul>
        {meetings.length > 0 ? (
          meetings.map((meeting, index) => (
            <li key={index}>
              <strong>{meeting.title}</strong> - {meeting.selectedDate} {meeting.selectedTime} - {meeting.service}
              <button onClick={() => handleReschedule(index)} style={styles.rescheduleButton}>
                Reschedule
              </button>
            </li>
          ))
        ) : (
          <p>No upcoming meetings</p>
        )}
      </ul>

      <div>
        {step === 1 && (
          <div>
            <h2>Select a Date</h2>
            <Calendar onChange={(date) => setSelectedDate(date as Date)} value={selectedDate} minDate={new Date()} />
            <button onClick={nextStep} style={styles.button}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Select Duration</h2>
            <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} style={styles.input}>
              <option value={15}>15 Minutes</option>
              <option value={30}>30 Minutes</option>
              <option value={45}>45 Minutes</option>
              <option value={60}>60 Minutes</option>
            </select>
            <button onClick={prevStep} style={styles.button}>
              Back
            </button>
            <button onClick={nextStep} style={styles.button}>
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>Select a Time Slot</h2>
            <div style={styles.grid}>
              {timeslots(duration).map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  style={{
                    ...styles.slotButton,
                    backgroundColor: selectedTime === slot ? '#3b82f6' : '#f3f4f6',
                    color: selectedTime === slot ? '#fff' : '#000',
                  }}
                >
                  {slot}
                </button>
              ))}
            </div>
            <button onClick={prevStep} style={styles.button}>
              Back
            </button>
            <button onClick={nextStep} disabled={!selectedTime} style={styles.button}>
              Next
            </button>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2>Enter Meeting Details</h2>
            <input type="text" placeholder="Meeting Title" value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input} />
            <input type="text" placeholder="Service" value={service} onChange={(e) => setService(e.target.value)} style={styles.input} />
            <textarea placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} style={styles.input} />
            <button onClick={prevStep} style={styles.button}>
              Back
            </button>
            <button onClick={handleSubmit} style={styles.button}>
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    marginRight: '10px',
    color: '#fff',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#3b82f6',
    fontSize: '16px',
    cursor: 'pointer',
  },
  rescheduleButton: {
    marginLeft: '10px',
    color: '#fff',
    backgroundColor: '#f59e0b',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '16px',
  },
  slotButton: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    cursor: 'pointer',
  },
};

export default ScheduleMeeting;
