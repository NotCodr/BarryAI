import React, { useState, useRef } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VoiceInput({ onTranscript, disabled, lang = 'en' }) {
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const recognitionRef = useRef(null);

    const LANG_CODES = {
        en: 'en-AU',
        zh: 'zh-CN',
        hi: 'hi-IN',
        es: 'es-ES',
    };

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Voice input is not supported in your browser. Please try Chrome.');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = LANG_CODES[lang] || 'en-AU';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        
        recognition.onresult = (event) => {
            setIsProcessing(true);
            const transcript = event.results[0][0].transcript;
            onTranscript(transcript);
            setIsProcessing(false);
        };

        recognition.onerror = () => {
            setIsListening(false);
            setIsProcessing(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setIsListening(false);
    };

    const handleClick = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled || isProcessing}
            title={isListening ? "Stop recording" : "Speak to Barry"}
            className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all",
                isListening 
                    ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                    : "bg-gray-100 hover:bg-gray-200",
                (disabled || isProcessing) && "opacity-50 cursor-not-allowed"
            )}
        >
            {isProcessing ? (
                <Loader2 className="h-4 w-4 text-gray-600 animate-spin" />
            ) : isListening ? (
                <MicOff className="h-4 w-4 text-white" />
            ) : (
                <Mic className="h-4 w-4 text-gray-600" />
            )}
        </button>
    );
}