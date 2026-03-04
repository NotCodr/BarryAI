import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";

// Extract lines that are independence disclaimers from message content
function extractDisclaimers(content) {
    if (!content) return { body: content, disclaimers: [] };

    const lines = content.split('\n');
    const disclaimerPatterns = [
        /please note[:\s].*(operates independently|independent of|not affiliated)/i,
        /.*operates independently of the university of melbourne/i,
        /.*is independent of the university of melbourne/i,
        /.*is not affiliated with the university of melbourne/i,
        /\*?note[:\s]+.*operates independently/i,
        /disclaimer[:\s]/i,
    ];

    const disclaimerLines = [];
    const bodyLines = [];

    lines.forEach(line => {
        const trimmed = line.trim();
        if (disclaimerPatterns.some(p => p.test(trimmed))) {
            // Clean markdown bold/italic markers
            disclaimerLines.push(trimmed.replace(/\*\*/g, '').replace(/\*/g, '').replace(/^[-•]\s*/, ''));
        } else {
            bodyLines.push(line);
        }
    });

    return {
        body: bodyLines.join('\n').trim(),
        disclaimers: disclaimerLines,
    };
}

export default function MessageBubble({ message, barryAvatar }) {
    const isUser = message.role === 'user';
    const { body, disclaimers } = isUser
        ? { body: message.content, disclaimers: [] }
        : extractDisclaimers(message.content);

    return (
        <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
            {!isUser && (
                <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white">
                    <img
                        src={barryAvatar}
                        alt="Barry"
                        className="h-full w-full object-cover"
                    />
                </div>
            )}
            <div className={cn("max-w-[80%] min-w-0", isUser && "flex flex-col items-end")}>
                {body && (
                    <div className={cn(
                        "rounded-2xl px-4 py-2.5 shadow-sm break-words overflow-hidden",
                        isUser
                            ? "bg-[#094183] text-white rounded-br-md"
                            : "bg-white border border-gray-100 text-gray-800 rounded-bl-md"
                    )}>
                        {isUser ? (
                            <p className="text-sm leading-relaxed break-words">{body}</p>
                        ) : (
                            <ReactMarkdown
                                className="text-sm prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 break-words"
                                components={{
                                    p: ({ children }) => <p className="my-1.5 leading-relaxed">{children}</p>,
                                    a: ({ children, ...props }) => (
                                        <a {...props} className="text-[#094183] underline hover:text-[#0d5299]" target="_blank" rel="noopener noreferrer">{children}</a>
                                    ),
                                    ul: ({ children }) => <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>,
                                    ol: ({ children }) => <ol className="my-2 ml-4 list-decimal space-y-1">{children}</ol>,
                                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                                    h3: ({ children }) => <h3 className="font-semibold text-gray-900 mt-3 mb-1">{children}</h3>,
                                    h4: ({ children }) => <h4 className="font-semibold text-gray-800 mt-2 mb-0.5">{children}</h4>,
                                    hr: () => <hr className="my-2 border-gray-100" />,
                                }}
                            >
                                {body}
                            </ReactMarkdown>
                        )}
                    </div>
                )}

                {/* Independence disclaimers rendered outside / below the bubble */}
                {disclaimers.length > 0 && (
                    <div className="mt-1.5 space-y-0.5 px-1">
                        {disclaimers.map((d, i) => (
                            <p key={i} className="text-[10px] text-gray-400 leading-snug">
                                ⓘ {d}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}