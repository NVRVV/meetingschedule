// src/app/page.tsx

"use client";

import React, { useState } from 'react';
import ScheduleMeeting from '../components/ScheduleMeeting';
import JitsiMeeting from '../components/JitsiMeeting';

const HomePage = () => {
  const [meetingId, setMeetingId] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      {!meetingId ? (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-lg">
          <h1 className="text-4xl font-bold text-blue-800 mb-6">Schedule a Meeting</h1>
          <ScheduleMeeting />
        </div>
      ) : (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Meeting</h2>
          <JitsiMeeting meetingId={meetingId} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
