import { Router } from "express";
import {
  claimPoints,
  createUser,
  getHistory,
  getUsers,
} from "../controllers/UserController";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/claim", claimPoints);
router.get("/history", getHistory);

export default router;
