import { Vendor, PurchaseOrder, ApprovalAction, RFQ, Quotation } from './types';

export const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'V1',
    name: 'NexGen Solutions Ltd.',
    code: 'NS',
    category: 'IT Services',
    gstNumber: 'GST-22-AA9001-X',
    contactName: 'Sarah Connor',
    contactEmail: 's.connor@nexgen.com',
    status: 'active',
    rating: 4.2,
  },
  {
    id: 'V2',
    name: 'Global Logistics Co.',
    code: 'GL',
    category: 'Logistics',
    gstNumber: 'GST-08-BB1234-P',
    contactName: 'David Chen',
    contactEmail: 'd.chen@global-log.io',
    status: 'inactive',
    rating: 3.8,
  },
  {
    id: 'V3',
    name: 'Titan Metals Corp.',
    code: 'TM',
    category: 'Raw Materials',
    gstNumber: 'GST-19-CC5566-F',
    contactName: 'Marcus Aurelius',
    contactEmail: 'm.aurelius@titan.com',
    status: 'blacklisted',
    rating: 1.2,
  },
  {
    id: 'V4',
    name: 'Swift Plastic Parts',
    code: 'SP',
    category: 'Hardware',
    gstNumber: 'GST-33-DD8877-K',
    contactName: 'Elena Fisher',
    contactEmail: 'e.fisher@swiftparts.biz',
    status: 'active',
    rating: 4.9,
  },
  {
    id: 'V5',
    name: 'Intelisense Corp',
    code: 'IC',
    category: 'IT Services',
    gstNumber: 'GST-45-EE9988-Y',
    contactName: 'Sarah Jenkins',
    contactEmail: 's.jenkins@intelisense.com',
    status: 'active',
    rating: 4.5,
  },
  {
    id: 'V6',
    name: 'Blue Peak Mfg',
    code: 'BP',
    category: 'Hardware',
    gstNumber: 'GST-12-FF4455-Q',
    contactName: 'Robert Vance',
    contactEmail: 'r.vance@bluepeak.com',
    status: 'active',
    rating: 4.0,
  },
  {
    id: 'V7',
    name: 'Vortex Raw',
    code: 'VR',
    category: 'Raw Materials',
    gstNumber: 'GST-27-GG6677-M',
    contactName: 'Victor Reznov',
    contactEmail: 'v.reznov@vortex.com',
    status: 'inactive',
    rating: 3.2,
  }
];

export const INITIAL_PURCHASE_ORDERS: PurchaseOrder[] = [
  {
    id: 'PO-2024-0812',
    vendorName: 'Stellar Logistics',
    vendorCode: 'SL',
    amount: 12450.00,
    status: 'Fulfilled',
    date: '2024-05-18',
  },
  {
    id: 'PO-2024-0811',
    vendorName: 'Quantum Tech',
    vendorCode: 'QT',
    amount: 5200.00,
    status: 'In Transit',
    date: '2024-05-20',
  },
  {
    id: 'PO-2024-0809',
    vendorName: 'Nova Systems',
    vendorCode: 'NS',
    amount: 28150.00,
    status: 'Processing',
    date: '2024-05-22',
  },
  {
    id: 'PO-2024-0805',
    vendorName: 'Blue Peak Mfg',
    vendorCode: 'BP',
    amount: 1200.00,
    status: 'Fulfilled',
    date: '2024-05-24',
  },
  {
    id: 'PO-2024-0802',
    vendorName: 'Vortex Raw',
    vendorCode: 'VR',
    amount: 9800.00,
    status: 'Delayed',
    date: '2024-05-26',
  }
];

export const INITIAL_APPROVALS: ApprovalAction[] = [
  {
    id: 'APP-01',
    title: 'Infrastructure Upgrade',
    vendorName: 'Intelisense Corp',
    amount: 14200,
    requestedBy: 'Sarah J.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi3yRBa9tIMbfx8-Wm9rJdQQFp5HL-TfVVM7mffyqfQ0SioiHj5Z_ZXwPr4vH-0dpOgLZS9HHHu4BbgzacGyau85NowWcFYp0MNqVjPgdsf7TcM6VoZk73uniSvbiq7JshFnjO9TBGqA2BXWD64Ao3VLyw2rC5o5TC0GXVF9GihPorod4zvIaW08xOaT1P36N3MxKDR5-f2J0ee2CAjh3P-Cn4i1CevUWMOtm56vJDLdIa648LVBjpnEwB9dazKsqENb35yttqjglE',
    status: 'pending'
  },
  {
    id: 'APP-02',
    title: 'Raw Materials Q3',
    vendorName: 'Global Ores Ltd',
    amount: 8400,
    requestedBy: 'Mark R.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6AUxnfgGQ0HC6TFBxEQjn4qoEY3oJE-7l4WXfd-5qj9jhgaAS2HQ-Be9c0Ex1yaQyIUmqNGxRHuhRc8GOw8Auti1AAi0f0B4Iz97q4OhCRo_MC0fmla7oBtcJUNRqd3m2pr5Bjn5fClokPWxIaWKhjEHdpUynZwxGyNeJ2qFJxCuWjk2OG5p0AO8q9JPSKFyrKXppFga9-Uvs4v__dOSHcWbdxfqnNkjZwkMutePkC2HTgljfnvB3RQLEDI_-9iLz4SixWB_jkff0',
    status: 'pending'
  }
];

export const INITIAL_RFQS: RFQ[] = [
  {
    id: 'RFQ-001',
    title: 'Q3 Office Hardware Supply Refurbishment',
    description: 'We are procuring essential hardware upgrades for our research wing containing high-performance laptops and responsive displays.',
    status: 'Published',
    dateCreated: '2024-05-15',
    deadline: '2024-06-30',
    currency: 'USD - United States Dollar',
    lineItems: [
      { id: 'LI-1', name: 'ThinkPad X1 Carbon Gen 11', description: 'i7-1355U, 16GB RAM, 512GB SSD', qty: 25, unit: 'Units' },
      { id: 'LI-2', name: 'Dell UltraSharp 27" 4K', description: 'U2723QE with USB-C Hub support', qty: 10, unit: 'Units' },
      { id: 'LI-3', name: 'Logitech MX Master 3S', description: 'Graphite silent click mouse model', qty: 10, unit: 'Units' }
    ],
    assignedVendors: ['V1', 'V4', 'V5'],
    attachments: [
      { name: 'site_plan_A101.pdf', size: '2.4 MB' },
      { name: 'technical_requirements.xlsx', size: '1.2 MB' }
    ]
  }
];

export const MOCK_QUOTATIONS: Quotation[] = [
  {
    id: 'QTN-2024-0892',
    rfqId: 'RFQ-001',
    vendorId: 'V1',
    vendorName: 'TechSource Solutions',
    rating: 4.8,
    totalValue: 42350.00,
    deliveryDays: '5-7 Days',
    lineItems: [
      {
        name: 'ThinkPad X1 Carbon Gen 11',
        sku: 'IND-HP-001',
        hsn: '8413',
        qty: 25,
        unit: 'Units',
        unitPrice: 1450.00,
        discountPercent: 0,
      },
      {
        name: 'Dell UltraSharp 27" 4K',
        sku: 'IND-CV-992',
        hsn: '8481',
        qty: 10,
        unit: 'Units',
        unitPrice: 510.00,
        discountPercent: -5,
      },
      {
        name: 'Logitech MX Master 3S',
        sku: 'IND-SK-112',
        hsn: '4016',
        qty: 10,
        unit: 'Units',
        unitPrice: 100.00,
        discountPercent: 0,
      }
    ],
    cgstPercent: 9,
    sgstPercent: 9,
    budgetCap: 45000.00
  },
  {
    id: 'QTN-2024-0893',
    rfqId: 'RFQ-001',
    vendorId: 'V4',
    vendorName: 'Global Infra Ltd',
    rating: 4.2,
    totalValue: 38900.00,
    deliveryDays: '12-14 Days',
    lineItems: [
      {
        name: 'ThinkPad X1 Carbon Gen 11',
        sku: 'IND-HP-001',
        hsn: '8413',
        qty: 25,
        unit: 'Units',
        unitPrice: 1280.00,
        discountPercent: -12,
      },
      {
        name: 'Dell UltraSharp 27" 4K',
        sku: 'IND-CV-992',
        hsn: '8481',
        qty: 10,
        unit: 'Units',
        unitPrice: 590.00,
        discountPercent: 0,
      },
      {
        name: 'Logitech MX Master 3S',
        sku: 'IND-SK-112',
        hsn: '4016',
        qty: 10,
        unit: 'Units',
        unitPrice: 90.00,
        discountPercent: -10,
      }
    ],
    cgstPercent: 9,
    sgstPercent: 9,
    budgetCap: 45000.00
  },
  {
    id: 'QTN-2024-0894',
    rfqId: 'RFQ-001',
    vendorId: 'V5',
    vendorName: 'Precision Systems',
    rating: 0, // N/A
    totalValue: 40120.00,
    deliveryDays: '8-10 Days',
    lineItems: [
      {
        name: 'ThinkPad X1 Carbon Gen 11',
        sku: 'IND-HP-001',
        hsn: '8413',
        qty: 25,
        unit: 'Units',
        unitPrice: 1350.00,
        discountPercent: -7,
      },
      {
        name: 'Dell UltraSharp 27" 4K',
        sku: 'IND-CV-992',
        hsn: '8481',
        qty: 10,
        unit: 'Units',
        unitPrice: 540.00,
        discountPercent: 0,
      },
      {
        name: 'Logitech MX Master 3S',
        sku: 'IND-SK-112',
        hsn: '4016',
        qty: 10,
        unit: 'Units',
        unitPrice: 97.00,
        discountPercent: -3,
      }
    ],
    cgstPercent: 9,
    sgstPercent: 9,
    budgetCap: 45000.00
  }
];
