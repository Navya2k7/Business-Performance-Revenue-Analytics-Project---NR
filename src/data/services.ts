export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-pvt-ltd',
    name: 'Private Limited Company',
    category: 'Incorporation',
    basePrice: 12500,
    description: 'Complete MCA registration, SPICe+ filing, DIN, DSC, PAN, TAN & Bank A/c support.'
  },
  {
    id: 'srv-llp',
    name: 'LLP Registration',
    category: 'Incorporation',
    basePrice: 8500,
    description: 'Limited Liability Partnership incorporation, FiLLiP filing, and partnership agreement drafting.'
  },
  {
    id: 'srv-trademark',
    name: 'Trademark',
    category: 'IP & Legal',
    basePrice: 6500,
    description: 'Trademark search, class classification, application filing, and objection monitoring.'
  },
  {
    id: 'srv-startup-india',
    name: 'Startup India Registration',
    category: 'Government Recognition',
    basePrice: 4999,
    description: 'DPIIT certificate recognition, tax exemption advisory, and investor-ready documentation.'
  },
  {
    id: 'srv-iso',
    name: 'ISO Certification',
    category: 'Quality & Audit',
    basePrice: 7500,
    description: 'ISO 9001:2015 / ISO 27001 audit support, gap analysis, and certification.'
  },
  {
    id: 'srv-fssai',
    name: 'FSSAI License',
    category: 'Regulatory',
    basePrice: 5500,
    description: 'Food safety authority state or central registration, documentation, and compliance.'
  },
  {
    id: 'srv-annual-comp',
    name: 'Annual Compliance',
    category: 'Compliance & Tax',
    basePrice: 15000,
    description: 'ROC AOC-4, MGT-7, statutory audit coordination, board meeting minutes, and financial statements.'
  },
  {
    id: 'srv-gst',
    name: 'GST Filing',
    category: 'Compliance & Tax',
    basePrice: 3500,
    description: 'Monthly GSTR-1, GSTR-3B filings, reconciliation, and input tax credit optimization.'
  },
  {
    id: 'srv-general-filing',
    name: 'General Filing',
    category: 'Legal',
    basePrice: 4500,
    description: 'MCA form filings (DIR-3 KYC, INC-22A ACTIVE, CHG-1 charge registration).'
  },
  {
    id: 'srv-web-dev',
    name: 'Website development',
    category: 'Digital Services',
    basePrice: 25000,
    description: 'Corporate brand web presence, responsive design, and contact capture funnel.'
  },
  {
    id: 'srv-opc',
    name: 'One Person Company',
    category: 'Incorporation',
    basePrice: 11000,
    description: 'OPC company incorporation under Companies Act 2013 with sole director and nominee.'
  },
  {
    id: 'srv-dsc-din',
    name: 'DSC & DIN Services',
    category: 'Directorial',
    basePrice: 2000,
    description: 'Class 3 Digital Signature Certificate with ePass token and MCA Director Identification Number.'
  }
];
