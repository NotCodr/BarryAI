import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";

export default function MessageBubble({ message, barryAvatar }) {
    const isUser = message.role === 'user';
    
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
            <div className={cn("max-w-[80%]", isUser && "flex flex-col items-end")}>
                {message.content && (
                    <div className={cn(
                        "rounded-2xl px-4 py-2.5 shadow-sm",
                        isUser 
                            ? "bg-[#094183] text-white rounded-br-md" 
                            : "bg-white border border-gray-100 text-gray-800 rounded-bl-md"
                    )}>
                        {isUser ? (
                            <p className="text-sm leading-relaxed">{message.content}</p>
                        ) : (
                            <ReactMarkdown 
                                className="text-sm prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                                components={{
                                    p: ({ children }) => <p className="my-1 leading-relaxed">{children}</p>,
                                    a: ({ children, ...props }) => (
                                        <a {...props} className="text-[#094183] underline hover:text-[#0d5299]" target="_blank" rel="noopener noreferrer">{children}</a>
                                    ),
                                    ul: ({ children }) => <ul className="my-1 ml-4 list-disc">{children}</ul>,
                                    ol: ({ children }) => <ol className="my-1 ml-4 list-decimal">{children}</ol>,
                                    li: ({ children }) => <li className="my-0.5">{children}</li>,
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}