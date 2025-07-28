import { model, Schema, Document } from "mongoose";

export interface IClaimHistory extends Document {
  userId: Schema.Types.ObjectId;
  pointsClaimed: number;
}

const claimHistorySchema = new Schema<IClaimHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pointsClaimed: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IClaimHistory>("ClaimHistory", claimHistorySchema);
