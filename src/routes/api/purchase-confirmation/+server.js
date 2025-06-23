import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import stripe from 'stripe';


const PDF_GUIDE_URL = 'https://narrify-public.s3.eu-central-1.amazonaws.com/sample.pdf';

export async function POST({request}) {
    try {
        const body = await request.text();
        const stripeSignature = request.headers.get('stripe-signature') || '';

        const stripeEvent = stripe.webhooks.constructEvent(
            body,
            stripeSignature,
            STRIPE_WEBHOOK_SECRET
        );

        // @ts-ignore
        const customerEmail = stripeEvent.data.object.customer_details.email;
        // @ts-ignore
        const customerName = stripeEvent.data.object.customer_details.name;
        
        const response = await fetch(PDF_GUIDE_URL);
        const pdfBuffer = await response.arrayBuffer();
        const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');
        console.log('PDF convertido para Base64. Primeiros 50 e últimos 50 caracteres para verificação:');
        console.log('Início Base64:', pdfBase64.substring(0, 50));
        console.log('Fim Base64:', pdfBase64.substring(pdfBase64.length - 50));
   
        const message = {
            to: customerEmail,
            from: 'tetigo2@gmail.com',
            subject: 'Purchase Confirmation - Complete Spain Relocation Guide',
            html: `
                <h1>Thank you for your purchase!</h1>
                <p>Dear ${customerName},</p>
                <p>We appreciate your purchase of the <strong> Complete Spain Relocation Guide</strong></p>
                <p>We are excited to help you with your relocation journey to Spain. Your guide is designed to provide you with all the essential information and resources you need to make your move as smooth as possible.</p>   
                <p>You will find your ebook attached to this email. Please download and save it for future reference.</p>
                <p>If you have any questions or need further assistance, feel free to contact us at <a href="mailto:tetigo@gmail.com"></a></p>
                <p>Best regards,<br/> Agencia Prodev</p>
                `,
            attachments: [
                {
                    content: pdfBase64,
                    filename: 'Digital Ebook - Spain Relocation.pdf',
                    type: 'application/pdf',
                    disposition: 'attachment'
                }
            ],
        };

        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: testAccount.smtp.host,
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure, // true para porta 465, false para outras
            auth: {
                user: testAccount.user, // Username do Ethereal
                pass: testAccount.pass, // Senha do Ethereal
            },
        });

        let mailOptions = {...message,};

        try {
            let info = await transporter.sendMail(mailOptions);
            console.log('Email enviado para Ethereal! ID da Mensagem: %s', info.messageId);
            console.log('URL de Pré-visualização do Email: %s', nodemailer.getTestMessageUrl(info));
        } catch (error) {
            console.error('Erro ao enviar email com Ethereal:', error);
        }

        return json({
            response: 'Email sent',
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return json({ error: 'Failed to send email' }, { status: 500 });
    }
}