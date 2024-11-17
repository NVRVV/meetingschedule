// src/pages/api/createMeeting.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendConfirmationEmail } from '../../lib/sendMail'; // Ensure the path is correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { service, title, projectBrief, timeSlot, email } = req.body;

    // Generate Jitsi meeting URL
    const meetingUrl = `https://meet.jit.si/${title}-${Date.now()}`;

    // Send confirmation email
    await sendConfirmationEmail(email, meetingUrl, timeSlot);

    // Respond with the meeting URL
    res.status(200).json({ meetingUrl });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
