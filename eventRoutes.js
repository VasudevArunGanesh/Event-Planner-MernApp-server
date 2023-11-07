const express = require("express");
const router = express.Router();
const eventSchema = require("./eventSchema");
const userSchema  = require("./userSchema")



router.get("/", (req, res) => {
    res.send({ message: "We did it!" });
  });

  router.post("/user/signup", (req, res, next) => {
    console.log(req.body);
    userSchema.create(req.body).then((data) => {
        console.log("user added");
        res.json(data);
    })
      .catch ((err) => {
        return next(err);
    });
   });

  router.post("/user/login", (req, res) => {
    const { email, password } = req.body;
    userSchema.findOne({ email: email }).then((user) => {
      if (user) {
        // databasepassword === given password
        if (user.password === password) {
          console.log("login successfull");
        } else {
          res.json("Password incorrect");
        }
      } else {
        console.log("No record exits");
      }
    });
  });
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