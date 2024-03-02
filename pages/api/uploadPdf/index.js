// pages/api/uploadPdf.js
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

    // Check if any PDF files were received
    if (pdfFiles.length === 0) {
      return res.status(400).json({ message: "No PDF files received" });
    }

    try {
      // Create a FormData object to append files
      const formData = new FormData();

      // Append each PDF file to the FormData
      pdfFiles.forEach((file, index) => {
        formData.append(`pdf_${index}`, fs.createReadStream(file.path), {
          filename: file.name,
        });
      });

      // Forward FormData to Python backend
      const pythonBackendEndpoint = "YOUR_PYTHON_BACKEND_ENDPOINT";
      const pythonResponse = await fetch(pythonBackendEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          // Add any necessary headers, e.g., authorization
        },
      });

      if (pythonResponse.ok) {
        // Successful response from Python backend
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
