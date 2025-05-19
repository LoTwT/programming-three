import type { NextRequest } from "next/server"
import { execa } from "execa"
import { NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const url = formData.get("url")

  if (!url) {
    return NextResponse.json({
      msg: "error",
      data: "url is required",
    })
  }

  if (typeof url !== "string") {
    return NextResponse.json({
      msg: "error",
      data: "url must be a string",
    })
  }

  try {
    const { stdout, stderr } = await execa("npx", [
      "single-file-cli",
      url,
      "--dump-content",
    ])

    if (stderr) {
      throw new Error(stderr)
    }

    return NextResponse.json({
      msg: "ok",
      data: stdout,
    })
  } catch (error: any) {
    return NextResponse.json({
      msg: "error",
      data: error?.message || "unknown error",
    })
  }
}
