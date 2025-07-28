import User from "../models/userModel";
import { Request, Response } from "express";
import ClaimHistory from "../models/claimHistoryModel";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

export const claimPoints = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const points = Math.floor(Math.random() * 10) + 1;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { points } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const claimHistory = new ClaimHistory({
      userId: updatedUser._id,
      pointsClaimed: points,
    });
    await claimHistory.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error claiming points" });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const history = await ClaimHistory.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name");
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching claim history" });
  }
};
