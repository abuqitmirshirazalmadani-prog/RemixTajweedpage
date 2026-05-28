import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, course, level, comments, sourcePage = "Blog Modal" } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: "Name and Email are required properties." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT || "587";
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASSWORD;

    // Check if configuration exists
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn("SMTP settings are missing in process.env. Fallback strategy initiated.");
      return NextResponse.json(
        {
          success: false,
          warning: "SMTP config missing",
          message: "Please configure SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD in your Secrets tab in AI Studio.",
          data: { fullName, email, phone, course, level, comments, sourcePage }
        },
        { status: 200 } // Return 200 so the client modal doesn't crash on incomplete server variables
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: smtpPort === "465", // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"TajweedPage Notifications" <${smtpUser}>`,
      to: "abuqitmirshirazalmadani@gmail.com",
      replyTo: email,
      subject: `✨ [REGISTER TRACE] New Free Trial Class Student - ${fullName}`,
      html: `
        <div style="font-family: 'Georgia', serif; color: #111111; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #fafafa; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="font-family: 'Cinzel', 'Playfair Display', serif; font-size: 24px; text-transform: uppercase; letter-spacing: 0.1em; color: #000000; border-bottom: 2px solid #C8EB5F; padding-bottom: 12px; margin-bottom: 24px;">
            TajweedPage Academy
          </h2>
          <p style="font-size: 14px; line-height: 1.6; color: #555555; margin-bottom: 24px;">
            Asalamu Alaikum, a new student registration has been captured from the website interface. Below are the premium verified enrollment coordinates.
          </p>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px;">
            <tr style="border-bottom: 1px solid #eaeaea;">
              <td style="padding: 12px 0; font-weight: bold; width: 150px; text-transform: uppercase; font-size: 10px; color: #666666; letter-spacing: 0.1em;">Student Name</td>
              <td style="padding: 12px 0; color: #111111; font-weight: 500;">${fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eaeaea;">
              <td style="padding: 12px 0; font-weight: bold; text-transform: uppercase; font-size: 10px; color: #666666; letter-spacing: 0.1em;">Email Address</td>
              <td style="padding: 12px 0; color: #111111;"><a href="mailto:${email}" style="color: #000000; text-decoration: underline;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #eaeaea;">
              <td style="padding: 12px 0; font-weight: bold; text-transform: uppercase; font-size: 10px; color: #666666; letter-spacing: 0.1em;">Phone / WhatsApp</td>
              <td style="padding: 12px 0; color: #111111; font-family: monospace; font-size: 14px;">${phone || "Not specified"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eaeaea;">
              <td style="padding: 12px 0; font-weight: bold; text-transform: uppercase; font-size: 10px; color: #666666; letter-spacing: 0.1em;">Desired Track</td>
              <td style="padding: 12px 0; color: #111111; font-weight: bold;">${course || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eaeaea;">
              <td style="padding: 12px 0; font-weight: bold; text-transform: uppercase; font-size: 10px; color: #666666; letter-spacing: 0.1em;">Current Level</td>
              <td style="padding: 12px 0; color: #111111;">${level || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eaeaea;">
              <td style="padding: 12px 0; font-weight: bold; text-transform: uppercase; font-size: 10px; color: #666666; letter-spacing: 0.1em;">Portal Reference</td>
              <td style="padding: 12px 0; color: #888888; font-style: italic;">${sourcePage}</td>
            </tr>
          </table>

          <div style="background-color: #f0f0f0; border-left: 3px solid #C8EB5F; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
            <span style="display: block; font-size: 10px; font-weight: bold; text-transform: uppercase; color: #666666; letter-spacing: 0.05em; margin-bottom: 6px;">Comments & Wishes</span>
            <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #222222;">
              ${comments || "No comments entered."}
            </p>
          </div>

          <div style="border-t: 1px solid #eaeaea; padding-top: 20px; text-align: center; font-size: 10px; color: #777777; font-family: sans-serif;">
            <p style="margin: 0 0 6px 0;">This transmission was auto-routed by TajweedPage Digital Gateway.</p>
            <p style="margin: 0; font-weight: bold; color: #C8EB5F; letter-spacing: 0.18em; text-transform: uppercase;">VERIFIED TRUSTED GATEWAY</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info.messageId);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error("Nodemailer SMTP Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Mail Router Error" },
      { status: 500 }
    );
  }
}
