import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          message: "Prompt is required to generate code.",
        },
        { status: 401 }
      );
    }

    const result = await GenAiCode.sendMessage(prompt);
    const response = result?.response.text();

    return NextResponse.json(JSON.parse(response));
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Some problem occurred while generating the code!",
      },
      { status: 500 }
    );
  }
}
