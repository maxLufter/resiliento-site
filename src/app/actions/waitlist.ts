"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function joinWaitlist(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const sport = formData.get("sport") as string;
  const frustration = formData.get("frustration") as string;

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  // Strict email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email structure" };
  }

  try {
    // 1. Send Notification to Admin
    await resend.emails.send({
      from: "Resiliento Waitlist <support@resiliento.app>",
      to: "support@resiliento.app",
      subject: `New Waitlist Signup: ${email}`,
      html: `
        <h2>New Waitlist Lead</h2>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Primary Sport:</strong> ${sport || "Not provided"}</p>
        <p><strong>Bottleneck:</strong> ${frustration || "Not provided"}</p>
      `,
    });

    // 2. Send premium confirmation to User
    await resend.emails.send({
      from: "Team Resiliento <support@resiliento.app>",
      to: email,
      subject: "Waitlist Status: Position Secured",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; padding: 20px; background-color: #ffffff;">
          
          <!-- Header Logo -->
          <div style="margin-bottom: 32px; text-align: left;">
            <img src="https://resiliento.app/logo-picture.png" alt="RESILIENTO" style="display: block; width: 150px; height: auto;" />
          </div>
          
          <div style="padding: 0 10px;">
            <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; color: #111;">
              Position Confirmed
            </h2>
            
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px; color: #4a4a4a;">
              Your parameters have been logged and your position on the waitlist is secured.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 24px; color: #4a4a4a;">
              We are currently onboarding athletes in carefully metered execution cohorts. This ensures our adaptive progression models calibrate perfectly to each individual's baseline without system saturation.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; margin: 0 0 32px; color: #4a4a4a;">
              As soon as the engine is ready to ingest your specific profile, we will automatically send your access payload to this address.
            </p>
            
            <!-- Sleek Footer -->
            <div style="border-top: 1px solid #eaeaea; padding-top: 24px; margin-top: 40px; display: table; width: 100%;">
              <div style="display: table-cell; vertical-align: middle;">
                <p style="font-size: 11px; color: #888; margin: 0; letter-spacing: 1px; text-transform: uppercase; font-family: monospace;">
                  RESILIENTO <span style="margin: 0 5px;">|</span> ALG-PHASE-1
                </p>
              </div>
              <div style="display: table-cell; vertical-align: middle; text-align: right;">
                <a href="https://resiliento.app" style="font-size: 11px; color: #3182ce; text-decoration: none; letter-spacing: 1px; text-transform: uppercase; font-family: monospace;">
                  View System Status →
                </a>
              </div>
            </div>
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
