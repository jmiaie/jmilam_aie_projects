
import React, { useState } from 'react';
import { 
  Shield, 
  Upload, 
  File, 
  Image as ImageIcon, 
  History, 
  Lock, 
  ExternalLink,
  MoreVertical,
  CheckCircle,
  Eye,
  Camera
} from 'lucide-react';
import { Evidence } from '../types';

const MOCK_EVIDENCE: Evidence[] = [
  {
    id: 'ev1',
    name: 'Dashcam_Footage_001.mp4',
    type: 'video',
    url: '#',
    timestamp: '2024-05-15 14:30:22',
    uploadedBy: 'Client_SarahJ',
    hash: 'sha256:8f3c...b7e1',
    size: '145 MB',
    chainOfCustody: [
      { action: 'Uploaded', timestamp: '2024-05-15 14:30', actor: 'Sarah J.' },
      { action: 'Verified', timestamp: '2024-05-15 14:35', actor: 'LegalYoda System' },
      { action: 'Accessed', timestamp: '2024-05-16 09:12', actor: 'Atty. John Doe' },
    ]
  },
  {
    id: 'ev2',
    name: 'Hospital_Discharge_Papers.pdf',
    type: 'document',
    url: '#',
    timestamp: '2024-05-15 16:45:10',
    uploadedBy: 'Client_SarahJ',
    hash: 'sha256:1a2b...9z0x',
    size: '2.4 MB',
    chainOfCustody: [
      { action: 'Uploaded', timestamp: '2024-05-15 16:45', actor: 'Sarah J.' },
    ]
  },
  {
    id: 'ev3',
    name: 'Accident_Scene_Photo_3.jpg',
    type: 'image',
    url: 'https://picsum.photos/400/300',
    timestamp: '2024-05-14 11:20:00',
    uploadedBy: 'Investigator_Mike',
    hash: 'sha256:d4e5...f6g7',
    size: '4.1 MB',
    chainOfCustody: [
      { action: 'Uploaded', timestamp: '2024-05-14 11:20', actor: 'Investigator Mike' },
      { action: 'Shared', timestamp: '2024-05-14 12:00', actor: 'Investigator Mike' },
    ]
  }
];

export const EvidenceVault: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Evidence | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 serif">Evidence Vault</h2>
          <p className="text-slate-500">Secure, immutable chain-of-custody for all case materials.</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Camera size={18} />
            <span className="font-medium">Direct Capture</span>
          </button>
          <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 shadow-sm transition-all">
            <Upload size={18} />
            <span>Upload Evidence</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Evidence List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Item</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Timestamp</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Hash Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_EVIDENCE.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-slate-50 cursor-pointer transition-colors ${selectedItem?.id === item.id ? 'bg-emerald-50' : ''}`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${item.type === 'image' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                          {item.type === 'image' ? <ImageIcon size={18} /> : <File size={18} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">{item.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-600">{item.timestamp}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-xs text-emerald-600 font-medium">
                        <Lock size={12} />
                        <span>Verified</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1">
          {selectedItem ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6 sticky top-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-900">Item Details</h3>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  &times;
                </button>
              </div>

              {selectedItem.type === 'image' ? (
                <div className="rounded-lg overflow-hidden aspect-video bg-slate-100">
                  <img src={selectedItem.url} alt={selectedItem.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="rounded-lg border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-slate-400">
                  <File size={48} className="mb-2" />
                  <span className="text-sm">Preview Unavailable</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">SHA-256 Fingerprint</p>
                  <p className="text-xs font-mono text-slate-600 break-all">{selectedItem.hash}</p>
                </div>

                <div>
                  <h4 className="flex items-center space-x-2 text-sm font-bold text-slate-900 mb-3">
                    <History size={16} className="text-emerald-500" />
                    <span>Chain of Custody</span>
                  </h4>
                  <div className="space-y-4 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                    {selectedItem.chainOfCustody.map((log, i) => (
                      <div key={i} className="pl-6 relative">
                        <div className="absolute left-0 top-[6px] w-4 h-4 rounded-full bg-white border-2 border-emerald-500 z-10" />
                        <p className="text-xs font-bold text-slate-900">{log.action}</p>
                        <p className="text-[10px] text-slate-500">{log.actor} • {log.timestamp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                  <Eye size={16} />
                  <span>Full View</span>
                </button>
                <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 rounded-xl border border-dashed border-slate-300 p-12 flex flex-col items-center justify-center text-slate-400 text-center">
              <Shield size={48} className="mb-4 opacity-20" />
              <p className="font-medium">Select an item to view chain-of-custody and details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
