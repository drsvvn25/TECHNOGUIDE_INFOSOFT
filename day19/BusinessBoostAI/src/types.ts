export type ViewType = "Landing" | "Auth" | "Home" | "AI" | "Bills" | "CRM" | "Settings";

export interface Customer {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Lead" | "Inactive";
  avatar: string;
  phone?: string;
  interactionsCount?: number;
  totalSpent?: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  amount: number;
}

export interface ActivityLog {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  type: "ai" | "invoice" | "crm" | "alert";
  iconName: string;
}

export interface UserProfile {
  name: string;
  email: string;
  plan: "Pro Plan Member" | "Free Tier User";
  avatar: string;
  creditsUsed: number;
  creditsLimit: number;
}
