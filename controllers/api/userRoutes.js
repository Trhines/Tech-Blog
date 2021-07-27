const router = require('express').Router()
const { User } = require('../../models')

router.post('/signUp', async (req, res) =>{   
    try{
        const newUser = await User.create({
            email: req.body.email,
            password: req.body.password,
        })
        
        res.status(204).json(newUser)
    } catch(err){
        res.status(500).json(err)
    }
    
})


router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }

  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
      const data = userData.get({ plain: true})
  
      req.session.save(() => {
        req.session.user_id = data.user_id;
        req.session.logged_in = true;
        
        res.status(204).json({ message: 'login successful'});
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.post('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy()
      res.status(204).end()
    }
    res.status(404).end()
  })

module.exports = router