// server.js - Node.js Express server for Bluestock password reset

const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting for password reset endpoint
const passwordResetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 password reset requests per windowMs
    message: {
        error: 'Too many password reset attempts. Please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// In-memory storage for reset tokens (use database in production)
const resetTokens = new Map();

// Email transporter configuration
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
};

// Validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Generate secure reset token
const generateResetToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Password reset endpoint
app.post('/api/forgot-password', passwordResetLimiter, async (req, res) => {
    try {
        const { email } = req.body;

        // Validate input
        if (!email || !isValidEmail(email)) {
            return res.status(400).json({
                error: 'Please provide a valid email address.',
            });
        }

        // Generate reset token
        const resetToken = generateResetToken();
        const expirationTime = Date.now() + 3600000; // 1 hour from now

        // Store token (in production, store in database)
        resetTokens.set(resetToken, {
            email: email.toLowerCase(),
            expires: expirationTime,
            created: Date.now(),
        });

        // Create reset URL
        const resetUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

        // Email content
        const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset - Bluestock</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .logo { font-size: 24px; font-weight: bold; color: #6366f1; }
                    .content { background: #f8f9fa; padding: 30px; border-radius: 8px; }
                    .button { display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">🔷 BLUESTOCK</div>
                    </div>
                    <div class="content">
                        <h2>Password Reset Request</h2>
                        <p>Hello,</p>
                        <p>We received a request to reset your password for your Bluestock account.</p>
                        <p>Click the button below to reset your password:</p>
                        <a href="${resetUrl}" class="button">Reset Password</a>
                        <p>If the button doesn't work, copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #6366f1;">${resetUrl}</p>
                        <p><strong>This link will expire in 1 hour.</strong></p>
                        <p>If you didn't request this password reset, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>© 2025 Bluestock. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Send email
        const transporter = createTransporter();
        
        await transporter.sendMail({
            from: `"Bluestock" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Password Reset Request - Bluestock',
            html: emailHtml,
        });

        console.log(`Password reset email sent to: ${email}`);

        res.json({
            success: true,
            message: 'Password reset link has been sent to your email address.',
        });

    } catch (error) {
        console.error('Password reset error:', error);
        
        res.status(500).json({
            error: 'An error occurred while processing your request. Please try again later.',
        });
    }
});

// Verify reset token endpoint
app.get('/api/verify-token/:token', (req, res) => {
    const { token } = req.params;
    
    const tokenData = resetTokens.get(token);
    
    if (!tokenData) {
        return res.status(400).json({
            error: 'Invalid or expired reset token.',
        });
    }
    
    if (Date.now() > tokenData.expires) {
        resetTokens.delete(token);
        return res.status(400).json({
            error: 'Reset token has expired.',
        });
    }
    
    res.json({
        success: true,
        email: tokenData.email,
    });
});

// Reset password endpoint
app.post('/api/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        if (!token || !newPassword) {
            return res.status(400).json({
                error: 'Token and new password are required.',
            });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters long.',
            });
        }
        
        const tokenData = resetTokens.get(token);
        
        if (!tokenData) {
            return res.status(400).json({
                error: 'Invalid or expired reset token.',
            });
        }
        
        if (Date.now() > tokenData.expires) {
            resetTokens.delete(token);
            return res.status(400).json({
                error: 'Reset token has expired.',
            });
        }
        
        // Here you would update the user's password in your database
        // For this example, we'll just simulate the process
        console.log(`Password reset for user: ${tokenData.email}`);
        
        // Remove the used token
        resetTokens.delete(token);
        
        res.json({
            success: true,
            message: 'Password has been reset successfully.',
        });
        
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({
            error: 'An error occurred while resetting your password.',
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Clean up expired tokens periodically
setInterval(() => {
    const now = Date.now();
    for (const [token, data] of resetTokens.entries()) {
        if (now > data.expires) {
            resetTokens.delete(token);
        }
    }
}, 600000); // Clean up every 10 minutes

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        error: 'Internal server error',
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Bluestock server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;