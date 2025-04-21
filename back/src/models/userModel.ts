import { Schema, model } from "mongoose";
import { hash, compare } from "bcrypt";

const UserSchema = new Schema({
	login: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

// Method to compare password
UserSchema.methods.comparePassword = function(candidatePassword:string) {
	return compare(candidatePassword, this.password);
};

// Hash password before saving
UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await hash(this.password, 10);
	next();
});

export const User = model("User", UserSchema);
