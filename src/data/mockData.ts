import { Lead, Quotation, Deal, Order, Payment, ActivityEvent, DealPriority } from '../types';

export const DEMO_DATE = '2026-10-19T23:59:59.000Z';
export const DEMO_DATE_STR = '2026-10-19';

// Deterministic seed data
export const INITIAL_LEADS: Lead[] = [
  // October 2026 Leads (Active Period)
  {
    id: 'L-209610',
    clientName: 'Aditya Birla Chemicals Ltd',
    companyName: 'Aditya Birla Chemicals',
    email: 'aditya.procure@birla-chem.in',
    phone: '+91 98201 44321',
    source: 'Google Ads',
    status: 'Qualified',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    serviceInterest: 'Private Limited Company',
    createdAt: '2026-10-16T10:15:00.000Z',
    updatedAt: '2026-10-16T12:14:10.847Z'
  },
  {
    id: 'L-209611',
    clientName: 'Rahul Mehra',
    companyName: 'Nexus FinTech Labs',
    email: 'rahul.m@nexusfintech.co',
    phone: '+91 98112 90812',
    source: 'Website',
    status: 'Converted',
    assignedTo: 'Sneha Choudhary',
    department: 'Sales',
    serviceInterest: 'Private Limited Company',
    createdAt: '2026-10-14T09:30:00.000Z',
    updatedAt: '2026-10-16T11:53:02.431Z'
  },
  {
    id: 'L-209612',
    clientName: 'Dr. Priya Sharma',
    companyName: 'Arogya Nutra Naturals',
    email: 'drpriya@arogyanutra.org',
    phone: '+91 97171 23456',
    source: 'Google Ads',
    status: 'Converted',
    assignedTo: 'Sneha Choudhary',
    department: 'Sales',
    serviceInterest: 'FSSAI License',
    createdAt: '2026-10-11T14:20:00.000Z',
    updatedAt: '2026-10-15T16:00:00.000Z'
  },
  {
    id: 'L-209613',
    clientName: 'Vikramaditya Rao',
    companyName: 'Indus Logistics Solutions LLP',
    email: 'vikram@induslogistics.in',
    phone: '+91 99400 88765',
    source: 'Website',
    status: 'Qualified',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    serviceInterest: 'LLP Registration',
    createdAt: '2026-10-12T11:00:00.000Z',
    updatedAt: '2026-10-14T10:15:00.000Z'
  },
  {
    id: 'L-209614',
    clientName: 'Kavita Sundaram',
    companyName: 'Sundaram Herbal Products',
    email: 'kavita@sundaramherbals.com',
    phone: '+91 94440 12890',
    source: 'Just Dial',
    status: 'Unqualified',
    unqualifiedReason: 'Low budget / not registered in India',
    assignedTo: 'Tannu Kumari',
    department: 'Sales',
    serviceInterest: 'Trademark',
    createdAt: '2026-10-10T16:45:00.000Z',
    updatedAt: '2026-10-11T09:20:00.000Z'
  },
  {
    id: 'L-209615',
    clientName: 'Amitabh Joshi',
    companyName: 'Joshi Automations Pvt Ltd',
    email: 'amitabh@joshiauto.in',
    phone: '+91 98220 55432',
    source: 'Google Ads',
    status: 'Converted',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    serviceInterest: 'Private Limited Company',
    createdAt: '2026-10-08T08:15:00.000Z',
    updatedAt: '2026-10-12T14:30:00.000Z'
  },
  {
    id: 'L-209616',
    clientName: 'Sunil Kulkarni',
    companyName: 'Sahyadri Agritech',
    email: 'sunil@sahyadriagri.co.in',
    phone: '+91 98500 11223',
    source: 'Google Ads',
    status: 'Qualified',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    serviceInterest: 'Startup India Registration',
    createdAt: '2026-10-07T13:40:00.000Z',
    updatedAt: '2026-10-09T17:10:00.000Z'
  },
  {
    id: 'L-209617',
    clientName: 'Rohan Deshmukh',
    companyName: 'Apex Cloud Systems',
    email: 'rohan@apexcloud.io',
    phone: '+91 99201 66778',
    source: 'Website',
    status: 'Converted',
    assignedTo: 'Tannu Kumari',
    department: 'Sales',
    serviceInterest: 'ISO Certification',
    createdAt: '2026-10-06T15:10:00.000Z',
    updatedAt: '2026-10-10T11:45:00.000Z'
  },
  {
    id: 'L-209618',
    clientName: 'Meenakshi Iyer',
    companyName: 'Vedic Threads Handloom',
    email: 'meenakshi@vedicthreads.in',
    phone: '+91 98840 99887',
    source: 'Google Ads',
    status: 'Unqualified',
    unqualifiedReason: 'Did not respond after 4 attempts',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    serviceInterest: 'Trademark',
    createdAt: '2026-10-05T12:00:00.000Z',
    updatedAt: '2026-10-07T18:00:00.000Z'
  },
  {
    id: 'L-209619',
    clientName: 'Harsh Vardhan Singh',
    companyName: 'Rajasthan Solar Ventures',
    email: 'harsh@rajsolar.org',
    phone: '+91 94140 33445',
    source: 'Google Ads',
    status: 'Converted',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    serviceInterest: 'Private Limited Company',
    createdAt: '2026-10-04T10:00:00.000Z',
    updatedAt: '2026-10-08T15:00:00.000Z'
  },
  {
    id: 'L-209620',
    clientName: 'Tanvi Agarwal',
    companyName: 'GreenRoots Organics',
    email: 'tanvi@greenroots.in',
    phone: '+91 98300 77665',
    source: 'Website',
    status: 'Qualified',
    assignedTo: 'Sneha Choudhary',
    department: 'Sales',
    serviceInterest: 'FSSAI License',
    createdAt: '2026-10-03T11:30:00.000Z',
    updatedAt: '2026-10-06T16:20:00.000Z'
  },
  {
    id: 'L-209621',
    clientName: 'Deepak Chawla',
    companyName: 'Punjab Food Delights',
    email: 'deepak@punjabfoods.net',
    phone: '+91 98140 22334',
    source: 'Google Ads',
    status: 'Qualified',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    serviceInterest: 'FSSAI License',
    createdAt: '2026-10-02T14:15:00.000Z',
    updatedAt: '2026-10-05T09:30:00.000Z'
  },
  {
    id: 'L-209622',
    clientName: 'Naveen Kumar',
    companyName: 'Omni Retailers LLP',
    email: 'naveen@omniretail.in',
    phone: '+91 98800 44556',
    source: 'Website',
    status: 'Converted',
    assignedTo: 'Nancy Singh',
    department: 'Sales',
    serviceInterest: 'LLP Registration',
    createdAt: '2026-10-01T09:45:00.000Z',
    updatedAt: '2026-10-04T12:00:00.000Z'
  }
];

// Helper to deterministically populate remaining leads to match 91 leads in Oct 2026 + historical 6 months
const sources: Array<Lead['source']> = ['Google Ads', 'Website', 'Just Dial', 'Referral', 'Other'];
const statuses: Array<Lead['status']> = ['Qualified', 'Unqualified', 'New', 'Converted'];
const salesOwners = ['Nancy Singh', 'Sneha Choudhary', 'Tannu Kumari'];
const servicesList = [
  'Private Limited Company',
  'LLP Registration',
  'Trademark',
  'Startup India Registration',
  'ISO Certification',
  'FSSAI License',
  'Annual Compliance',
  'GST Filing',
  'General Filing',
  'Website development',
  'One Person Company',
  'DSC & DIN Services'
];

// Generate deterministic records
function generateDeterministicLeads(): Lead[] {
  const result = [...INITIAL_LEADS];
  
  // Create 78 more leads for Oct 1 to Oct 19 to total 91 in current month
  for (let i = 23; i <= 91; i++) {
    const id = `L-2096${i}`;
    const day = 1 + ((i * 7) % 19);
    const hour = 9 + (i % 9);
    const minute = (i * 13) % 60;
    const dateStr = `2026-10-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00.000Z`;
    
    // Distribution matches reference: 42 Qualified, 16 Converted, 49 Unqualified / New
    let status: Lead['status'];
    if (i <= 38) {
      status = 'Converted'; // Total 16 converted
    } else if (i <= 65) {
      status = 'Qualified'; // Total ~42 qualified
    } else if (i <= 82) {
      status = 'Unqualified';
    } else {
      status = 'New';
    }

    const assignedTo = i % 3 === 0 ? 'Nancy Singh' : (i % 3 === 1 ? 'Sneha Choudhary' : 'Tannu Kumari');
    const source = i % 5 === 0 ? 'Google Ads' : (i % 5 === 1 ? 'Website' : (i % 5 === 2 ? 'Google Ads' : (i % 5 === 3 ? 'Just Dial' : 'Other')));
    const srv = servicesList[(i * 3) % servicesList.length];

    result.push({
      id,
      clientName: `Enterprise Client ${i}`,
      companyName: `Apex Corporate Ventures ${i}`,
      email: `contact${i}@apexcorp.in`,
      phone: `+91 98${(10000000 + i * 4927).toString().slice(0, 8)}`,
      source,
      status,
      assignedTo,
      department: 'Sales',
      serviceInterest: srv,
      createdAt: dateStr,
      updatedAt: dateStr
    });
  }

  // Preceding 30 days (Sept 1 to Sept 30, 2026) for comparison calculations: ~58 leads (vs 91 leads is ~+57% increase)
  for (let i = 1; i <= 58; i++) {
    const id = `L-208${String(i).padStart(3, '0')}`;
    const day = 1 + ((i * 11) % 30);
    const dateStr = `2026-09-${String(day).padStart(2, '0')}T10:00:00.000Z`;
    const status = i <= 11 ? 'Converted' : (i <= 36 ? 'Qualified' : 'Unqualified');
    result.push({
      id,
      clientName: `September Client ${i}`,
      companyName: `Global Tech ${i}`,
      email: `sept${i}@globaltech.in`,
      phone: `+91 97${(20000000 + i * 3721).toString().slice(0, 8)}`,
      source: sources[i % sources.length],
      status,
      assignedTo: salesOwners[i % salesOwners.length],
      department: 'Sales',
      serviceInterest: servicesList[i % servicesList.length],
      createdAt: dateStr,
      updatedAt: dateStr
    });
  }

  // Earlier months (May - August 2026) for custom range & 6-month historical depth
  for (let month = 5; month <= 8; month++) {
    for (let i = 1; i <= 45; i++) {
      const id = `L-20${month}${String(i).padStart(3, '0')}`;
      const day = 1 + ((i * 7) % 28);
      const dateStr = `2026-0${month}-${String(day).padStart(2, '0')}T11:00:00.000Z`;
      result.push({
        id,
        clientName: `Historical Client M${month}-${i}`,
        companyName: `Heritage Corp ${month}-${i}`,
        email: `client${month}_${i}@heritagecorp.in`,
        phone: `+91 96${(30000000 + (month * 100 + i) * 1234).toString().slice(0, 8)}`,
        source: sources[(i + month) % sources.length],
        status: i % 4 === 0 ? 'Converted' : (i % 4 === 1 ? 'Qualified' : 'Unqualified'),
        assignedTo: salesOwners[(i + month) % salesOwners.length],
        department: 'Sales',
        serviceInterest: servicesList[(i + month) % servicesList.length],
        createdAt: dateStr,
        updatedAt: dateStr
      });
    }
  }

  return result;
}

export const ALL_LEADS = generateDeterministicLeads();

// Deterministic Quotations
function generateDeterministicQuotations(leads: Lead[]): Quotation[] {
  const quotes: Quotation[] = [
    {
      id: 'Q-10467',
      leadId: 'L-209611',
      leadName: 'Rahul Mehra (Nexus FinTech Labs)',
      dealId: 'D-822',
      serviceCategory: 'Private Limited Company',
      quotedAmount: 18500,
      status: 'Accepted',
      createdAt: '2026-10-16T11:26:07.000Z',
      validUntil: '2026-11-15T23:59:59.000Z',
      createdBy: 'Sneha Choudhary'
    },
    {
      id: 'Q-10466',
      leadId: 'L-209610',
      leadName: 'Aditya Birla Chemicals Ltd',
      dealId: undefined,
      serviceCategory: 'Private Limited Company',
      quotedAmount: 24000,
      status: 'Pending',
      createdAt: '2026-10-16T11:45:50.000Z',
      validUntil: '2026-11-16T23:59:59.000Z',
      createdBy: 'Tannu Kumari'
    },
    {
      id: 'Q-10465',
      leadId: 'L-209612',
      leadName: 'Dr. Priya Sharma (Arogya Nutra)',
      dealId: 'D-821',
      serviceCategory: 'FSSAI License',
      quotedAmount: 15000,
      status: 'Accepted',
      createdAt: '2026-10-15T10:00:00.000Z',
      validUntil: '2026-11-15T23:59:59.000Z',
      createdBy: 'Sneha Choudhary'
    },
    {
      id: 'Q-10464',
      leadId: 'L-209613',
      leadName: 'Vikramaditya Rao (Indus Logistics)',
      dealId: undefined,
      serviceCategory: 'LLP Registration',
      quotedAmount: 12500,
      status: 'Pending',
      createdAt: '2026-10-14T15:30:00.000Z',
      validUntil: '2026-11-14T23:59:59.000Z',
      createdBy: 'Nancy Singh'
    },
    {
      id: 'Q-10463',
      leadId: 'L-209615',
      leadName: 'Amitabh Joshi (Joshi Automations)',
      dealId: 'D-820',
      serviceCategory: 'Private Limited Company',
      quotedAmount: 19500,
      status: 'Accepted',
      createdAt: '2026-10-13T09:20:00.000Z',
      validUntil: '2026-11-13T23:59:59.000Z',
      createdBy: 'Nancy Singh'
    }
  ];

  // Generate quotes matching the screenshot:
  // Quotations created in Oct: 107 (vs 47 in prev 31 days is +127.7%)
  // 56 Private Limited, 16 LLP, 8 Trademark, 5 Startup India, 5 ISO Certification, 2 Penalty, etc.
  let qNum = 10462;
  const octLeads = leads.filter(l => l.createdAt.startsWith('2026-10'));
  
  // Create 102 more quotes in Oct to total 107
  for (let i = 0; i < 102; i++) {
    const lead = octLeads[i % octLeads.length];
    let serviceCategory: string;
    let quotedAmount: number;
    
    if (i < 53) {
      serviceCategory = 'Private Limited Company';
      quotedAmount = 11000 + (i % 6) * 1500;
    } else if (i < 69) {
      serviceCategory = 'LLP Registration';
      quotedAmount = 8000 + (i % 4) * 1200;
    } else if (i < 77) {
      serviceCategory = 'Trademark';
      quotedAmount = 2500 + (i % 3) * 1000;
    } else if (i < 82) {
      serviceCategory = 'Startup India Registration';
      quotedAmount = 4000 + (i % 2) * 800;
    } else if (i < 87) {
      serviceCategory = 'ISO Certification';
      quotedAmount = 7000 + (i % 3) * 1500;
    } else if (i < 93) {
      serviceCategory = 'FSSAI License';
      quotedAmount = 5000 + (i % 2) * 1000;
    } else if (i < 97) {
      serviceCategory = 'Annual Compliance';
      quotedAmount = 14000 + (i % 3) * 2000;
    } else if (i < 99) {
      serviceCategory = 'Penalty';
      quotedAmount = 3000;
    } else {
      serviceCategory = 'General Filing';
      quotedAmount = 4500;
    }

    const day = 1 + ((i * 3) % 19);
    const hour = 10 + (i % 7);
    const dateStr = `2026-10-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:15:00.000Z`;
    
    // Status distribution: ~23 accepted/converted to deals, rest pending or rejected
    let status: Quotation['status'] = 'Pending';
    let dealId: string | undefined = undefined;
    if (i < 20) {
      status = 'Accepted';
      dealId = `D-8${String(19 - i).padStart(2, '0')}`;
    } else if (i % 7 === 0) {
      status = 'Rejected';
    }

    quotes.push({
      id: `Q-${qNum--}`,
      leadId: lead.id,
      leadName: `${lead.clientName} (${lead.companyName})`,
      dealId,
      serviceCategory,
      quotedAmount,
      status,
      createdAt: dateStr,
      validUntil: `2026-11-${String(day).padStart(2, '0')}T23:59:59.000Z`,
      createdBy: lead.assignedTo
    });
  }

  // Preceding 30 days (Sept 2026): 47 quotations
  for (let i = 1; i <= 47; i++) {
    const day = 1 + ((i * 5) % 30);
    quotes.push({
      id: `Q-${9000 + i}`,
      leadId: `L-208${String(1 + (i % 58)).padStart(3, '0')}`,
      leadName: `September Client ${i}`,
      dealId: i <= 14 ? `D-7${String(i).padStart(2, '0')}` : undefined,
      serviceCategory: servicesList[i % servicesList.length],
      quotedAmount: 9000 + (i % 8) * 1500,
      status: i <= 14 ? 'Accepted' : (i % 5 === 0 ? 'Rejected' : 'Pending'),
      createdAt: `2026-09-${String(day).padStart(2, '0')}T11:00:00.000Z`,
      validUntil: `2026-10-${String(day).padStart(2, '0')}T23:59:59.000Z`,
      createdBy: salesOwners[i % salesOwners.length]
    });
  }

  // Historical May-August: 120 quotations
  for (let i = 1; i <= 120; i++) {
    const month = 5 + (i % 4);
    const day = 1 + (i % 28);
    quotes.push({
      id: `Q-${8000 + i}`,
      leadId: `L-20${month}001`,
      leadName: `Historical Client Q${i}`,
      dealId: i % 4 === 0 ? `D-6${String(i).padStart(2, '0')}` : undefined,
      serviceCategory: servicesList[i % servicesList.length],
      quotedAmount: 8500 + (i % 10) * 1000,
      status: i % 4 === 0 ? 'Accepted' : 'Pending',
      createdAt: `2026-0${month}-${String(day).padStart(2, '0')}T10:00:00.000Z`,
      validUntil: `2026-0${month + 1}-${String(day).padStart(2, '0')}T23:59:59.000Z`,
      createdBy: salesOwners[i % salesOwners.length]
    });
  }

  return quotes;
}

export const ALL_QUOTATIONS = generateDeterministicQuotations(ALL_LEADS);

// Deterministic Deals
function generateDeterministicDeals(leads: Lead[], quotes: Quotation[]): Deal[] {
  // Deals in Oct 2026 matching screenshot:
  // 23 Deals Created (+61.7% vs prev 31 days)
  // Priority: 14 High (₹65,428), 9 Medium (₹37,500), 0 Low
  // Total won deal value ~₹1,82,627
  const deals: Deal[] = [
    {
      id: 'D-822',
      leadId: 'L-209611',
      leadName: 'Rahul Mehra (Nexus FinTech Labs)',
      quotationId: 'Q-10467',
      title: 'Private Limited Incorporation & MCA Compliances',
      serviceCategory: 'Private Limited Company',
      dealValue: 18500,
      stage: 'Closed Won',
      priority: 'High',
      owner: 'Sneha Choudhary',
      department: 'Sales',
      createdAt: '2026-10-16T11:53:02.000Z',
      closedAt: '2026-10-16T12:00:00.000Z'
    },
    {
      id: 'D-821',
      leadId: 'L-209612',
      leadName: 'Dr. Priya Sharma (Arogya Nutra)',
      quotationId: 'Q-10465',
      title: 'FSSAI Central Food Manufacturing License',
      serviceCategory: 'FSSAI License',
      dealValue: 15000,
      stage: 'Closed Won',
      priority: 'High',
      owner: 'Sneha Choudhary',
      department: 'Sales',
      createdAt: '2026-10-15T11:30:00.000Z',
      closedAt: '2026-10-15T14:00:00.000Z'
    },
    {
      id: 'D-820',
      leadId: 'L-209615',
      leadName: 'Amitabh Joshi (Joshi Automations)',
      quotationId: 'Q-10463',
      title: 'Industrial Automation OPC to Pvt Ltd Conversion',
      serviceCategory: 'Private Limited Company',
      dealValue: 19500,
      stage: 'Closed Won',
      priority: 'High',
      owner: 'Nancy Singh',
      department: 'Sales',
      createdAt: '2026-10-13T10:00:00.000Z',
      closedAt: '2026-10-14T09:00:00.000Z'
    },
    {
      id: 'D-819',
      leadId: 'L-209617',
      leadName: 'Rohan Deshmukh (Apex Cloud)',
      quotationId: undefined,
      title: 'ISO 27001 Information Security Audit & Cert',
      serviceCategory: 'ISO Certification',
      dealValue: 12500,
      stage: 'Closed Won',
      priority: 'High',
      owner: 'Tannu Kumari',
      department: 'Sales',
      createdAt: '2026-10-10T11:45:00.000Z',
      closedAt: '2026-10-11T12:00:00.000Z'
    },
    {
      id: 'D-818',
      leadId: 'L-209619',
      leadName: 'Harsh Vardhan Singh (Rajasthan Solar)',
      quotationId: undefined,
      title: 'CleanTech Solar Special Purpose Vehicle Filing',
      serviceCategory: 'Private Limited Company',
      dealValue: 22000,
      stage: 'Closed Won',
      priority: 'High',
      owner: 'Nancy Singh',
      department: 'Sales',
      createdAt: '2026-10-08T15:00:00.000Z',
      closedAt: '2026-10-09T16:30:00.000Z'
    },
    {
      id: 'D-817',
      leadId: 'L-209622',
      leadName: 'Naveen Kumar (Omni Retailers LLP)',
      quotationId: undefined,
      title: 'Multi-Partner LLP Registration & Agreement',
      serviceCategory: 'LLP Registration',
      dealValue: 10500,
      stage: 'Closed Won',
      priority: 'Medium',
      owner: 'Nancy Singh',
      department: 'Sales',
      createdAt: '2026-10-04T12:00:00.000Z',
      closedAt: '2026-10-05T10:00:00.000Z'
    }
  ];

  // 17 more deals created in October to total 23
  const priorities: DealPriority[] = [
    'High', 'High', 'High', 'High', 'High', 'High', 'High', 'High', 'High',
    'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium', 'Medium'
  ];

  for (let i = 0; i < 17; i++) {
    const id = `D-8${String(16 - i).padStart(2, '0')}`;
    const day = 1 + ((i * 3) % 18);
    const hour = 9 + (i % 8);
    const dateStr = `2026-10-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:00:00.000Z`;
    const priority = priorities[i];
    const dealVal = priority === 'High' ? (4000 + (i % 4) * 800) : (3500 + (i % 3) * 600);
    const owner = i % 2 === 0 ? 'Nancy Singh' : (i % 3 === 0 ? 'Sneha Choudhary' : 'Tannu Kumari');
    const srv = servicesList[(i * 2) % servicesList.length];

    deals.push({
      id,
      leadId: `L-2096${25 + i}`,
      leadName: `Corporate Partner ${i + 1}`,
      title: `${srv} Corporate Filing`,
      serviceCategory: srv,
      dealValue: dealVal,
      stage: i < 14 ? 'Closed Won' : (i < 16 ? 'Negotiation' : 'Proposal'),
      priority,
      owner,
      department: 'Sales',
      createdAt: dateStr,
      closedAt: i < 14 ? `2026-10-${String(Math.min(19, day + 1)).padStart(2, '0')}T16:00:00.000Z` : undefined
    });
  }

  // Preceding 30 days (Sept 2026): 14 deals (+61.7% increase to 23)
  for (let i = 1; i <= 14; i++) {
    const day = 1 + ((i * 2) % 28);
    deals.push({
      id: `D-7${String(i).padStart(2, '0')}`,
      leadId: `L-208${String(i).padStart(3, '0')}`,
      leadName: `September Partner ${i}`,
      title: `Sept Corporate Mandate ${i}`,
      serviceCategory: servicesList[i % servicesList.length],
      dealValue: 7000 + (i % 5) * 1500,
      stage: 'Closed Won',
      priority: i % 2 === 0 ? 'High' : 'Medium',
      owner: salesOwners[i % salesOwners.length],
      department: 'Sales',
      createdAt: `2026-09-${String(day).padStart(2, '0')}T10:00:00.000Z`,
      closedAt: `2026-09-${String(day + 1).padStart(2, '0')}T17:00:00.000Z`
    });
  }

  // Historical May-August 2026
  for (let i = 1; i <= 40; i++) {
    const month = 5 + (i % 4);
    const day = 1 + (i % 28);
    deals.push({
      id: `D-6${String(i).padStart(2, '0')}`,
      leadId: `L-20${month}001`,
      leadName: `Historical Deal ${i}`,
      title: `Mandate H-${month}-${i}`,
      serviceCategory: servicesList[i % servicesList.length],
      dealValue: 8000 + (i % 6) * 1200,
      stage: 'Closed Won',
      priority: i % 3 === 0 ? 'High' : 'Medium',
      owner: salesOwners[i % salesOwners.length],
      department: 'Sales',
      createdAt: `2026-0${month}-${String(day).padStart(2, '0')}T10:00:00.000Z`,
      closedAt: `2026-0${month}-${String(Math.min(28, day + 2)).padStart(2, '0')}T17:00:00.000Z`
    });
  }

  return deals;
}

export const ALL_DEALS = generateDeterministicDeals(ALL_LEADS, ALL_QUOTATIONS);

// Deterministic Orders
function generateDeterministicOrders(deals: Deal[]): Order[] {
  const orders: Order[] = [
    {
      id: 'O-2168',
      dealId: 'D-822',
      leadId: 'L-209611',
      clientName: 'Rahul Mehra (Nexus FinTech Labs)',
      serviceCategory: 'Private Limited Company',
      status: 'In Progress',
      progressPercent: 65,
      currentStage: 'ROC SPICe+ Part B Filing Submitted',
      totalStages: 5,
      completedStages: 3,
      opsOwner: 'Gaurav Pant',
      createdAt: '2026-10-16T11:53:02.000Z',
      dueDate: '2026-10-24T18:00:00.000Z'
    },
    {
      id: 'O-2167',
      dealId: 'D-821',
      leadId: 'L-209612',
      clientName: 'Dr. Priya Sharma (Arogya Nutra)',
      serviceCategory: 'FSSAI License',
      status: 'In Progress',
      progressPercent: 40,
      currentStage: 'Premises Inspection & Document Verification',
      totalStages: 4,
      completedStages: 1,
      opsOwner: 'Srishti Upadhyay',
      createdAt: '2026-10-15T14:30:00.000Z',
      dueDate: '2026-10-28T18:00:00.000Z'
    },
    {
      id: 'O-2166',
      dealId: 'D-820',
      leadId: 'L-209615',
      clientName: 'Amitabh Joshi (Joshi Automations)',
      serviceCategory: 'Private Limited Company',
      status: 'Completed',
      progressPercent: 100,
      currentStage: 'Certificate of Incorporation & PAN/TAN Dispatched',
      totalStages: 5,
      completedStages: 5,
      opsOwner: 'Gaurav Pant',
      createdAt: '2026-10-14T10:00:00.000Z',
      dueDate: '2026-10-21T18:00:00.000Z',
      completedAt: '2026-10-18T16:00:00.000Z'
    },
    {
      id: 'O-2165',
      dealId: 'D-819',
      leadId: 'L-209617',
      clientName: 'Rohan Deshmukh (Apex Cloud)',
      serviceCategory: 'ISO Certification',
      status: 'Completed',
      progressPercent: 100,
      currentStage: 'Audit Cleared & ISO 27001 Certificate Delivered',
      totalStages: 4,
      completedStages: 4,
      opsOwner: 'Gaurav Pant',
      createdAt: '2026-10-11T13:00:00.000Z',
      dueDate: '2026-10-18T18:00:00.000Z',
      completedAt: '2026-10-17T15:30:00.000Z'
    },
    {
      id: 'O-2164',
      dealId: 'D-818',
      leadId: 'L-209619',
      clientName: 'Harsh Vardhan Singh (Rajasthan Solar)',
      serviceCategory: 'Private Limited Company',
      status: 'Completed',
      progressPercent: 100,
      currentStage: 'Name RUN Approved, SPICe+ Approved',
      totalStages: 5,
      completedStages: 5,
      opsOwner: 'Gaurav Pant',
      createdAt: '2026-10-09T17:00:00.000Z',
      dueDate: '2026-10-17T18:00:00.000Z',
      completedAt: '2026-10-16T17:00:00.000Z'
    },
    {
      id: 'O-2163',
      dealId: 'D-817',
      leadId: 'L-209622',
      clientName: 'Naveen Kumar (Omni Retailers LLP)',
      serviceCategory: 'LLP Registration',
      status: 'In Progress',
      progressPercent: 50,
      currentStage: 'Form 3 LLP Agreement Drafting with Partners',
      totalStages: 4,
      completedStages: 2,
      opsOwner: 'Srishti Upadhyay',
      createdAt: '2026-10-05T11:00:00.000Z',
      dueDate: '2026-10-22T18:00:00.000Z'
    }
  ];

  // Add more orders linked to remaining won deals
  const wonDeals = deals.filter(d => d.stage === 'Closed Won');
  const opsStaff = ['Gaurav Pant', 'Srishti Upadhyay', 'Azam Afaroz', 'Surbhi Tiwari'];
  
  for (let i = 6; i < wonDeals.length; i++) {
    const deal = wonDeals[i];
    const isCompleted = i % 3 === 0;
    const isOnHold = i % 11 === 0;
    const status: Order['status'] = isCompleted ? 'Completed' : (isOnHold ? 'On Hold' : 'In Progress');
    const totalStages = 4;
    const completedStages = isCompleted ? 4 : (status === 'In Progress' ? 2 : 1);
    const progressPercent = Math.round((completedStages / totalStages) * 100);

    orders.push({
      id: `O-${2160 - (i - 6)}`,
      dealId: deal.id,
      leadId: deal.leadId,
      clientName: deal.leadName,
      serviceCategory: deal.serviceCategory,
      status,
      progressPercent,
      currentStage: isCompleted ? 'Order Executed and Handed Over' : 'Filing In Progress with Government Registry',
      totalStages,
      completedStages,
      opsOwner: opsStaff[i % opsStaff.length],
      createdAt: deal.createdAt,
      dueDate: '2026-10-30T18:00:00.000Z',
      completedAt: isCompleted ? '2026-10-18T10:00:00.000Z' : undefined
    });
  }

  return orders;
}

export const ALL_ORDERS = generateDeterministicOrders(ALL_DEALS);

// Deterministic Payments & Collections
function generateDeterministicPayments(deals: Deal[], orders: Order[]): Payment[] {
  // Invoices / Payments generated in Oct matching screenshot:
  // 142 Invoices Generated (+19.7% vs prev 31 days)
  // Total Collected Revenue ~₹1,20,698
  const payments: Payment[] = [
    {
      id: 'P-1081',
      dealId: 'D-822',
      orderId: 'O-2168',
      leadId: 'L-209611',
      clientName: 'Rahul Mehra (Nexus FinTech Labs)',
      invoiceNumber: 'INV-2026-1042',
      amount: 18500,
      method: 'UPI',
      status: 'Successful',
      paymentDate: '2026-10-16T11:53:02.446Z',
      notes: 'Full payment via HDFC UPI scan'
    },
    {
      id: 'P-1080',
      dealId: 'D-821',
      orderId: 'O-2167',
      leadId: 'L-209612',
      clientName: 'Dr. Priya Sharma (Arogya Nutra)',
      invoiceNumber: 'INV-2026-1041',
      amount: 10000,
      method: 'NEFT/RTGS',
      status: 'Successful',
      paymentDate: '2026-10-15T15:00:00.000Z',
      notes: 'Initial milestone payment (₹5,000 balance pending)'
    },
    {
      id: 'P-1079',
      dealId: 'D-820',
      orderId: 'O-2166',
      leadId: 'L-209615',
      clientName: 'Amitabh Joshi (Joshi Automations)',
      invoiceNumber: 'INV-2026-1040',
      amount: 19500,
      method: 'Net Banking',
      status: 'Successful',
      paymentDate: '2026-10-14T11:20:00.000Z',
      notes: 'ICICI Corporate Net Banking'
    },
    {
      id: 'P-1078',
      dealId: 'D-819',
      orderId: 'O-2165',
      leadId: 'L-209617',
      clientName: 'Rohan Deshmukh (Apex Cloud)',
      invoiceNumber: 'INV-2026-1039',
      amount: 12500,
      method: 'Credit Card',
      status: 'Successful',
      paymentDate: '2026-10-11T12:30:00.000Z',
      notes: 'Mastercard Razorpay Gateway'
    },
    {
      id: 'P-1077',
      dealId: 'D-818',
      orderId: 'O-2164',
      leadId: 'L-209619',
      clientName: 'Harsh Vardhan Singh (Rajasthan Solar)',
      invoiceNumber: 'INV-2026-1038',
      amount: 22000,
      method: 'NEFT/RTGS',
      status: 'Successful',
      paymentDate: '2026-10-09T17:30:00.000Z',
      notes: 'SBI RTGS Transfer'
    },
    {
      id: 'P-1076',
      dealId: 'D-817',
      orderId: 'O-2163',
      leadId: 'L-209622',
      clientName: 'Naveen Kumar (Omni Retailers LLP)',
      invoiceNumber: 'INV-2026-1037',
      amount: 10500,
      method: 'UPI',
      status: 'Successful',
      paymentDate: '2026-10-05T12:30:00.000Z',
      notes: 'Google Pay Business'
    }
  ];

  const methods: Payment['method'][] = ['UPI', 'NEFT/RTGS', 'Net Banking', 'Credit Card'];
  let pNum = 1075;

  // Add remaining invoices/payments in October to total 142
  for (let i = 0; i < 136; i++) {
    const day = 1 + ((i * 5) % 19);
    const hour = 9 + (i % 9);
    const minute = (i * 17) % 60;
    const dateStr = `2026-10-${String(day).padStart(2, '0')}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00.000Z`;
    
    // Status distribution: mostly successful small/medium invoices & subscription compliance fees
    const status: Payment['status'] = (i % 15 === 0) ? 'Failed' : ((i % 11 === 0) ? 'Pending' : 'Successful');
    const amt = status === 'Successful' ? (200 + ((i * 123) % 950)) : (500 + (i % 4) * 250);
    const deal = deals[i % deals.length];
    const order = orders.find(o => o.dealId === deal.id);

    payments.push({
      id: `P-${pNum--}`,
      dealId: deal.id,
      orderId: order?.id,
      leadId: deal.leadId,
      clientName: deal.leadName,
      invoiceNumber: `INV-2026-${1000 + i}`,
      amount: amt,
      method: methods[i % methods.length],
      status,
      paymentDate: dateStr,
      notes: `Invoice payment for ${deal.serviceCategory}`
    });
  }

  // Preceding 30 days (Sept 2026): 118 payments (+19.7% to 142)
  for (let i = 1; i <= 118; i++) {
    const day = 1 + ((i * 3) % 30);
    payments.push({
      id: `P-${900 + i}`,
      dealId: deals[i % deals.length].id,
      leadId: deals[i % deals.length].leadId,
      clientName: `September Client ${i}`,
      invoiceNumber: `INV-2026-09-${String(i).padStart(3, '0')}`,
      amount: 300 + ((i * 87) % 800),
      method: methods[i % methods.length],
      status: 'Successful',
      paymentDate: `2026-09-${String(day).padStart(2, '0')}T14:00:00.000Z`
    });
  }

  // Historical May-August 2026
  for (let i = 1; i <= 150; i++) {
    const month = 5 + (i % 4);
    const day = 1 + (i % 28);
    payments.push({
      id: `P-${700 + i}`,
      dealId: deals[i % deals.length].id,
      leadId: deals[i % deals.length].leadId,
      clientName: `Historical Client P-${i}`,
      invoiceNumber: `INV-2026-0${month}-${String(i).padStart(3, '0')}`,
      amount: 400 + ((i * 65) % 900),
      method: methods[i % methods.length],
      status: 'Successful',
      paymentDate: `2026-0${month}-${String(day).padStart(2, '0')}T12:00:00.000Z`
    });
  }

  return payments;
}

export const ALL_PAYMENTS = generateDeterministicPayments(ALL_DEALS, ALL_ORDERS);

// CRM Activity Events
export const RECENT_ACTIVITY_LOG: ActivityEvent[] = [
  {
    id: 'act-1',
    time: '2026-10-16T12:14:10.847Z',
    employee: 'Nancy Singh',
    action: 'Lead updated',
    recordType: 'lead',
    recordId: 'L-209610',
    details: 'Customer requested quotation update with trademark class addition'
  },
  {
    id: 'act-2',
    time: '2026-10-16T12:14:10.838Z',
    employee: 'Nancy Singh',
    action: 'Lead updated',
    recordType: 'lead',
    recordId: 'L-209610',
    details: 'Status moved to Qualified after MCA name eligibility verification'
  },
  {
    id: 'act-3',
    time: '2026-10-16T11:53:02.446Z',
    employee: 'Sneha Choudhary',
    action: 'Payment recorded',
    recordType: 'payment',
    recordId: 'P-1081',
    details: 'Received ₹18,500 via UPI for Nexus FinTech Pvt Ltd incorporation'
  },
  {
    id: 'act-4',
    time: '2026-10-16T11:53:02.439Z',
    employee: 'Sneha Choudhary',
    action: 'Order created',
    recordType: 'order',
    recordId: 'O-2168',
    details: 'Initiated MCA SPICe+ filing workflow'
  },
  {
    id: 'act-5',
    time: '2026-10-16T11:53:02.431Z',
    employee: 'Sneha Choudhary',
    action: 'Deal created',
    recordType: 'deal',
    recordId: 'D-822',
    details: 'Deal Closed Won for ₹18,500'
  },
  {
    id: 'act-6',
    time: '2026-10-16T11:26:07.072Z',
    employee: 'Sneha Choudhary',
    action: 'Quotation created',
    recordType: 'quotation',
    recordId: 'Q-10467',
    details: 'Quoted ₹18,500 for Pvt Ltd company registration'
  },
  {
    id: 'act-7',
    time: '2026-10-16T11:14:50.539Z',
    employee: 'Tannu Kumari',
    action: 'Quotation created',
    recordType: 'quotation',
    recordId: 'Q-10466',
    details: 'Quoted ₹24,000 for Pvt Ltd + Trademark package'
  },
  {
    id: 'act-8',
    time: '2026-10-15T15:00:00.000Z',
    employee: 'Sneha Choudhary',
    action: 'Payment recorded',
    recordType: 'payment',
    recordId: 'P-1080',
    details: 'Received ₹10,000 advance payment for FSSAI Central License'
  },
  {
    id: 'act-9',
    time: '2026-10-15T14:30:00.000Z',
    employee: 'Srishti Upadhyay',
    action: 'Order stage updated',
    recordType: 'order',
    recordId: 'O-2167',
    details: 'Completed documentation review for Arogya Nutra'
  },
  {
    id: 'act-10',
    time: '2026-10-14T11:20:00.000Z',
    employee: 'Nancy Singh',
    action: 'Payment recorded',
    recordType: 'payment',
    recordId: 'P-1079',
    details: 'Received ₹19,500 full settlement for Joshi Automations'
  }
];
