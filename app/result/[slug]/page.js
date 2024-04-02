"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  const router = useRouter();
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    // Assume you pass the submission result through query parameters
    const slug = "success";

    if (slug === "success") {
      setSubmissionResult({
        success: true,
        message: "PDFs submitted successfully!",
      });
    } else {
      setSubmissionResult({
        success: false,
        message: "Error submitting PDFs. Please try again.",
      });
    }
  }, [router.query]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {submissionResult && (
        <>
          {submissionResult.success ? (
            <h1 className="text-4xl text-green-500">
              {submissionResult.message}
            </h1>
          ) : (
            <h1 className="text-4xl text-red-500">
              {submissionResult.message}
            </h1>
          )}
          <p className="mt-4">
            {/* Provide additional information or options here */}
          </p>
        </>
      )}
    </div>
  );
};

export default ResultPage;
