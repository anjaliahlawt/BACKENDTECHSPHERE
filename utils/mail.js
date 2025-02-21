import transporter from "../config/nodeMailer.js";

const sendMail = async ({ email, subject, text, html }) => {
    if (!email) {
        console.log("Email is required");
        return [false, "Invalid email"];
    }
    if (!html && !text) {
        console.log("HTML or text content is required");
        return [false, "Invalid email data"];
    }

    try {
        const info = await transporter.sendMail({
            from: `"Task Tracker" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: subject,
            text: text,
            html: html,
        });
        console.log("Message sent: %s", info.messageId);
        return [true];
    } catch (err) {
        console.log("Message not sent to email:", email);
        console.log("Error:", err.message);
        return [false, err.message];
    }
};

export default sendMail;
