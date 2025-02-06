// import { GenAiCode } from "@/configs/AiModel";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { prompt } = await req.json();

//     if (!prompt) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Prompt is required to generate code.",
//         },
//         { status: 401 }
//       );
//     }

//     const result = await GenAiCode.sendMessage(prompt);
//     console.log("In server gen ai response: ", result);

//     const response = result?.response.text();

//     return NextResponse.json(JSON.parse(response));
//   } catch (error) {
//     console.log("Error in gen ai code: ", error);

//     return NextResponse.json(
//       {
//         success: false,
//         error: error.message,
//         message: "Some problem occurred while generating the code!",
//       },
//       { status: 500 }
//     );
//   }
// }

import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge", // ✅ Enables Edge Function (25s limit)
};

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, message: "Prompt is required to generate code." },
        { status: 400 }
      );
    }

    console.log("Processing AI request...");

    // Call AI API
    const result = await GenAiCode.sendMessage(prompt);
    console.log("AI Response:", result);

    const response = await result?.response.text(); // Ensure it's awaited

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Error in AI code generation:", error);

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
