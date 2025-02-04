import { NextRequest, NextResponse } from "next/server";
import { chatSession } from "@/configs/AiModel";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json(
      {
        success: false,
        message: "Prompt is required to get the AI response.",
      },
      { status: 401 }
    );
  }

  try {
    const result = await chatSession.sendMessage(prompt);
    const aiResponse = await result?.response.text();
    return NextResponse.json(
      {
        aiResponse: aiResponse,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log("Some error occurred while getting ai response..", e);
    return NextResponse.json(
      {
        success: false,
        // @ts-ignore
        error: e.message,
        message: "Some error occurred while getting the ai response.",
      },
      { status: 500 }
    );
  }
}
