const adminLayout = "./layouts/adminLayout.ejs";
const User = require('../model/userSchema')


module.exports = {

  getDashboard: async (req, res) => {
    const locals = {
      title: "User Management",
    };

    const messages = await req.flash("info");

    let perPage = 12;
    let page = req.query.page || 1;

    const users = await User.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
    const count = await User.countDocuments();

    res.render("admin/dashboard", {
      locals,
      users,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
      success:req.flash('success'),
      error:req.flash('error'),
      layout: adminLayout
    });
  },
  /**
   * View Edit 
   */
  
  viewUser: async (req,res) => {
    console.log(req.params)

    const user = await User.findById(req.params.id)

    if(user){
      res.render('admin/view', {
        user: user,
        success: req.flash('success'),
        error: req.flash('error'),
        layout:adminLayout
      })
    }
  },
  editUser: async (req,res) => {
    console.log(req.params)

    const user = await User.findById(req.params.id)

    if(user){
      res.render('admin/edit', {
        user: user,
        success: req.flash('success'),
        error: req.flash('error'),
        layout:adminLayout
      })
    }
  },
  //update
  editPost: async (req,res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        updatedAt: Date.now(),
      });
      req.flash('success','user updated successfully');
      // res.redirect(`/admin/view/${req.params.id}`);
      res.redirect("/admin");
  
      console.log("redirected");
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (req,res) => {
    try {
      await User.deleteOne({ _id: req.params.id });
      res.redirect("/admin");
    } catch (error) {
      console.log(error);
    }
  },
  

};