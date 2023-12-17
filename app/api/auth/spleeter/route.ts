import { ApiResponse } from "@/utils/shared";
import { exec } from "child_process";
import fs from "fs";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import path, { join } from "path";
import { promisify } from "util";

const execAsync = promisify(exec);
const PUBLIC_PATH = path.join(process.cwd(), "public");

export async function POST(req: NextRequest) {
  const today = getCurrentDate();
  const session = await getServerSession();
  const email = session?.user?.email!;
  const UPLOAD_PATH = join(
    PUBLIC_PATH,
    "uploads",
    email,
    today.date,
    today.time
  );
  const formData = await req.formData();
  const file = formData.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ error: "No file was found." }, { status: 500 });
  }

  if (!fs.existsSync(UPLOAD_PATH)) {
    fs.mkdirSync(UPLOAD_PATH, { recursive: true });
  }

  const filePath = join(UPLOAD_PATH, file.name);
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await writeFile(filePath, buffer);

  if (fs.existsSync(filePath)) {
    try {
      //fs.chmodSync(filePath, 777);

      const { stderr } = await execAsync(
        `python3 -m spleeter separate ${filePath} -o ${UPLOAD_PATH}`
      );

      if (stderr) {
        return NextResponse.json({ error: stderr }, { status: 500 });
      }

      /*exec(`python3 utils/run_librosa.py`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Execution error: ${error}`);
          return;
        }

        console.log(`stdout: ${stdout}`);

        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }
      });*/

      return NextResponse.json({
        ok: true,
        message: "Files have been successfully processed and saved.",
      } as ApiResponse);
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

function getCurrentDate(): { date: string; time: string } {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var today = new Date();
  var month = months[today.getMonth()];
  var day = String(today.getDate()).padStart(2, "0");
  var date = `${month}-${day}-${today.getFullYear()}`;
  var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  return { date, time };
}
