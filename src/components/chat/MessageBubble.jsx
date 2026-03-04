import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";

// Extract disclaimer lines from message content (lines starting with "Please note:")
function splitContentAndDisclaimers(content) {
    if (!content) return { mainContent: content, disclaimers: [] };

    const lines = content.split('\n');
    const disclaimerLines = [];
    const mainLines = [];

    for (const line of lines) {
        const trimmed = line.trim();
        if (
            trimmed.match(/^please note:/i) ||
            trimmed.match(/^note:/i) ||
            trimmed.match(/operates independently of the university of melbourne/i) ||
            trimmed.match(/operates independently of unimelb/i)
        ) {
            disclaimerLines.push(trimmed);
        } else {
            mainLines.push(line);
        }
    }

    // Clean up trailing blank lines from main content
    const mainContent = mainLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    return { mainContent, disclaimers: disclaimerLines };
}

export default function MessageBubble({ message, barryAvatar }) {
    const isUser = message.role === 'user';
    const { mainContent, disclaimers } = splitContentAndDisclaimers(message.content);

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
                {mainContent && (
                    <div className={cn(
                        "rounded-2xl px-4 py-2.5 shadow-sm break-words overflow-hidden",
                        isUser
                            ? "bg-[#094183] text-white rounded-br-md"
                            : "bg-white border border-gray-100 text-gray-800 rounded-bl-md"
                    )}>
                        {isUser ? (
                            <p className="text-sm leading-relaxed break-words">{mainContent}</p>
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
                                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                    h3: ({ children }) => <h3 className="font-semibold text-sm mt-2 mb-1">{children}</h3>,
                                    h2: ({ children }) => <h2 className="font-semibold text-sm mt-2 mb-1">{children}</h2>,
                                    blockquote: ({ children }) => <blockquote className="border-l-2 border-gray-300 pl-3 italic text-gray-600 my-1">{children}</blockquote>,
                                }}
                            >
                                {mainContent}
                            </ReactMarkdown>
                        )}
                    </div>
                )}

                {/* Disclaimers rendered outside and below the bubble */}
                {!isUser && disclaimers.length > 0 && (
                    <div className="mt-1.5 px-1 space-y-0.5">
                        {disclaimers.map((d, i) => (
                            <p key={i} className="text-[10px] text-gray-400 leading-snug">{d}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}