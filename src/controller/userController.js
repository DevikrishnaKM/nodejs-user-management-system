module.exports={
    userHome:(req,res)=>{
        const locals={
            title:"Home Page",
        }
        res.render('index',{
            locals,
            success: req.flash("success"),
            error: req.flash("error"),
            user: req.session.user,
        })
    }
}