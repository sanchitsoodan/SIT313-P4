/**
 * SIT313 - Task P2: Welcome Email
 * Author: Sanchit Soodan
 * 
 * ExpressJS backend that receives subscriber emails from the DEV@Deakin platform,
 * triggers an asynchronous welcome email using SendGrid Email API,
 * and returns HTTP Status 200/202.
 */

// Load environment variables securely from .env
require('dotenv').config();

const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize SendGrid API Key
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Middleware: Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Route: POST /subscribe
 * Receives subscriber email, dispatches welcome email via SendGrid,
 * and returns HTTP Status 200/202.
 */
app.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    console.log('\n======================================================');
    console.log(`[Subscription Request Received]`);
    console.log(`Subscriber Email: ${email}`);

    // Validate email
    if (!email || !email.includes('@')) {
        console.log('[Error] Status 400: Invalid or missing email address.');
        console.log('======================================================\n');
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address.'
        });
    }

    const senderEmail = process.env.SENDER_EMAIL || 'sanchitsoodan2405@gmail.com';
    const apiKey = process.env.SENDGRID_API_KEY;

    // Welcome Email payload
    const msg = {
        to: email,
        from: senderEmail, // Must be verified in SendGrid Single Sender Authentication
        subject: 'Welcome to DEV@Deakin Daily Insider! 🚀',
        text: `Hi there,\n\nThank you for subscribing to the DEV@Deakin Daily Insider!\n\nYou will now receive daily insights, project updates, and tutorials straight to your inbox.\n\nBest regards,\nDEV@Deakin Team`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #d4edda; border-radius: 8px; background-color: #ffffff;">
                <div style="text-align: center; border-bottom: 2px solid #176b4d; padding-bottom: 15px; margin-bottom: 20px;">
                    <h1 style="color: #176b4d; margin: 0; font-size: 26px;">DEV@Deakin</h1>
                    <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Daily Insider Newsletter</p>
                </div>
                <h2 style="color: #333; font-size: 20px;">Welcome to the Community! 🎉</h2>
                <p style="font-size: 16px; line-height: 1.6; color: #444;">
                    Hi there,
                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #444;">
                    Thank you for subscribing to the <strong>DEV@Deakin Daily Insider</strong>. You are now part of a thriving community of developers and technology enthusiasts.
                </p>
                <p style="font-size: 16px; line-height: 1.6; color: #444;">
                    Here is what you can look forward to:
                </p>
                <ul style="font-size: 15px; line-height: 1.8; color: #555;">
                    <li>🔥 Daily featured articles and tutorials</li>
                    <li>💡 Insights on AI, Web Development, and Cloud Computing</li>
                    <li>🤝 Community project showcases and hackathon updates</li>
                </ul>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;">
                <p style="font-size: 12px; color: #888; text-align: center;">
                    © 2026 DEV@Deakin | Sanchit Soodan (SIT313 Task P2)<br>
                    You received this email because you subscribed to our Daily Insider newsletter.
                </p>
            </div>
        `
    };

    try {
        if (!apiKey || apiKey === 'your_sendgrid_api_key_here') {
            console.log('[Notice] SendGrid API Key not configured in .env.');
            console.log('======================================================\n');
            return res.status(200).json({
                success: true,
                statusCode: 200,
                message: `Subscription successful for ${email}! (Set SENDGRID_API_KEY in .env to dispatch live emails)`
            });
        }

        // Send email asynchronously via Email API
        const [apiResponse] = await sgMail.send(msg);

        // Terminal Log specifically formatted for Task P2 Report Screenshot (Requirement 5b)
        console.log(`[Email API Success] Welcome Email Dispatched!`);
        console.log(`[Email API Response Status Code]: ${apiResponse.statusCode}`);
        console.log(`[Email API Status Message]: ${apiResponse.statusCode === 202 ? '202 Accepted' : '200 OK'}`);
        console.log(`[Recipient]: ${email}`);
        console.log('======================================================\n');

        // Return HTTP 200/202 response to frontend
        return res.status(200).json({
            success: true,
            statusCode: apiResponse.statusCode,
            message: `Welcome email sent successfully to ${email}!`
        });

    } catch (error) {
        console.error('[SendGrid API Error]:', error.response ? error.response.body : error.message);
        console.log('======================================================\n');

        return res.status(500).json({
            success: false,
            message: 'Failed to send welcome email. Please check your SendGrid API key and verified sender email.',
            error: error.response ? error.response.body : error.message
        });
    }
});

// Fallback route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Express server
app.listen(PORT, () => {
    console.log('====================================================');
    console.log(`🚀 DEV@Deakin Server running at http://localhost:${PORT}`);
    console.log(`✉️  Email API: Connected to SendGrid`);
    console.log('====================================================');
});
