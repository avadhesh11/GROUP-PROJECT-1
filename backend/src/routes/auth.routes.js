import express from "express";
import {signup, login, logout} from "./conto"

const router = express();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;