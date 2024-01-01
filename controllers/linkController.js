const Link = require('../models/Link.js');

const redirect = async (req, res, next) => {
    const title = req.params.title;
    try {
        const doc = await Link.findOneAndUpdate({ title }, { $inc: { views: 1 } })
        console.log(doc.views)
        if (doc) {
            res.redirect(doc.url);
        } else {
            next();
        }
    } catch (err) {
        res.send(err)
    }
}

const addLink = async (req, res) => {
    const link = new Link(req.body)
    try {
        const doc = await link.save();
        res.redirect("/")
    } catch (err) {
        res.send(err)
    }
}

const allLinks = async (req, res) => {
    try {
        const links = await Link.find({})
        // res.send(links)
        res.render("all", { links: links })
    } catch (err) {
        res.send(err)
    }
}

const deleteLink = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }
    try {
        await Link.findByIdAndDelete(id);
        res.send(id)
    } catch (err) {
        res.status(404).send(err)
    }
}

const loadLink = async (req, res) => {
    const id = req.params.id;
    try {
        const link = await Link.findById(id);
        res.render("edit", { body: link })
    } catch (err) {
        res.status(404).send(err)
    }
}

const editLink = async (req, res) => {
    const link = {};
    link.title = req.body.title;
    link.description = req.body.description;
    link.url = req.body.url;

    let id = req.params.id;
    if (!id) {
        id = req.body.id;
    }

    try {
        const doc = await Link.updateOne({ _id: id }, link);
        res.redirect('/')
    } catch (err) {
        res.render("edit", { body: req.body })
    }
}


module.exports = { redirect, addLink, allLinks, deleteLink, loadLink, editLink };


