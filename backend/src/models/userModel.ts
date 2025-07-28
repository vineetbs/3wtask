import { model, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  points: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    points: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", userSchema);
