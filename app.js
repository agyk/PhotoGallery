const express = require('express')
let multer  = require('multer')
const fs = require('fs')
const port = 3000
const app = express()
const cors = require("cors")
const path = require('path');

app.use(express.json())
app.use(cors())

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(req.body)
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage })

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

app.get('/uploads',(req,res)=>{
  const data = fs.readFileSync(__dirname+"/uploads/data.json")
  
  const uploadedInfos = JSON.parse(data)

  res.json(uploadedInfos);
});


app.post('/profile-upload-single', upload.single('profileFile'), function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  const photographerName = req.body.photographerName
  const photoTitle = req.body.photoTitle
  const photoUrl = req.file.path
  const newUploader = {
    "photographerName":photographerName,
    "photoTitle":photoTitle,
    "photoUrl":photoUrl
  }
  
  const data = fs.readFileSync(__dirname+"/uploads/data.json")
  const datas = JSON.parse(data)
  datas.push(newUploader)
  const newData = JSON.stringify(datas)
  const uploadPath = __dirname + "/./uploads/" + "data.json";
  fs.writeFileSync(uploadPath, newData)
  
  var response = '<a href="/">Home</a><br>'
  // response += "Files uploaded successfully.<br>"
  // response += `<p>${newData}</p>`
  // response += `<img src="${req.file.path}" />`
  response =req.file.path
  response += newData
  return res.send(response)

})



  app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
    //req.files is array of `profile-files` files
   // req.body will contain the text fields, if there were any
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    for(var i=0;i<req.files.length;i++){
        response += `<img src="${req.files[i].path}" /><br>`
    }
    
    return res.send(response)
})


 app.delete("/", (req, res) => {
   	const uploadPath = __dirname + "/./uploads/" + "data.json";
   
   	if (fs.existsSync(uploadPath)) {
   		fs.unlinkSync(uploadPath, (err) => {
   			if (err) {
   				console.log(err);
   				return res.status(500).send(err);
   			}
   		});
   	}

   	return res.status(200).send("done");
   });
  
app.listen(3000, () => {
    console.log('Server runs on port 3000')
})






// app.get("/photo.jpg", (req, res) =>
// 	res.sendFile(path.join(`${__dirname}/../backend/data/photo.jpg`))
// );

// app.post("/", (req, res) => {
// 	console.log("run")
// 	console.log(req.body)
// 	const pictureUploadPath = __dirname + "/../backend/data/" + "photo.jpg";

// 	if (req.files) {
// 		const uploadedPicture = req.files.picture;
// 		uploadedPicture.mv(pictureUploadPath, (err) => {
// 			if (err) {
// 				console.log(err);
// 				return res.status(500).send(err);
// 			}
// 		});
// 	}

// 	const fileData = JSON.parse(JSON.stringify(req.body));
// 	fileData.picture = "/photo.jpg";
// 	const fileDataString = JSON.stringify(fileData, null, 2);
// 	const uploadPath = __dirname + "/../backend/data/" + "data.json";

// 	fs.writeFileSync(uploadPath, fileDataString, (err) => {
// 		if (err) {
// 			console.log(err);
// 			return res.status(500).send(err);
// 		}
// 	});

// 	return res.send(fileDataString);
// });







//configure the server port
