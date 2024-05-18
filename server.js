const express = require('express')
const connect = require("./config/db")
const Errorhandler = require("./middleware/errorhandler")
const app = express();
const nodemailer = require('nodemailer');
const signup = require("./routes/signup");
const login = require("./routes/login")
const fooditem = require("./routes/data");
const cart = require("./routes/cartitem");

const cors = require("cors")
connect();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: 'kenyatta.bergnaum79@ethereal.email',
        pass: 'uraVSVfDaTAKYdWsK2'
    },
  });

  app.post('/api/sendEmail', async (req, res) => {
    const { email, query } = req.body;

     
    const info = await transporter.sendMail({
        from: email, // sender address
        to: "mohitnandan81825@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: query, // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      res.send(info);
  
  });
  

//routes
app.use("/signup", signup );
app.use("/login", login );
app.use("/fooditem",fooditem );
app.use("/add",cart);

app.use(Errorhandler);


app.get("/api/health" ,(req,res) =>{
    res.send(`backend server is active status: active & time:${ new Date()}`)
})


// error handling
app.use(function (req, res, next) {
    res.status(404).send("Something went wrong! Please try after some time.");
  })


//connection part
const port = process.env.PORT || 3001;
const host = process.env.HOST || "localhost"
app.listen(port, () => {
    console.log(`Express server listening at http://${host}:${port}`)
})
