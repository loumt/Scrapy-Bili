'use strict'

/**
 * Page路由
 */
const NavigationController = require('../controllers/NavigationController');

module.exports = router => {
  router.get("/", (req,res,next)=>{res.render("uper")})
  router.get("/home", (req,res,next)=>{res.render("home")})
  router.get("/buttons", (req,res,next)=>{res.render("buttons")})
  router.get("/calendar", (req,res,next)=>{res.render("calendar")})
  router.get("/editors", (req,res,next)=>{res.render("editors")})
  router.get("/form", (req,res,next)=>{res.render("form")})
  router.get("/interface", (req,res,next)=>{res.render("interface")})
  router.get("/login", (req,res,next)=>{res.render("login")})
  router.get("/stats", (req,res,next)=>{res.render("stats")})
  router.get("/tables", (req,res,next)=>{res.render("tables")})
  router.get("/uper", (req,res,next)=>{res.render("uper")})
  router.get("/up_attention", (req,res,next)=>{res.render("up_attention")})
  router.get("/cartoon_attention", (req,res,next)=>{res.render("cartoon_attention")})
  router.get("/data", (req,res,next)=>{res.render("data")})
  router.get("/cartoon", (req,res,next)=>{res.render("cartoon")})
  router.get("/up-search", (req,res,next)=>{res.render("up-search")})


  router.get("/navigation",NavigationController.info() )
}