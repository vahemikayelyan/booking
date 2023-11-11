import { exec } from "child_process";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const inputFile = path.join(process.cwd(), "public", "harut.mp3");
  let result: any = "OK";

  if (fs.existsSync(inputFile)) {
    const outputDir = path.join(process.cwd(), "public/output");

    // Run Spleeter
    result = await runSpleeter(inputFile, outputDir);
  } else {
    result = "Input file does not exist.";
  }

  return NextResponse.json({ result });
}

async function runSpleeter(inputFile: string, outputDir: string): Promise<any> {
  try {
    const command = `spleeter separate ${inputFile} -o ${outputDir}`;
    const { stdout, stderr } = exec(command);

    return stdout;
  } catch (error) {
    return String(error);
  }
}
