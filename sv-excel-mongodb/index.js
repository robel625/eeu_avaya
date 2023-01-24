const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();

app.use(express.json());

const http = require('http').createServer(app);


let MongoClient = require('mongodb').MongoClient;
let URI = "mongodb://localhost:27017/socialmedia";

const excelToJson = require('convert-excel-to-json');


global.__basedir = __dirname;

const storage = multer.diskStorage({
    distination: (req, file, cb) => {
        cb(null, __basedir + './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storage});


app.post('/api/uploadfile', upload.single("uploadFile"), (req, res) =>{
     console.log('file_path');
    importExcelData2MongoDB(__basedir + '/uploads/' + req.file.filename);
    res.json({
        'msg': 'File uploaded/import succesfully!', 'file': req.file
    })
})

function importExcelData2MongoDB(filePath){
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets:[{
            name: 'Sheet1',

            header:{
                rows: 1
            },
            /**------ for AA----------- */
            columnToKey: {
                A: 'id',
                B: 'avatar',
                C: 'role',
                D: 'gender',
                E: 'mobile',
                F: 'address',
                G: 'story',
                H: 'fullname',
                I: 'username',
                J: 'email',
                K: 'password',
                L: 'csc',
                M: 'rsg',
            }

        },{
            name: 'Sheet2',

            header:{
                rows: 1
            },
            /**------ for finfine zuria customers----------- */
            columnToKey: {
                A: 'id',
                B: 'avatar',
                C: 'role',
                D: 'gender',
                E: 'mobile',
                F: 'address',
                G: 'story',
                H: 'fullname',
                I: 'username',
                J: 'email',
                K: 'password',
                L: 'csc',
                N: 'rsg',
                R: 'district'
            }

        }]
    });

    console.log(excelData);

    MongoClient.connect(URI, { useNewUrlParser: true}, (err, db) => {
        if (err) throw err;
        let dbo = db.db('socialmedia');
        dbo.collection("users1").insertMany(excelData.Sheet1, (err, res) => {
            if (err) throw err;
            console.log("Number of documents inserted: "+ res.insertedCount);

            //db.close();
        });
        dbo.collection("users1").insertMany(excelData.Sheet2, (err, res) => {
            if (err) throw err;
            console.log("Number of documents inserted: "+ res.insertedCount);

            //db.close();
        });
        
    });

    fs.unlinkSync(filePath);
}

http.listen(8080, () => {
  console.log('Server is running on port', 8080);
});
