import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongoDB";

// API to delete all documents from all collections in the database
export async function DELETE() {
  try {
    console.log("Connecting to MongoDB...");
    const client = await clientPromise;
    const db = client.db(`${process.env.NEXT_PUBLIC_DB_NAME}`); // Replace with your database name
    console.log("Connected to MongoDB. Using database:", db.databaseName);

    // Fetch all collections in the database
    const collections = await db.listCollections().toArray();
    console.log(`Found ${collections.length} collections`);

    let totalDeleted = 0;

    // Iterate over each collection and delete all documents
    for (const collection of collections) {
      const collectionName = collection.name;
      console.log(`Deleting documents from collection: ${collectionName}`);

      const result = await db.collection(collectionName).deleteMany({});
      totalDeleted += result.deletedCount;
      console.log(`Deleted ${result.deletedCount} documents from ${collectionName}`);
    }

    // Return the total number of deleted documents
    return NextResponse.json({
      success: true,
      message: `Deleted a total of ${totalDeleted} documents from all collections.`,
    });
  } catch (error) {
    console.error("Error deleting documents:", error.message);
    return NextResponse.json(
      { success: false, message: `Failed to delete documents. Error: ${error.message}` },
      { status: 500 }
    );
  }
}
