'use strict'

/**
 * Page路由
 */

module.exports = router => {

  router.get("/home", (req,res,next)=>{res.render("home")})
  router.get("/buttons", (req,res,next)=>{res.render("buttons")})
  router.get("/calendar", (req,res,next)=>{res.render("calendar")})
  router.get("/editors", (req,res,next)=>{res.render("editors")})
  router.get("/form", (req,res,next)=>{res.render("form")})
  router.get("/interface", (req,res,next)=>{res.render("interface")})
  router.get("/login", (req,res,next)=>{res.render("login")})
  router.get("/stats", (req,res,next)=>{res.render("stats")})
  router.get("/tables", (req,res,next)=>{res.render("tables")})

  router.get("/", (req,res,next)=>{res.render("page/attention_uper")})
  router.get("/uper", (req,res,next)=>{res.render("page/uper")})
  router.get("/attention_uper", (req,res,next)=>{res.render("page/attention_uper")})
  router.get("/attention_cartoon", (req,res,next)=>{res.render("page/attention_cartoon")})
  router.get("/data_cartoon", (req,res,next)=>{res.render("page/data_cartoon")})
  router.get("/data_uper", (req,res,next)=>{res.render("page/data_uper")})
  router.get("/export", (req,res,next)=>{res.render("page/export")})
}