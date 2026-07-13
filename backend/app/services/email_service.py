import smtplib
import ssl
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import get_settings

logger = logging.getLogger(__name__)


def send_email(subject: str, html_body: str) -> bool:
    """Send email notification via SMTP. Returns True if sent successfully."""
    settings = get_settings()

    # Skip if SMTP is not configured
    if not settings.smtp_user or not settings.smtp_password or not settings.notification_email:
        logger.warning("SMTP not configured. Skipping email notification.")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["From"] = f"DeepClariti <{settings.smtp_user}>"
        msg["To"] = settings.notification_email
        msg["Subject"] = subject

        msg.attach(MIMEText(html_body, "html"))

        # Try TLS on port 587 first, then SSL on port 465
        if settings.smtp_port == 465:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port, context=context) as server:
                server.login(settings.smtp_user, settings.smtp_password)
                server.sendmail(settings.smtp_user, settings.notification_email, msg.as_string())
        else:
            with smtplib.SMTP(settings.smtp_host, settings.smtp_port) as server:
                server.ehlo()
                server.starttls()
                server.ehlo()
                server.login(settings.smtp_user, settings.smtp_password)
                server.sendmail(settings.smtp_user, settings.notification_email, msg.as_string())

        logger.info(f"Email sent successfully: {subject}")
        return True

    except smtplib.SMTPAuthenticationError as e:
        logger.error(
            f"SMTP Authentication Failed: {e}. "
            "Please check: 1) 2FA is enabled on Gmail, "
            "2) App Password is correct (generate new one at https://myaccount.google.com/apppasswords), "
            "3) No spaces in the password"
        )
        return False
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return False


def send_booking_notification(
    name: str,
    phone: str,
    email: str,
    user_type: str,
    preferred_date: str,
    preferred_time: str,
    message: str | None = None,
):
    """Send notification when someone books a career coaching session."""
    subject = f"🗓️ New Session Booking: {name}"
    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e40af, #7c3aed); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">New Session Booking</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">A visitor has booked a career coaching session</p>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 10px 10px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td><td style="padding: 8px 0; color: #1f2937;">{name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td><td style="padding: 8px 0; color: #1f2937;">{phone}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px 0; color: #1f2937;"><a href="mailto:{email}">{email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Type:</td><td style="padding: 8px 0; color: #1f2937; text-transform: capitalize;">{user_type}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Preferred Date:</td><td style="padding: 8px 0; color: #1f2937;">{preferred_date}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Preferred Time:</td><td style="padding: 8px 0; color: #1f2937;">{preferred_time}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Message:</td><td style="padding: 8px 0; color: #1f2937;">{message or 'No message'}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 15px 0;">
            <p style="color: #6b7280; font-size: 12px;">Please confirm this appointment within 24 hours.</p>
        </div>
    </div>
    """
    send_email(subject, html_body)


def send_contact_notification(
    name: str,
    phone: str,
    email: str,
    user_type: str,
    message: str,
):
    """Send notification when someone submits the contact form."""
    subject = f"📩 New Contact Message: {name}"
    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">New Contact Message</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">A visitor has sent a message via the contact form</p>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 10px 10px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td><td style="padding: 8px 0; color: #1f2937;">{name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td><td style="padding: 8px 0; color: #1f2937;">{phone}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px 0; color: #1f2937;"><a href="mailto:{email}">{email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Type:</td><td style="padding: 8px 0; color: #1f2937; text-transform: capitalize;">{user_type}</td></tr>
            </table>
            <div style="margin-top: 15px; padding: 12px; background: #f9fafb; border-radius: 8px;">
                <p style="font-weight: bold; color: #374151; margin: 0 0 5px;">Message:</p>
                <p style="color: #1f2937; margin: 0;">{message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 15px 0;">
            <p style="color: #6b7280; font-size: 12px;">Please respond within 24 hours.</p>
        </div>
    </div>
    """
    send_email(subject, html_body)


def send_consultation_notification(
    name: str,
    phone: str,
    email: str,
    user_type: str,
    current_class: str | None = None,
    query: str | None = None,
):
    """Send notification when someone requests a free consultation."""
    subject = f"🆓 Free Consultation Request: {name}"
    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0;">Free Consultation Request</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0;">A visitor wants to book a FREE 30-minute consultation</p>
        </div>
        <div style="border: 1px solid #e5e7eb; border-top: none; padding: 20px; border-radius: 0 0 10px 10px;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td><td style="padding: 8px 0; color: #1f2937;">{name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td><td style="padding: 8px 0; color: #1f2937;">{phone}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td><td style="padding: 8px 0; color: #1f2937;"><a href="mailto:{email}">{email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Type:</td><td style="padding: 8px 0; color: #1f2937; text-transform: capitalize;">{user_type}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Current Class:</td><td style="padding: 8px 0; color: #1f2937;">{current_class or 'Not specified'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #374151;">Query:</td><td style="padding: 8px 0; color: #1f2937;">{query or 'No query specified'}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 15px 0;">
            <p style="color: #6b7280; font-size: 12px;">Please schedule a free consultation call within 24 hours.</p>
        </div>
    </div>
    """
    send_email(subject, html_body)
