
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { 
  Filter, 
  DollarSign, 
  Clock, 
  MapPin, 
  FileText, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { LegalLead, CaseCategory } from '../types';

const MOCK_LEADS: LegalLead[] = [
  {
    id: '1',
    title: 'Multi-Vehicle Pileup on I-95',
    description: 'A three-car collision resulting in significant property damage and personal injury. Police report available.',
    category: CaseCategory.PERSONAL_INJURY,
    location: 'Miami, FL',
    status: 'Vetted',
    createdAt: '2 hours ago',
    clientName: 'Sarah J.',
    urgency: 'High',
    estimatedValue: 25000,
    evidenceCount: 12
  },
  {
    id: '2',
    title: 'Commercial Lease Dispute',
    description: 'Small business owner facing unexpected eviction proceedings. Landlord citing non-existent lease violations.',
    category: CaseCategory.REAL_ESTATE,
    location: 'Austin, TX',
    status: 'New',
    createdAt: '5 hours ago',
    clientName: 'Michael R.',
    urgency: 'Medium',
    estimatedValue: 12000,
    evidenceCount: 4
  },
  {
    id: '3',
    title: 'Wrongful Termination - Tech Sector',
    description: 'Senior engineer alleging discrimination and retaliation after whistleblowing on security practices.',
    category: CaseCategory.CORPORATE,
    location: 'San Francisco, CA',
    status: 'Vetted',
    createdAt: '1 day ago',
    clientName: 'David K.',
    urgency: 'Medium',
    estimatedValue: 85000,
    evidenceCount: 28
  },
  {
    id: '4',
    title: 'Child Custody Modification',
    description: 'Urgent modification request due to change in living circumstances and school district requirements.',
    category: CaseCategory.FAMILY_LAW,
    location: 'Seattle, WA',
    status: 'New',
    createdAt: '30 mins ago',
    clientName: 'Elena P.',
    urgency: 'High',
    estimatedValue: 5000,
    evidenceCount: 3
  }
];

const DATA_VIZ = [
  { name: 'P.I.', value: 45, color: '#10b981' },
  { name: 'Family', value: 30, color: '#3b82f6' },
  { name: 'Real Estate', value: 15, color: '#f59e0b' },
  { name: 'Corp', value: 10, color: '#8b5cf6' },
];

export const LeadMarketplace: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 serif">Lead Marketplace</h2>
          <p className="text-slate-500">Premium legal referrals vetted by LegalYoda AI.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            <span className="font-medium text-sm">Filter</span>
          </button>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-shadow shadow-md">
            Purchase Credits
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Marketplace Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 flex items-center space-x-2">
                <TrendingUp size={18} className="text-emerald-500" />
                <span>Market Demand</span>
              </h3>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Live</span>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DATA_VIZ}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <RechartsTooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {DATA_VIZ.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">
              Personal Injury leads are currently trending +12% this week.
            </p>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl">
            <h3 className="font-bold text-lg mb-2">LegalYoda Pro</h3>
            <p className="text-slate-400 text-sm mb-4">Get exclusive 24h early access to High-Value leads and direct investigator integration.</p>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-lg transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>

        {/* Lead Listings */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {['All', 'Personal Injury', 'Real Estate', 'Corporate', 'Family Law'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-all
                  ${filter === cat 
                    ? 'bg-slate-800 text-white border-slate-800' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          {MOCK_LEADS.map((lead) => (
            <div 
              key={lead.id} 
              className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                      ${lead.urgency === 'High' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}
                    `}>
                      {lead.urgency} Urgency
                    </span>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {lead.status}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {lead.title}
                  </h4>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-600 flex items-center justify-end">
                    <DollarSign size={14} />
                    {lead.estimatedValue?.toLocaleString()} est.
                  </p>
                  <p className="text-xs text-slate-400 flex items-center justify-end space-x-1 mt-1">
                    <Clock size={12} />
                    <span>{lead.createdAt}</span>
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                {lead.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    <MapPin size={14} className="text-slate-400" />
                    <span>{lead.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    <Tag size={14} className="text-slate-400" />
                    <span>{lead.category}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-slate-500">
                    <FileText size={14} className="text-slate-400" />
                    <span>{lead.evidenceCount} files</span>
                  </div>
                </div>
                <button className="flex items-center space-x-1 text-emerald-600 font-bold text-sm hover:underline">
                  <span>View Full Case</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}

          <button className="w-full py-4 text-slate-500 font-medium text-sm hover:text-slate-700 transition-colors">
            Load More Leads...
          </button>
        </div>
      </div>
    </div>
  );
};
