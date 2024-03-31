import formidable from "formidable";
import fs from "fs";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const pdfFiles = Object.values(files);

    if (pdfFiles.length === 0) {
      return res.status(400).json({ message: "No PDF files received" });
    }

    try {
      const formData = new FormData();

      pdfFiles.forEach((file, index) => {
        formData.append(`pdf_${index}`, fs.createReadStream(file.path), {
          filename: file.name,
        });
      });

      const pythonBackendEndpoint = "http://127.0.0.1:5000/upload";
      const pythonResponse = await fetch(pythonBackendEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          // Add any necessary headers, e.g., authorization
        },
      });

      if (pythonResponse.ok) {
        return res.status(200).json({ message: "PDFs submitted successfully" });
      } else {
        console.error("Error from Python backend:", pythonResponse.statusText);
        return res.status(500).json({ message: "Error from Python backend" });
      }
    } catch (error) {
      console.error("Error forwarding PDFs to Python backend:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
