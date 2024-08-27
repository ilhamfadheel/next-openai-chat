"use client";
import { useState } from "react";
import { marked } from "marked";

const Home = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
        });
        const data = await res.json();
        setResponse(data.content);
        setMessage("");
    };

    return (
        <main className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
            <h1 className="text-4xl font-bold text-center text-gray-100 mb-8">
                Chat Page
            </h1>
            <section className="max-w-3xl mx-auto w-full">
                <div className="bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message"
                            className="px-3 py-2 bg-gray-700 text-white rounded"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Send
                        </button>
                    </form>
                    {response && (
                        <div
                            className="mt-4 p-3 bg-gray-700 text-white rounded"
                            dangerouslySetInnerHTML={{ __html: marked(response) }}
                        />
                    )}
                </div>
            </section>
        </main>
    );
};

export default Home;