const express = require("express");
const router = express.Router();
const eventSchema = require("./eventSchema");
const userSchema  = require("./userSchema");

// var multer = require('multer');
 
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// var upload = multer({ storage: storage });
// router.use(express.bodyParser({limit: '50mb'}));

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

    
  //  router.get('/', (req, res) => {
  //      eventSchema.find({})
  //      .then((data, err)=>{
  //          if(err){
  //              console.log(err);
  //          }
  //          res.render('imagepage',{items: data})
  //      })
  //  });
    
    
  //  router.post('/', upload.single('image'), (req, res, next) => {
    
  //      var obj = {
  //          name: req.body.name,
  //          desc: req.body.desc,
  //          img: {
  //              data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
  //              contentType: 'image/png'
  //          }
  //      }
  //      imgSchema.create(obj)
  //      .then ((err, item) => {
  //          if (err) {
  //              console.log(err);
  //          }
  //          else {
  //              // item.save();
  //              res.redirect('/');
  //          }
  //      });
  //  });










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