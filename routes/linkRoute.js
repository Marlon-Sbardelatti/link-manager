const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController.js')

router.get("/", linkController.allLinks)
router.get("/:title", linkController.redirect)
router.get('/add', (req, res) => {
    res.render("index")
});
router.get('/edit/:id', linkController.loadLink);

router.post("/", express.urlencoded({ extended: true }), linkController.addLink)
router.post("/edit/:id", express.urlencoded({extended: true}), linkController.editLink)

router.delete("/:id", linkController.deleteLink);
router.delete("/", express.json({ extended: true }), linkController.deleteLink);

module.exports = router;
