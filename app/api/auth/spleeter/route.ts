import { exec } from "child_process";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  //const formData = await req.formData();
  //const file = formData.get("file") as File;
  const inputFile = path.join(process.cwd(), "public", "harut.mp3");

  if (fs.existsSync(inputFile)) {
    const outputDir = path.join(process.cwd(), "public/output");

    try {
      const { stdout, stderr } = await execAsync(
        `spleeter separate ${inputFile} -o ${outputDir}`
      );

      if (stderr) {
        return NextResponse.json({ error: stderr }, { status: 500 });
      }

      exec("python3 utils/run_librosa.py", (error, stdout, stderr) => {
        if (error) {
          console.error(`Execution error: ${error}`);
          return;
        }

        console.log(`stdout: ${stdout}`);

        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }
      });

      return NextResponse.json({
        message: "Files have been successfully separated and saved.",
      });
    } catch (error: any) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { error: "Input file does not exist." },
      { status: 500 }
    );
  }
}
