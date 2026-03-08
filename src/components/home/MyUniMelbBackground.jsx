import React from 'react';
import { motion } from 'framer-motion';

const MYUNIMELB_SCREENSHOT = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a899204895a2076449c374/97be0f9a9_image.png";

export default function MyUniMelbBackground() {
    return (
        <motion.div
            className="fixed inset-0 z-30 bg-[#f5f5f5]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <img
                src={MYUNIMELB_SCREENSHOT}
                alt="my.unimelb dashboard"
                className="w-full h-full object-cover object-top"
            />
        </motion.div>
    );
}