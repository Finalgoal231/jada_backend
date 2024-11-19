import express from "express";
import passport from "passport";
import { login, register } from "../controllers/AuthController";
import {
  getCampaign,
  updateCampaign,
  encryptLead,
} from "../controllers/CampaignController";

const router = express.Router();

/************************************ Auth ************************************/
router.post("/login", login);
router.post("/register", register);

/************************************ Campaign ************************************/
router.get(
  "/campaign",
  passport.authenticate("jwt", { session: false }),
  getCampaign
);

router.get(
  "/campaign/encrypt_lead",
  passport.authenticate("jwt", { session: false }),
  encryptLead
);

router.put(
  "/campaign/:lead_id",
  passport.authenticate("jwt", { session: false }),
  updateCampaign
);

export default router;
