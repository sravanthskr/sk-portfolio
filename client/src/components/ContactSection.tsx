import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@iconify/react";
import { useContactContent, usePersonalInfo } from "@/contexts/ContentContext";
import { useState } from "react";

export default function ContactSection() {
  const contactContent = useContactContent();
  const personalInfo = usePersonalInfo();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear status when user starts typing again
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitMessage("");
      setShowThankYou(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      setSubmitMessage("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("message", formData.message);
      formPayload.append("_gotcha", "");
      formPayload.append("_subject", "New Portfolio Contact Form Submission");

      const response = await fetch("https://getform.io/f/adrglnka", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formPayload,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok || response.status === 302) {
        setSubmitStatus("success");
        setSubmitMessage(
          "Thanks for contacting! Your message has been sent successfully. I'll get back to you soon.",
        );
        setShowThankYou(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(
          "Something went wrong while sending your message. Please try again or email me directly.",
        );
      }
    } catch (error: any) {
      clearTimeout(timeoutId);
      setSubmitStatus("error");
      if (error.name === "AbortError") {
        setSubmitMessage(
          "Request timed out. Please check your connection and try again.",
        );
      } else if (error.name === "TypeError" || !navigator.onLine) {
        setSubmitMessage(
          "Unable to connect to the email service. Please check your internet connection and try again.",
        );
      } else {
        setSubmitMessage(
          "Something went wrong while sending your message. Please try again or email me directly.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen-safe section-spacing pt-20 lg:pt-24 overflow-x-clip">
      <div className="mx-auto w-full max-w-screen-md px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-fluid-4xl lg:text-fluid-5xl font-light mb-4 sm:mb-6">
            {contactContent.title}
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary rounded-full" />
          <p className="text-fluid-lg lg:text-fluid-xl text-muted-foreground mt-4 sm:mt-6 max-w-2xl">
            {contactContent.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 min-w-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-4 sm:p-6 md:p-8 h-full bg-gradient-to-br from-primary/5 to-transparent border-primary/20 overflow-hidden min-w-0">
              <h3 className="text-2xl font-semibold mb-6">
                {contactContent.emailCard.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {contactContent.description}
              </p>

              <div className="space-y-4 mb-8">
                {contactContent.bulletPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">{point.text}</span>
                  </div>
                ))}
              </div>

              {/* Email Me Card */}
              <Card
                className="p-4 sm:p-6 hover-elevate cursor-pointer transition-all"
                onClick={() =>
                  window.open(`mailto:${personalInfo.email}`, "_blank")
                }
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon icon="lucide:mail" className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Email Me</h4>
                    <p className="text-sm text-muted-foreground">
                      {personalInfo.email}
                    </p>
                  </div>
                  <Icon
                    icon="lucide:arrow-right"
                    className="w-4 h-4 text-muted-foreground"
                  />
                </div>
              </Card>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-4 sm:p-6 md:p-8 h-full overflow-hidden min-w-0">
              <h3 className="text-xl font-semibold mb-6">
                {contactContent.form.title}
              </h3>

              <form
                className="space-y-6 max-w-full min-w-0"
                onSubmit={handleSubmit}
                action="https://getform.io/f/adrglnka"
                method="POST"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      data-testid="input-name"
                      className="w-full max-w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    data-testid="input-email"
                    className="w-full max-w-full"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    data-testid="input-message"
                    className="w-full max-w-full"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="_gotcha"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {showThankYou && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg text-center"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon
                        icon="lucide:check-circle"
                        className="w-8 h-8 text-primary"
                      />
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-primary">
                      Thanks for contacting!
                    </h4>
                    <p className="text-muted-foreground">
                      Your message has been sent successfully. I'll get back to
                      you soon.
                    </p>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200"
                  >
                    <Icon
                      icon="lucide:alert-circle"
                      className="w-5 h-5 flex-shrink-0"
                    />
                    <p className="text-sm">{submitMessage}</p>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || showThankYou}
                  data-testid="button-send-message"
                >
                  {isSubmitting ? (
                    <>
                      <Icon
                        icon="lucide:loader-2"
                        className="w-4 h-4 mr-2 animate-spin"
                      />
                      Sending...
                    </>
                  ) : showThankYou ? (
                    <>
                      <Icon
                        icon="lucide:check-circle"
                        className="w-4 h-4 mr-2"
                      />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Icon icon="lucide:send" className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
