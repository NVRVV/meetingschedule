// components/MeetingForm.tsx
import { useState } from 'react';

const MeetingForm = () => {
  const [service, setService] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [title, setTitle] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/createMeeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service,
        title,
        projectBrief,
        timeSlot,
        email, // Send email too for confirmation
      }),
    });

    if (response.ok) {
      const data = await response.json();
      alert(`Meeting Created! Join at: ${data.meetingUrl}`);
    } else {
      alert('Failed to create meeting');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow">
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">Select Service</label>
        <select
          id="service"
          className="mt-1 block w-full rounded-md border-gray-300"
          value={service}
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">Choose a service</option>
          <option value="static">Static Website</option>
          <option value="dynamic">Dynamic Website</option>
        </select>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Project Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div>
        <label htmlFor="projectBrief" className="block text-sm font-medium text-gray-700">Project Brief</label>
        <textarea
          id="projectBrief"
          value={projectBrief}
          onChange={(e) => setProjectBrief(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div>
        <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700">Select Date & Time Slot</label>
        <input
          type="datetime-local"
          id="timeSlot"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Schedule Meeting
      </button>
    </form>
  );
};

export default MeetingForm;
