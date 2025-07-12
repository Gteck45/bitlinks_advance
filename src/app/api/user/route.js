import clientPromise from "@/../lib/mongodb";

export async function POST(request) {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("users");
    const doc = await collection.findOne({ email: body.email });

    if (doc) {
        return Response.json({ success: true, error: false, message: "yeah we found you", doc });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        
        
        
        
        const client = await clientPromise;
        const db = client.db("bitlinks");
        const collection = db.collection("users");

        const doc = await collection.findOne({ email: body.email });

        if (!doc) {
            return new Response(JSON.stringify({ success: false, error: true, message: "User not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }
        
        const updateData = {};

        // Fixed: Use consistent case for username
        if (body.username !== undefined) {
            
            
            if (body.username.trim() !== "") {
                
                
                // Check if username is taken by another user (different email)
                const existingUser = await collection.findOne({
                    username: body.username,
                    email: { $ne: body.email }
                });

                if (existingUser) {
                    
                    return new Response(JSON.stringify({
                        success: false,
                        error: true,
                        message: "Username already in use by another account"
                    }), {
                        status: 409,
                        headers: { "Content-Type": "application/json" },
                    });
                }

                
                updateData.username = body.username;
            } else {
                
            }
        } else {
            
        }

        if (body.bio !== undefined && body.bio !== "") {
            updateData.Bio = body.bio;
        }

        if (body.profilepic !== undefined && body.profilepic.trim() !== "") {
            updateData.profilepic = body.profilepic;
        }

        if (body.title !== undefined && body.title.trim() !== "") {
            updateData.Title = body.title;
        }

        if (body.socialLinks !== undefined && Object.keys(body.socialLinks).length > 0) {
            // Filter out empty links
            const filteredLinks = Object.fromEntries(
                Object.entries(body.socialLinks).filter(([_, value]) => value && value.trim() !== "")
            );

            if (Object.keys(filteredLinks).length > 0) {
                updateData.socialLinks = filteredLinks;
            }
        }

        // Add audit info
        updateData.updatedAt = new Date();

        

        const result = await collection.updateOne(
            { email: body.email },
            { $set: updateData }
        );

        

        return new Response(JSON.stringify({ 
            success: true, 
            error: false, 
            message: "Profile updated successfully",
            modifiedCount: result.modifiedCount 
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
        
    } catch (error) {
        
        return new Response(JSON.stringify({ 
            success: false, 
            error: true, 
            message: "Internal server error", 
            details: error.message 
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}