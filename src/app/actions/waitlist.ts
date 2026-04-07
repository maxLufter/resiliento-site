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

    // 2. Send premium confirmation to User
    await resend.emails.send({
      from: "Team Resiliento <support@resiliento.app>",
      to: email,
      subject: "Waitlist Status: Access Secured",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; color: #1a1a1a; padding: 40px 20px;">
          <div style="margin-bottom: 32px;">
            <h1 style="margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">RESILIENTO</h1>
            <div style="height: 2px; width: 30px; background-color: #000; margin-top: 16px;"></div>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
            Your position on the waitlist is secured.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #4a4a4a;">
            We are currently onboarding athletes in carefully metered cohorts. This ensures our adaptive progression models calibrate perfectly to each individual's baseline.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px; color: #4a4a4a;">
            As soon as the engine is ready for your specific profile, we will send your access instructions to this address.
          </p>
          
          <div style="border-top: 1px solid #eaeaea; padding-top: 24px;">
            <p style="font-size: 11px; color: #888; margin: 0; letter-spacing: 1px; text-transform: uppercase;">
              The Resiliento Engine
            </p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Transmission Failed" };
  }
}
