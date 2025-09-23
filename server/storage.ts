// Note: This file is kept for compatibility but the portfolio
// will use Firebase for all data storage and authentication.
// This storage is only used if needed for development purposes.

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  skills: string[];
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    url?: string;
  }>;
}

export interface ContactSubmission {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

// Simple in-memory storage for development (Firebase will handle production data)
export class DevStorage {
  private data: PortfolioData;
  private contactSubmissions: ContactSubmission[] = [];

  constructor() {
    this.data = {
      name: "Developer",
      title: "Software Engineer",
      bio: "Passionate about creating amazing web experiences",
      skills: ["React", "TypeScript", "Firebase"],
      projects: []
    };
  }

  async getPortfolioData(): Promise<PortfolioData> {
    return this.data;
  }

  async updatePortfolioData(data: Partial<PortfolioData>): Promise<PortfolioData> {
    this.data = { ...this.data, ...data };
    return this.data;
  }

  async addContactSubmission(submission: ContactSubmission): Promise<void> {
    this.contactSubmissions.push(submission);
    console.log(`📧 Contact submission stored. Total: ${this.contactSubmissions.length}`);
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return [...this.contactSubmissions];
  }
}

export const storage = new DevStorage();

