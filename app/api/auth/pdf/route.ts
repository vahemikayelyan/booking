import fs from "fs/promises";
import { NextApiRequest } from "next";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextApiRequest) {
  const { Poppler } = await import("node-poppler");
  const poppler = new Poppler(
    "C:/Users/Vahe/source/booking/node_modules/node-poppler/src/lib/win32/poppler-23.07.0/Library/bin"
  );
  const chunks: Buffer[] = [];

  for await (let chunk of req.body) {
    chunks.push(chunk);
  }

  try {
    const pdfBuffer = Buffer.concat(chunks);
    const tempPdfPath = path.join(process.cwd(), "public/temp.pdf");
    const outputPath = path.join(process.cwd(), "public/output.html");

    // Write the PDF buffer to a temporary file
    await fs.writeFile(tempPdfPath, pdfBuffer);

    // Convert PDF to HTML
    await poppler.pdfToHtml(tempPdfPath, outputPath);
    const htmlContent = await fs.readFile(outputPath, "utf8");

    // Clean up temporary files
    await fs.unlink(tempPdfPath);
    //await fs.unlink(outputPath);

    // Send back the HTML content
    return Response.json({ ok: true, data: htmlContent });
  } catch (error) {
    return Response.json({ ok: false });
  }
}
