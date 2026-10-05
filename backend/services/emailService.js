import nodemailer from 'nodemailer';

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
};

const sendNotificationEmail = async ({ subject, html }) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('SMTP not configured — skipping email notification');
    return;
  }

  await getTransporter().sendMail({
    from: `"PixNGiggles Website" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
    subject,
    html,
  });
};

export const sendBookingNotification = (booking) =>
  sendNotificationEmail({
    subject: `New Booking Inquiry — ${booking.fullName}`,
    html: `
      <h2>New Booking Inquiry</h2>
      <p><strong>Name:</strong> ${booking.fullName}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Phone:</strong> ${booking.phone || '-'}</p>
      <p><strong>Event Type:</strong> ${booking.eventType || '-'}</p>
      <p><strong>Event Date:</strong> ${booking.eventDate || '-'}</p>
      <p><strong>Venue:</strong> ${booking.venue || '-'}</p>
      <p><strong>Message:</strong> ${booking.message || '-'}</p>
    `,
  });

export const sendContactNotification = (contact) =>
  sendNotificationEmail({
    subject: `New Contact Message — ${contact.name}`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone || '-'}</p>
      <p><strong>Message:</strong> ${contact.message || '-'}</p>
    `,
  });
