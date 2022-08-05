const {
    register,
    login,
    allmovies,
    addmovies,
    getmoviesbyid,
    updatemoviesbyid,
    deletemoviesbyid
} = require('../Controllers/AuthControllers');
const { checkUser } = require('../Middlewares/authMiddlewares');

const router = require('express').Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", checkUser)
router.get("/getallmovies", allmovies);
router.post("/addnewmovies", addmovies);
router.get("/getallmovies/:id", getmoviesbyid);
router.put("/updatemovies/:id",updatemoviesbyid);
router.delete("/deletemovies/:id",deletemoviesbyid);

module.exports = router;