
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { LeadMarketplace } from './components/LeadMarketplace';
import { EvidenceVault } from './components/EvidenceVault';

const ProfilePlaceholder = () => (
  <div className="p-12 text-center bg-white rounded-2xl shadow-sm border border-slate-200">
    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
      <span className="text-4xl font-bold">JD</span>
    </div>
    <h2 className="text-2xl font-bold serif text-slate-900">John Doe, Esq.</h2>
    <p className="text-slate-500">Premium Legal Professional • Miami, FL</p>
    <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
      <div className="p-4 bg-slate-50 rounded-xl">
        <p className="text-2xl font-bold text-slate-900">42</p>
        <p className="text-xs text-slate-500 font-bold uppercase">Leads Claimed</p>
      </div>
      <div className="p-4 bg-slate-50 rounded-xl">
        <p className="text-2xl font-bold text-slate-900">12</p>
        <p className="text-xs text-slate-500 font-bold uppercase">Active Cases</p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/marketplace" element={<LeadMarketplace />} />
          <Route path="/evidence" element={<EvidenceVault />} />
          <Route path="/search" element={<div className="p-8 text-center text-slate-500">Professional Search Interface - Coming Soon</div>} />
          <Route path="/profile" element={<ProfilePlaceholder />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
