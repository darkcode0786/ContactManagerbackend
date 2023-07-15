import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import  {createContacts, deleteContact, getAllContacts,getContact, updateContact}  from "../controller/contactControlers.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const router = express.Router();
router.use(validateToken);
router.route("/").get(getAllContacts).post(createContacts);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);



export default router;