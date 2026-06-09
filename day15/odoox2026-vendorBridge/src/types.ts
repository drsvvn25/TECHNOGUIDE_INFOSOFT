export interface Vendor {
  id: string;
  name: string;
  code: string;
  category: string;
  gstNumber: string;
  contactName: string;
  contactEmail: string;
  status: 'active' | 'inactive' | 'blacklisted';
  rating: number;
}

export interface PurchaseOrder {
  id: string;
  vendorName: string;
  vendorCode: string;
  amount: number;
  status: 'Fulfilled' | 'In Transit' | 'Processing' | 'Delayed';
  date: string;
}

export interface ApprovalAction {
  id: string;
  title: string;
  vendorName: string;
  amount: number;
  requestedBy: string;
  avatarUrl: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface LineItem {
  id: string;
  name: string;
  description: string;
  qty: number;
  unit: string;
  unitPrice?: number;
  discount?: number;
}

export interface RFQ {
  id: string;
  title: string;
  description: string;
  status: string;
  dateCreated: string;
  deadline: string;
  currency: string;
  lineItems: LineItem[];
  assignedVendors: string[]; // Vendor IDs
  attachments: { name: string; size: string }[];
}

export interface Quotation {
  id: string;
  rfqId: string;
  vendorId: string;
  vendorName: string;
  rating: number;
  totalValue: number;
  deliveryDays: string;
  lineItems: {
    name: string;
    sku: string;
    hsn: string;
    qty: number;
    unit: string;
    unitPrice: number;
    discountPercent: number;
  }[];
  cgstPercent: number;
  sgstPercent: number;
  budgetCap: number;
}
