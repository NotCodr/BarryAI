import React from 'react';
import { ArrowRight } from 'lucide-react';

const FOOTER_LINKS = [
    'About us', 'Careers at Melbourne', 'Safety and respect', 'Newsroom', 'Contact', 'Campus locations'
];

export default function SiteFooter() {
    return (
        <footer className="bg-[#0c1f42] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_1fr_180px] gap-8 mb-10">
                    {/* Links */}
                    <div className="space-y-2">
                        {FOOTER_LINKS.map(link => (
                            <a key={link} href="#" className="flex items-center gap-1.5 text-sm text-white/80 hover:text-white hover:underline transition-colors">
                                <ArrowRight className="h-3 w-3 flex-shrink-0" />
                                {link}
                            </a>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-4">Contact Details</h4>
                        <p className="text-sm text-white/80 mb-1"><span className="font-semibold text-white">Phone</span> <a href="tel:136352" className="underline">13 MELB (13 6352)</a></p>
                        <p className="text-sm text-white/80 mb-4"><span className="font-semibold text-white">International</span> <a href="tel:+61390355511" className="underline">+61 3 9035 5511</a></p>
                        <div className="text-sm text-white/80">
                            <p className="font-semibold text-white mb-1">Address</p>
                            <p>The University of Melbourne</p>
                            <p>Grattan Street, Parkville</p>
                            <p>Victoria 3010</p>
                            <p>Australia</p>
                        </div>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-4">Connect With Us</h4>
                        <div className="flex gap-4 text-white/70">
                            {['Facebook', 'LinkedIn', 'Instagram'].map(name => (
                                <a key={name} href="#" className="text-xs hover:text-white transition-colors underline">{name}</a>
                            ))}
                        </div>
                    </div>

                    {/* Logo */}
                    <div className="flex md:justify-end">
                        <div className="text-right">
                            <div className="text-[9px] tracking-[0.2em] uppercase text-white/60">The University of</div>
                            <div className="text-xl font-bold tracking-tight">MELBOURNE</div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                    <div className="flex flex-wrap gap-4 text-[11px] text-white/50">
                        {['Emergency', 'Terms & privacy', 'Accessibility', 'Privacy'].map(item => (
                            <a key={item} href="#" className="hover:text-white underline transition-colors">{item}</a>
                        ))}
                    </div>
                    <p className="text-white/40 text-[11px] text-center">
                        The University of Melbourne (Australian University). PRV12150 &nbsp; CRICOS number: 00116K &nbsp; ABN: 84 002 705 224
                    </p>
                </div>

                {/* BarryAI disclaimer */}
                <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-white/30 text-[10px] text-center">
                        BarryAI is a student-led project by Team BarryAI and is not officially affiliated with the University of Melbourne.
                    </p>
                </div>
            </div>
        </footer>
    );
}