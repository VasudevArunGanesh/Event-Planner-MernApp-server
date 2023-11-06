const express = require("express");
const router = express.Router();
const eventSchema = require("./eventSchema");

// router.post("/create-event", (req, res, next) => {
//   eventSchema.create(req.body, (err, data) => {
//     if (err) {
//       return next(err);
//     } else {
//       res.json(data);
//     }
//   });
// });

// router.get("/", (req, res, next) => {
//   eventSchema.find((err, data) => {
//     if (err) {
//       return next(err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

// router.post("/login", (req, res) => {
//   const { name, email, password } = req.body;
//   eventSchema.findOne({ email: email }).then((event) => {
//     if (event) {
//       // databasepassword === given password
//       if (event.password === password) {
//         res.json("login successfull");
//       } else {
//         res.json("Password incorrect");
//       }
//     } else {
//       console.log("No record exits");
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
