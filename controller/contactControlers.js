import asyncHandler from "express-async-handler";
import Contact from "../models/contacSchema.js";


export const getAllContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id });
    res.json(contact);
});

export const createContacts = asyncHandler(async (req, res) => {


    const { name, email, phone, } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("all fields are mendatory");
    }
    const contact = await Contact.create({
        name, email, phone, user_id: req.user.id
    });
    res.status(201).json(contact);
});


export const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ message: "contact not found" })
    }
    res.json(contact);
});


export const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ message: "contact not found" });
    }
    if (contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error(`you can't update another user`);
    }


    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(201).json(updatedContact);

});


export const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404).json({ message: "contact not found" })
    }
    if (contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error(`you can't delete another user`);
    }
    await Contact.findOneAndDelete(req.params.id);
    res.json({ message: "contact deleted successfully" });
});

