
export enum UserRole {
  CLIENT = 'CLIENT',
  ATTORNEY = 'ATTORNEY',
  INVESTIGATOR = 'INVESTIGATOR',
  NOTARY = 'NOTARY'
}

export enum CaseCategory {
  PERSONAL_INJURY = 'Personal Injury',
  FAMILY_LAW = 'Family Law',
  CRIMINAL_DEFENSE = 'Criminal Defense',
  REAL_ESTATE = 'Real Estate',
  CORPORATE = 'Corporate',
  INTELLECTUAL_PROPERTY = 'Intellectual Property',
  IMMIGRATION = 'Immigration'
}

export interface Evidence {
  id: string;
  name: string;
  type: 'image' | 'document' | 'audio' | 'video';
  url: string;
  timestamp: string;
  uploadedBy: string;
  hash: string;
  size: string;
  description?: string;
  chainOfCustody: {
    action: string;
    timestamp: string;
    actor: string;
  }[];
}

export interface LegalLead {
  id: string;
  title: string;
  description: string;
  category: CaseCategory;
  location: string;
  status: 'New' | 'Vetted' | 'Claimed' | 'Closed';
  createdAt: string;
  clientName: string;
  urgency: 'Low' | 'Medium' | 'High';
  estimatedValue?: number;
  evidenceCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  firmName?: string;
  specialties?: CaseCategory[];
  verified: boolean;
  avatar?: string;
}
