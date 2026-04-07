"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function joinWaitlist(formData: FormData) {
  const email = formData.get("email") as string;
  const sport = formData.get("sport") as string;
  const frustration = formData.get("frustration") as string;

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  try {
    // 1. Send Notification to Admin
    await resend.emails.send({
      from: "Resiliento Waitlist <support@resiliento.app>",
      to: "support@resiliento.app",
      subject: `New Waitlist Signup: ${email}`,
      html: `
        <h2>New Waitlist Lead</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Primary Sport:</strong> ${sport || "Not provided"}</p>
        <p><strong>Bottleneck:</strong> ${frustration || "Not provided"}</p>
      `,
    });

    // 2. Send laconic confirmation to User
    await resend.emails.send({
      from: "Team Resiliento <support@resiliento.app>",
      to: email,
      subject: "Access Secured: Resiliento",
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; color: #333;">
          <p>Parameters logged.</p>
          <p>Your access is secured. We are assembling the optimal hybrid training engine.</p>
          <p>We will initiate contact when the next cohort phase begins.</p>
          <br>
          <p>Stay resilient,<br>Team Resiliento</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Transmission Failed" };
  }
}
