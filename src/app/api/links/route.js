import clientPromise from "@/../lib/mongodb";
import { ObjectId } from "mongodb";
export async function POST(request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return new Response(JSON.stringify({
                success: false,
                error: true,
                message: "Email is required.",
            }), { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("bitlinks");
        const collection = db.collection("url");

        // Fetch all URLs created by this user
        const urls = await collection.find({ CreatedUserEmail: email }).toArray();

        return new Response(JSON.stringify({
            success: true,
            error: false,
            data: urls,
        }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: true,
            message: "Internal server error.",
            details: error.message,
        }), { status: 500 });
    }
}



export async function DELETE(request) {
    try {
        const body = await request.json();
        const { id } = body;

        if (!id) {
            return new Response(JSON.stringify({
                success: false,
                error: true,
                message: "ID is required.",
            }), { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("bitlinks");
        const collection = db.collection("url");

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return new Response(JSON.stringify({
                success: false,
                error: true,
                message: "No URL found with that ID.",
            }), { status: 404 });
        }

        return new Response(JSON.stringify({
            success: true,
            error: false,
            message: "URL deleted successfully.",
        }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({
            success: false,
            error: true,
            message: "Internal server error.",
            details: error.message,
        }), { status: 500 });
    }
}
