import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import Groq from "groq-sdk";
import { Filter } from "bad-words";

const profanityFilter = new Filter();

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const { name, email, message, type } = await req.json();

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  // ── Step 1: Profanity pre-scan ──────────────────────────────────────────
  const combined = `${name} ${message}`;
  if (profanityFilter.isProfane(combined)) {
    return NextResponse.json(
      { error: "Your message contains language that isn't allowed. Please revise it." },
      { status: 422 }
    );
  }

  // ── Step 2: Groq moderation ─────────────────────────────────────────────
  let groqVerdict: string;
  try {
    const moderation = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a content moderator for a productivity app's contact form.
Your only job is to decide if a message is intended to be offensive, harmful, abusive,
threatening, or hateful toward the developer.

Legitimate bug reports, feature requests, complaints about the app, criticism, even
frustrated feedback — all of these should PASS. Only fail messages that are genuinely
meant to harm or abuse.

Reply with exactly one word: PASS or FAIL.`,
        },
        {
          role: "user",
          content: `Type: ${type}\nName: ${name}\nMessage: ${message}`,
        },
      ],
      max_tokens: 5,
      temperature: 0,
    });

    groqVerdict = moderation.choices[0]?.message?.content?.trim().toUpperCase() ?? "PASS";
  } catch {
    // If Groq is unavailable, fail open — don't block legitimate messages
    groqVerdict = "PASS";
  }

  if (groqVerdict !== "PASS") {
    return NextResponse.json(
      { error: "Your message was flagged as potentially harmful and could not be sent." },
      { status: 422 }
    );
  }

  // ── Step 3: Send via Resend ─────────────────────────────────────────────
  const subject = `[FocusDragon ${type}] from ${name}`;
  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #f97316; padding: 20px 24px; border-radius: 12px 12px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 18px;">
          New ${type} — FocusDragon
        </h2>
      </div>
      <div style="background: #141414; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #262626; border-top: none;">
        <p style="color: #a3a3a3; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">From</p>
        <p style="color: #ededed; margin: 0 0 20px 0; font-size: 15px;">${name} &lt;${email}&gt;</p>

        <p style="color: #a3a3a3; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Type</p>
        <p style="color: #ededed; margin: 0 0 20px 0; font-size: 15px;">${type}</p>

        <p style="color: #a3a3a3; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
        <p style="color: #ededed; margin: 0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "FocusDragon Contact <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "anay.goenka@icloud.com",
      replyTo: email,
      subject,
      html,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to send your message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
