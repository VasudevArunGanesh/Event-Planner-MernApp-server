const express = require("express");
const router = express.Router();
const eventSchema = require("./eventSchema");
const userSchema  = require("./userSchema")



router.get("/", (req, res) => {
    res.send({ message: "We did it!" });
  });

   router.post("/user/signup", (req, res, next) => {
    userSchema.findOne({ email: req.body.email }).then((data) => {
      if (data){console.log("Email is already in use");
        return res.json({message: "user exists with email"});
      } else {
        userSchema.create(req.body).then((data) => {
        console.log("user added");
        res.json(data);
       }).catch ((err) => {
        return next(err);
    });
    
  }});
});

  router.post("/user/login", (req, res) => {
    const { email, password } = req.body;
    userSchema.findOne({ email: email }).then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({message:"login successfull", user});
        } else {
          res.json({message: "Password incorrect"});
        }
      } else {
        res.json({message: "No record exits"});
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
        return res.json(data);
    }).catch((err) => {
        return next(err);
      });
  })

// router.post("/create-event", (req, res, next) => {
//   eventSchema.create(req.body, (err, data) => {
//     if (err) {
//       return next(err);
//     } else {
//       res.json(data);
//     }
//   });
// });



// router.delete("/delete-event/:id", (req, res, next) => {
//   eventSchema.findByIdAndRemove(req.params.id, (err, data) => {
//     if (err) {
//       return next(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// router
//   .route("/update-event/:id")
//   .get((req, res, next) => {
//     // console.log("Hi from server");
//     eventSchema.findById(req.params.id, (err, data) => {
//       if (err) {
//         return next(err);
//       } else {
//         console.log("Hi from server");
//         return res.json(data);
//       }
//     });
//   })
//   .put((req, res, next) => {
//     eventSchema.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       (err, data) => {
//         if (err) {
//           return next(err);
//         } else {
//           return res.json(data);
//         }
//       }
//     );
//   });

module.exports = router;