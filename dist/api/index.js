"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _AuthController = require("../controllers/AuthController");
var _CampaignController = require("../controllers/CampaignController");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

/************************************ Auth ************************************/
router.post("/login", _AuthController.login);
router.post("/register", _AuthController.register);

/************************************ Campaign ************************************/
router.get("/campaign", _passport["default"].authenticate("jwt", {
  session: false
}), _CampaignController.getCampaign);
router.get("/campaign/encrypt_lead", _passport["default"].authenticate("jwt", {
  session: false
}), _CampaignController.encryptLead);
router.put("/campaign/:lead_id", _passport["default"].authenticate("jwt", {
  session: false
}), _CampaignController.updateCampaign);
var _default = exports["default"] = router;