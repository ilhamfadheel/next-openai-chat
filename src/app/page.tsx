"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { marked } from "marked";

export default function Chat() {
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        append,
    } = useChat();

    const messagesContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="flex flex-col w-full h-screen max-w-md py-24 mx-auto stretch">
            <div className="overflow-auto mb-8 w-full" ref={messagesContainerRef}>
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`whitespace-pre-wrap ${
                            m.role === "user"
                                ? "bg-green-700 p-3 m-2 rounded-lg"
                                : "bg-slate-700 p-3 m-2 rounded-lg"
                        }`}
                        dangerouslySetInnerHTML={{ __html: marked(m.content) }}
                    >
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-end pr-4">
                        <span className="animate-bounce">...</span>
                    </div>
                )}
            </div>
            <div className="fixed bottom-0 w-full max-w-md">
                <div className="flex flex-col justify-center mb-2 items-center">
                    <div className="flex justify-center gap-4">
                        <button
                            className="bg-blue-500 p-2 text-white rounded shadow-xl"
                            disabled={isLoading}
                            onClick={() =>
                                append({role: "user", content: "Give me a random recipe"})
                            }
                        >
                            Random Recipe
                        </button>
                        <button
                            className="bg-blue-500 p-2 text-white rounded shadow-xl"
                            disabled={isLoading}
                            onClick={() =>
                                append({role: "user", content: "Tell me a joke"})
                            }
                        >
                            Tell me a joke
                        </button>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex justify-center">
                    <input
                        className="w-[95%] p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
                        disabled={isLoading}
                        value={input}
                        placeholder="Say something..."
                        onChange={handleInputChange}
                    />
                </form>
            </div>
        </div>
    );
}