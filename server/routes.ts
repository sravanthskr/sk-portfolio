import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, subject, message } = req.body;
      
      // Validate required fields
      if (!firstName || !lastName || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: "All fields are required" 
        });
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid email format" 
        });
      }
      
      // For now, we'll just log the contact form submission
      // In a real application, you would send an email here using a service like SendGrid, Mailgun, etc.
      console.log("📧 Contact form submission:", {
        from: `${firstName} ${lastName} <${email}>`,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString()
      });
      
      // Store the contact submission (optional)
      try {
        await storage.addContactSubmission({
          firstName,
          lastName,
          email,
          subject,
          message,
          timestamp: new Date().toISOString()
        });
      } catch (storageError) {
        console.warn("Failed to store contact submission:", storageError);
      }
      
      // Return success response
      res.json({ 
        success: true, 
        message: "Your message has been sent successfully! I'll get back to you soon." 
      });
      
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Sorry, there was an error sending your message. Please try again or email me directly." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
