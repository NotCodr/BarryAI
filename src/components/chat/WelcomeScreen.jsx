import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const BARRY_WELCOME = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a899204895a2076449c374/1a17c4ad9_BarryAIPrototypeNatualAestheticwithHeadsetNonCommercialUse.png";

export default function WelcomeScreen({ onContinue }) {
    return (
        <motion.div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#001a4d] via-[#003087] to-[#001a4d] p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Glowing ring behind avatar */}
            <motion.div
                className="relative mb-6"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.15 }}
            >
                <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-xl scale-125" />
                <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                    <img
                        src={BARRY_WELCOME}
                        alt="Barry AI"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="absolute bottom-3 right-3 h-6 w-6 bg-green-400 rounded-full border-[3px] border-white shadow-lg" />
            </motion.div>

            {/* Text */}
            <motion.div
                className="text-center mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
            >
                <h2 className="text-2xl font-bold text-white mb-2">Meet Barry</h2>
                <p className="text-white/70 text-sm leading-relaxed max-w-[260px]">
                    Your University of Melbourne student assistant. I'm here to help you navigate uni life.
                </p>
            </motion.div>

            {/* Continue button */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
            >
                <Button
                    onClick={onContinue}
                    className="bg-white text-[#003087] hover:bg-white/90 rounded-full px-8 py-5 text-sm font-semibold shadow-lg gap-2"
                >
                    Continue
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </motion.div>

            <motion.p
                className="absolute bottom-4 text-[9px] text-white/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                Team BarryAI · Not officially affiliated with The University of Melbourne
            </motion.p>
        </motion.div>
    );
}