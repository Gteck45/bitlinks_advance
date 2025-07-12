import clientPromise from "@/../lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("bitlinks");
  const collection = db.collection("url");

  const { url, shorturl, email } = body;

  // Validate shorturl does not contain @, $ or /
  const forbiddenChars = /[@$/]/;
  if (forbiddenChars.test(shorturl)) {
    return Response.json({
      success: false,
      error: "true",
      message: "Short URL must not contain @, $, or /.",
    });
  }

  // Check if shorturl already exists
  const doc = await collection.findOne({ shorturl });
  if (doc) {
    return Response.json({
      success: false,
      error: "true",
      message: "Short URL already exists. Please choose a different one.",
    });
  }

  // Validate URL format
  if (!url.startsWith("https://")) {
    return Response.json({
      success: false,
      error: "true",
      message: "Please enter a valid URL that starts with https://",
    });
  }

  // Insert into DB
  await collection.insertOne({
    url,
    shorturl,
    CreatedUserEmail: email,
    CreatedAt: new Date(),
  });

  return Response.json({ success: true, error: false });
}
