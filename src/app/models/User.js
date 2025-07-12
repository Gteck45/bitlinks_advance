import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String },
    username: { type: String, required: true },
    profilepic: { type: String },
    coverpic: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
     title:{type: String, default: "User"},
    provider: { type: String, required: true },

            Bio: {type: String, default: "This is my bio"},
            socialLinks: {
              github: { type: String, default: "" },
              x_com: { type: String, default: "" },
              linkedin: { type: String, default: "" },
              instagram: { type: String, default: "" },
              dribbble: { type: String, default: "" },
              dev: { type: String, default: "" }
            },
            isHaveplan: { type: Boolean, default: false },
            plan: { type: String, default: "" },
            profileVsitCount: { type: Number, default: 0 },
            accountType: { type: String, default: "public" } ,

            
});

export default mongoose.models.User || model('User', UserSchema);
