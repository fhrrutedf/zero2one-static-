import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { from_name, from_email, from_phone, message } = body;

    // Validate required fields
    if (!from_name || !from_email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    // Create transporter with Gmail App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zero2one012025@gmail.com',
        pass: 'shwx alxc ugun ndjt',
      },
    });

    // Email content
    const mailOptions = {
      from: '"ZERO TO ONE Website" <zero2one012025@gmail.com>',
      to: 'zero2one012025@gmail.com',
      subject: `رسالة جديدة من ${from_name} - موقع ZERO TO ONE`,
      html: `
        <div style="font-family: Cairo, Arial, sans-serif; direction: rtl; background: #f7f7f6; padding: 20px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #e92f08, #e98523); padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">ZERO TO ONE</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0; font-size: 14px;">رسالة جديدة من الموقع</p>
          </div>
          <div style="background: white; padding: 25px; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse; direction: rtl;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #6d0408; width: 120px;">الاسم:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1a1917;">${from_name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #6d0408;">البريد الإلكتروني:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1a1917;"><a href="mailto:${from_email}" style="color: #e92f08;">${from_email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #6d0408;">رقم الهاتف:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #1a1917;">${from_phone || 'غير محدد'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #6d0408; vertical-align: top;">الرسالة:</td>
                <td style="padding: 12px 0; color: #1a1917; line-height: 1.8;">${message}</td>
              </tr>
            </table>
          </div>
          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 15px;">
            هذه الرسالة أُرسلت من نموذج التواصل على موقع ZERO TO ONE
          </p>
        </div>
      `,
      replyTo: from_email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'تم إرسال الرسالة بنجاح' });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إرسال الرسالة' },
      { status: 500 }
    );
  }
}
