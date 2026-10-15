const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

// POST - Send contact message via email
router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Check required fields
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // If SMTP password is provided, send real email via Nodemailer
        if (process.env.SMTP_PASS) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.SMTP_USER || "mr.shariq010@gmail.com",
                    pass: process.env.SMTP_PASS
                }
            });

            await transporter.sendMail({
                from: `"${name}" <${process.env.SMTP_USER || "mr.shariq010@gmail.com"}>`,
                replyTo: email,
                to: "mr.shariq010@gmail.com",
                subject: `Portfolio Contact: ${subject}`,
                text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
                html: `
                    <h3>New Message from Portfolio Contact Form</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message.replace(/\n/g, '<br/>')}</p>
                `
            });
            console.log(`[Email] Successfully delivered email from ${email} to mr.shariq010@gmail.com`);
        } else {
            console.log(`[Contact Form Received] Target: mr.shariq010@gmail.com`);
            console.log(`From: ${name} <${email}>`);
            console.log(`Subject: ${subject}`);
            console.log(`Message: ${message}`);
        }

        return res.status(200).json({
            success: true,
            message: "Message sent successfully to mr.shariq010@gmail.com ✅"
        });

    } catch (error) {
        console.error("Email send error:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to send email."
        });
    }
});

module.exports = router;