import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'disenowebgrupo1@gmail.com',
        pass: 'nnjx nfje euim kjci',
    },
});

export const sendVerificationEmail = async (email, token) => {
    const verificationLink = `http://localhost:4000/api/verify/${token}`;
    const mailOptions = {
        from: 'disenowebgrupo1@gmail.com',
        to: email,
        subject: 'Account Verification',
        html: `<p>Please verify your account by clicking the link: <a href="${verificationLink}">${verificationLink}</a></p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
