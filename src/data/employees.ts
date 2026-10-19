export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'Sales' | 'Operations' | 'Legal' | 'Compliance';
  department: string;
  avatarInitial: string;
  avatarColor: string;
}

export const EMPLOYEES: Employee[] = [
  // Sales Team
  {
    id: 'emp-1',
    name: 'Nancy Singh',
    email: 'nancy.s@enterprise-crm.in',
    role: 'Sales',
    department: 'Sales',
    avatarInitial: 'N',
    avatarColor: 'bg-purple-600'
  },
  {
    id: 'emp-2',
    name: 'Sneha Choudhary',
    email: 'sneha.c@enterprise-crm.in',
    role: 'Sales',
    department: 'Sales',
    avatarInitial: 'S',
    avatarColor: 'bg-pink-600'
  },
  {
    id: 'emp-3',
    name: 'Tannu Kumari',
    email: 'tannu.k@enterprise-crm.in',
    role: 'Sales',
    department: 'Sales',
    avatarInitial: 'T',
    avatarColor: 'bg-indigo-600'
  },
  // Operations Team
  {
    id: 'emp-4',
    name: 'Gaurav Pant',
    email: 'gaurav.p@enterprise-crm.in',
    role: 'Operations',
    department: 'Operations',
    avatarInitial: 'G',
    avatarColor: 'bg-emerald-600'
  },
  {
    id: 'emp-5',
    name: 'Srishti Upadhyay',
    email: 'srishti.u@enterprise-crm.in',
    role: 'Operations',
    department: 'Operations',
    avatarInitial: 'S',
    avatarColor: 'bg-blue-600'
  },
  {
    id: 'emp-6',
    name: 'Azam Afaroz',
    email: 'azam.a@enterprise-crm.in',
    role: 'Operations',
    department: 'Operations',
    avatarInitial: 'A',
    avatarColor: 'bg-teal-600'
  },
  {
    id: 'emp-7',
    name: 'Surbhi Tiwari',
    email: 'surbhi.t@enterprise-crm.in',
    role: 'Operations',
    department: 'Operations',
    avatarInitial: 'S',
    avatarColor: 'bg-cyan-600'
  }
];

export const DEPARTMENTS = ['Sales', 'Operations', 'Legal', 'Compliance'];
