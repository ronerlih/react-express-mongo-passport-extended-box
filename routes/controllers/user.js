// get reference to DB 
const db = require('../../models');
const { encrypt, decrypt } = require("../../scripts/crypto");

module.exports = {

   // login user
	login: (req, res, next) => {
      
      //validate request
		if (req.body.email && req.body.password) {
           
			db.User.authenticate( encrypt(req.body.email), req.body.password, function (error, user) {
            
            // check error (including no user)
            if (error || !user) {
               const err =  new Error('incorrect credentials, no user found')
               next(err)

            // user found
				} else {
               // save user to session to match on login
               req.session.user = user;
               console.log('login:', user.firstname, '\n!Bad practice, dont log users info')
					return res.json(user);
				}
         });

      // request missing fields
		} else {
			var err = new Error('All fields required.');
			err.status = 400;
			return next(err);
		}
   },

   // signup user
   create: (req, res) => {
   
      // create user in db
      db.User.create({
         firstname: req.body.firstname,
         email: encrypt(req.body.email),
         password: req.body.password
      })

      // redirect to login
      .then(() => res.redirect(307, '/api/user/login'))
      .catch(err => {
         console.log(err.message)
         res.status(401).json(err.message)
      });
   },
      
   signout: (req, res) => {
      console.log('signed out:', req.session.user.firstname )
      // destroy session
      req.session.destroy();
      // clear cookie on the client side
      res
         .status(200)
         .clearCookie('__id')
         .json({msg:'successfuly signed out'});
   },
   
   // authenticate user
	authenticate: (req, res, next) => {
      req.session.user
         ? console.log('\ncurrect session user: ', req.session.user)
         : console.log('\nno user on session')
      
      // return user or no content
      req.session.user
         ? res.json(req.session.user)
         : res.status(204).json(req.session.user)
   },
};
