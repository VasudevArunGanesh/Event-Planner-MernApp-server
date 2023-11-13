const express = require("express");
const router = express.Router();
const eventSchema = require("./eventSchema");
const userSchema  = require("./userSchema");
const bcrypt = require('bcrypt');


router.patch("/", (req,res) =>{
  for (var event of req.body){
    var filter = { _id: event._id };
    eventSchema.findOneAndUpdate(filter, event, {
      new: true
    }).then((data) => {
      // console.log(data.eventName, "updated");
    }) 
  }
  console.log("db updated");
  res.json({message: "db updated"});
})

router.get("/", (req, res) => {
  eventSchema.find({}).then((data) => {
    res.json(data);
  }).catch((err) => {
    return next(err);
  })
  });


  router.get("/public-events", (req, res) => {
    eventSchema.find({isPrivate: false}).then((data) => {
      res.json(data);
    }).catch((err) => {
      return next(err);
    })
    });

  

  
//    router.post("/user/signup", (req, res, next) => {
//     userSchema.findOne({ email: req.body.email }).then((data) => {
//       if (data){console.log("Email is already in use");
//         return res.json({message: "user exists with email"});
//       } else {
//         userSchema.create(req.body).then((data) => {
//         console.log("user added");
//         res.json(data);
//        }).catch ((err) => {
//         return next(err);
//     });
    
//   }});
// });

router.post("/user/signup", (req, res, next) => {
  userSchema.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      console.log("Email is already in use");
      return res.json({ message: "User exists with email" });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashPassword) => {
        if (err) {
          return next(err);
        }

        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: hashPassword,
        };

        userSchema.create(newUser).then((data) => {
          console.log("User added", newUser);
          res.json(data);
        }).catch((err) => {
          return next(err);
        });
      });
    }
  });
});

  // router.post("/user/login", (req, res) => {
  //   const { email, password } = req.body;
  //   userSchema.findOne({ email: email }).then((user) => {
  //     if (user) {
  //       if (user.password === password) {
  //         res.json({message:"login successfull", user});
  //       } else {
  //         res.json({message: "Password incorrect"});
  //       }
  //     } else {
  //       res.json({message: "No record exits"});
  //     }
  //   });
  // });

  router.post("/user/login", (req, res) => {
    const { email, password } = req.body;
    userSchema.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.json({ message: "error" });
          } else if (result) {
            res.json({ message: "login successful", user});
          } else {
            res.json({ message: "password incorrect" });
          }
        });
      } else {
        res.json({message: "no record exists" });
      }
    });
  });

  router.get("/user/:id/createevent", (req, res, next) => {
    userSchema.findById(req.params.id).then((data) => {
        return res.json(data);
    }).catch((err) => {
        return next(err);
      });
  })

  router.get("/user/:id", (req, res, next) => {
    userSchema.findById(req.params.id).then((data) => {
      console.log("user details sent");
        return res.json(data);
    }).catch((err) => {
        return next(err);
      });
  })

  router.post("/user/createevent", (req, res, next) => {
    console.log(req.body);
    eventSchema.create(req.body).then((data) => {
        console.log("event created");
        res.json(data);
    })
      .catch ((err) => {
        return next(err);
    });
   });

   router.get("/events/:eid", (req, res, next) => {
    eventSchema.findById(req.params.eid).then((data) => {
        return res.json(data);
    }).catch((err) => {
        return next(err);
      });
   })

    
   router.patch("/events/update/:eid", async (req, res, next) => {
    const filter = { _id: req.params.eid };
    await eventSchema.findOneAndUpdate(filter, req.body, {
      new: true
    }).then((data) => {
      console.log(data, "updated");
      return res.json(data);
    }).catch((err) => {
      return next(err);
    });
   } )

   

   router.get("/user/:id/home", (req, res, next) => {
    userSchema.findById(req.params.id).then((data) => {
        return res.json(data);
    }).catch((err) => {
        return next(err);
      });
  })



router.patch('/user/:id/update-pass', async (req, res, next) => {

  try {
    // const { id } = req.params;
    const { id, currentPassword, newPassword } = req.body;
    const user = await userSchema.findById(id);
    if (!user) {
      return res.json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.json({ message: 'Current password is incorrect' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

module.exports = router;