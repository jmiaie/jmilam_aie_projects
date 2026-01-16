
import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Award,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const STATS_DATA = [
  { name: 'Mon', leads: 4 },
  { name: 'Tue', leads: 7 },
  { name: 'Wed', leads: 5 },
  { name: 'Thu', leads: 12 },
  { name: 'Fri', leads: 8 },
  { name: 'Sat', leads: 15 },
  { name: 'Sun', leads: 10 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 serif">Welcome back, John</h2>
          <p className="text-slate-500">Here's what's happening in your legal marketplace today.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold flex items-center space-x-2 hover:bg-slate-800 transition-all shadow-lg">
          <Plus size={18} />
          <span>New Lead Listing</span>
        </button>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Leads', value: '24', icon: Users, color: 'emerald', trend: '+12%' },
          { label: 'Avg. Lead Value', value: '$8.4k', icon: Award, color: 'blue', trend: '+5%' },
          { label: 'Response Time', value: '14m', icon: Clock, color: 'purple', trend: '-2m' },
          { label: 'Monthly Growth', value: '32%', icon: TrendingUp, color: 'orange', trend: '+4%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-100 text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Market Trends Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 text-lg">Market Lead Activity</h3>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg px-3 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={STATS_DATA}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} tick={{fill: '#94a3b8'}} />
                <Tooltip />
                <Area type="monotone" dataKey="leads" stroke="#10b981" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10">
            <div className="bg-emerald-500/20 text-emerald-400 w-fit px-3 py-1 rounded-full text-xs font-bold mb-4 border border-emerald-500/30">
              AI Insight
            </div>
            <h3 className="text-2xl font-bold mb-4 serif">High-Volume Alert in P.I.</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              We've noticed a 45% increase in multi-vehicle accident leads in the Miami area. Based on your specialties, we recommend focusing on these high-conversion leads.
            </p>
            <button className="flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold transition-all w-fit group">
              <span>View Recommended Leads</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">Your Recent Leads</h3>
          <button className="text-emerald-600 font-bold text-sm hover:underline">View All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { id: 1, name: 'Slip and Fall - Grocery', val: '$12k', date: '2h ago', status: 'Pending' },
            { id: 2, name: 'DUI Defense Case', val: '$5k', date: '5h ago', status: 'Vetted' },
            { id: 3, name: 'Patent Infringement', val: '$45k', date: '1d ago', status: 'Active' },
          ].map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900 text-sm">{item.val}</p>
                <p className={`text-[10px] font-bold uppercase ${item.status === 'Active' ? 'text-blue-500' : 'text-slate-400'}`}>
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
