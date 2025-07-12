import { redirect } from "next/navigation";
import clientPromise from "../../../lib/mongodb";

export default async function Page({ params }) {
    const { url } =await params;
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    const doc = await collection.findOne({ shorturl: url });
   console.log("Document found:", doc);

    if (doc ) {
        // Redirect to the actual destination URL
        redirect(doc.url);
    } else {
        // Redirect to home page if not found
        redirect('/');
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Redirecting...</h1>
        </div>
    );
}
