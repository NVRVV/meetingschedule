// src/components/JitsiMeeting.tsx
import React, { useEffect } from 'react';

const JitsiMeeting = ({ meetingId }: { meetingId: string }) => {
  useEffect(() => {
    const domain = 'meet.jit.si';
    const options = {
      roomName: meetingId,
      width: '100%',
      height: 500,
      parentNode: document.getElementById('jitsi-container'),
    };

    if (window.JitsiMeetExternalAPI) {
      new window.JitsiMeetExternalAPI(domain, options);
    } else {
      console.error('JitsiMeetExternalAPI is not available.');
    }
  }, [meetingId]);

  return <div id="jitsi-container"></div>;
};

export default JitsiMeeting;
