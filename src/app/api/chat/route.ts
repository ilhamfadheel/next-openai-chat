import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI();

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
    });

    return NextResponse.json({
        content: response.choices[0].message.content,
    });
}