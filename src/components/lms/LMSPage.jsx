import React from 'react';
import LMSSidebar from './LMSSidebar';
import LMSContent from './LMSContent';

export default function LMSPage({ onBack }) {
    return (
        <div className="flex min-h-screen">
            <LMSSidebar />
            <LMSContent onBack={onBack} />
        </div>
    );
}