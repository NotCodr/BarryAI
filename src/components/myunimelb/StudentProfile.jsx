import React, { useState, useEffect } from 'react';
import { MapPin, Copy } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function StudentProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const displayName = 'Jane Doe';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Gradient top */}
            <div className="h-16 bg-gradient-to-r from-[#0c1f42] to-[#003087]" />
            <div className="px-4 pb-4 -mt-6">
                <div className="h-12 w-12 rounded-full bg-gray-300 border-2 border-white mb-2" />
                <p className="text-[#003087] text-sm">Hello,</p>
                <h3 className="text-lg font-bold text-[#0c1f42] mb-3">{displayName}</h3>
                
                <div className="flex items-center gap-1.5 text-xs text-[#003087] mb-3">
                    <span className="font-medium">Student ID:</span>
                    <span>1821370</span>
                    <Copy className="h-3 w-3 cursor-pointer hover:text-[#0c1f42]" />
                </div>

                <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-3">
                    <p className="font-medium text-gray-800">Bachelor of Commerce</p>
                    <p className="flex items-center gap-1">Australia

          </p>
                    <p>Last login: <a href="#" className="text-[#003087] underline">8 Mar 2026, 2:39 p.m. AEDT</a></p>
                </div>
            </div>
            {/* OneDrive banner */}
            <div className="mx-3 mb-3">
                <div className="bg-[#003087] text-white rounded-lg px-4 py-3 text-xs flex items-center gap-2">
                    <span>☁️</span>
                    <span className="font-medium">Transfer your storage to OneDrive</span>
                </div>
            </div>
        </div>);

}