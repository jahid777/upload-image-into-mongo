//akhane with out 64bit a pic rakaha hoise jar karone pic ghula ekta smy por mongodb theke vanish hoia jabe but ata amra stai kore rakte pari ta proe dhekano hobe
 
//client site ar code//////
const [allData, setAllData] = useState([]);
const handleChange = (e) => {
    const newUserInfo = { ...loggedInUser, ...serviceCard, ...allData };
    newUserInfo[e.target.name] = e.target.value;
    setAllData(newUserInfo);
  };
   const[file, setFile] = useState(null);
   const handleFile = (e) => {
      const newFile = e.target.files[0]
      setFile(newFile)
   };

   const handleSubmit = () =>{
    const formData = new FormData()
    formData.append('file', file)
    formData.append('gmailName', allData.gmailName)
    formData.append('inputName', allData.inputName)
    formData.append('email', allData.email)
    formData.append('inputEmail', allData.inputEmail)
    formData.append('photoURL', allData.photoURL)
    formData.append('id', allData.id)
    formData.append('img', allData.img)
    formData.append('inputDescription', allData.inputDescription)
    formData.append('description', allData.description)
    formData.append('title', allData.title)   
    formData.append('price', allData.price)

    fetch('http://localhost:5000/addACustomer', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.error(error)
    })
   }


   ///ayta server site ar kaj jekane 64bit kore pic to pathano hoisei sathe ai code tuku herokute deploy korleo problem hobena .sob somy server a pic upload daoer jonno ay code tuuku use korbo
   app.post('/addAProduct', (req, res) => {
    const file = req.files.file;
    const name = req.body.name;
    const date = req.body.date;
    const price = req.body.price;
    const newImg = file.data;
    const encImg = newImg.toString('base64');

    var image = {
        contentType: file.mimetype,
        size: file.size,
        img: Buffer.from(encImg, 'base64')
    };

    shopCollection.insertOne({ name, date, price,image })
        .then(result => {
            res.send(result.insertedCount > 0);
        })
})





   //server sitear kaj////////////
   app.use(express.static('customers'));
      app.use(fileUpload());
      const fileUpload = require('express-fileupload');
      const fs = require('fs-extra');

    //   (npm install fs-extra)
    //   (npm install express-fileupload)


    
  app.post('/addACustomer',(req, res)=>{
    const file = req.files.file;
    const gmailName= req.body.gmailName;
    const inputName = req.body.inputName;
    const email = req.body.email;
    const inputEmail = req.body.inputEmail;
    const photoURL = req.body.photoURL;
    const id = req.body.id;
    const img = req.body.img;
    const description = req.body.description;
    const inputDescription = req.body.inputDescription;
    const title = req.body.title;
    const price = req.body.price;
    // console.log(file,gmailName,photoURL,email,id,img,description,title,inputName,inputDescription,price, inputEmail);
    courseCollection.insertOne({ file,gmailName,photoURL,email,id,img,description,title,inputName,inputDescription,price, inputEmail })
    .then((result) => {
      res.send(result.insertedCount > 0);
    });
    file.mv(`${__dirname}/customers/${file.name}`,err =>{
      if(err){
        console.log(err)
        return res.status(500).send({msg:"can not upload"});
      }
      return res.send({name: file.name, path: `/${file.name}`})
    })
  })




  //akhane 64bit soho pic rakha hoise same code kaj ektu komano hoise just mani abr only inputer 1ta data send kroa hocee
  const [info, setInfo] = useState([]);
  const handleChange = (e) => {
      const newUserInfo = { ...info };
      newUserInfo[e.target.name] = e.target.value;
      setInfo(newUserInfo);
    };
     const[file, setFile] = useState(null);
     const handleFile = (e) => {
        const newFile = e.target.files[0]
        setFile(newFile)
     };
  
     const handleSubmit = () =>{
      const formData = new FormData()
      formData.append('file', file)
      formData.append('gmailName', info.gmailName)
      formData.append('email', info.email)
  
      fetch('http://localhost:5000/addACustomer', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error(error)
      })
     }


      //server sitear kaj witg 64bit////////////
      app.use(express.static('customers'));
      app.use(fileUpload());
      const fileUpload = require('express-fileupload');
      const fs = require('fs-extra');

    //   (npm install fs-extra)
    //   (npm install express-fileupload)


  app.post('/addACustomer',(req, res)=>{
    const file = req.files.file;
    const gmailName= req.body.gmailName;
    const email = req.body.email;
    const filePath = `${__dirname}/customers/${file.name}`;
  
    const newImg = fs.readFileSync(filePath);
    const encImg = newImg.toString('base64')

    var image = {
        contentType: req.files.file.mimeType,
        size: req.files.file.size,
        img: Buffer(encImg, 'base64')
      }


    courseCollection.insertOne({ email, gmailName, image})
    .then((result) => {
        fs.remove(filePath,error =>{
            if(error){
                console.log(error);
                res.status(500).send({msg:"can not upload"});
            }
            res.send(result.insertedCount > 0);
        })
      
    });
    file.mv(filePath,err =>{
      if(err){
        console.log(err)
         res.status(500).send({msg:"can not upload"});
      }
      return res.send({name: file.name, path: `/${file.name}`})
    })
  })

//   (clint side a dhakte hole video 55.5_5(11.24));