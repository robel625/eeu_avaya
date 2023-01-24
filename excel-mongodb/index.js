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
          /**------ for supervisor----------- */
            // columnToKey: {
            //     A: '_id',
            //     B: 'name',
            //     C: 'District',
            //     D: 'CSC',
            //     E: 'agent_id',
            //     F: 'Phone No'
            // }
            /**------ for AA----------- */
            columnToKey: {
                A: 'id',
                D: 'bp',
                C: 'name',
                E: 'phone',
                F: 'remark',
                B: 'district',
                G: 'rsg'
            }
        /**------ for finfine zuria customers----------- */
            // columnToKey: {
            //     A: 'id',
            //     C: 'district',
            //     F: 'customer name',
            //     E: 'bp',
            //     G: 'Phone No',
            //     I: 'rsg',
            //     D: 'csc',
            // }

        },{
            name: 'Sheet2',

            header:{
                rows: 1
            },
            /**------ for AA----------- */
            columnToKey: {
                A: 'id',
                D: 'bp',
                C: 'name',
                E: 'phone',
                F: 'remark',
                B: 'district',
                G: 'rsg'
            }

        },{
            name: 'Sheet3',

            header:{
                rows: 1
            },
            /**------ for AA----------- */
            columnToKey: {
                A: 'id',
                D: 'bp',
                C: 'name',
                E: 'phone',
                F: 'remark',
                B: 'district',
                G: 'rsg'
            }

        },{
            name: 'Sheet4',

            header:{
                rows: 1
            },
            /**------ for AA----------- */
            columnToKey: {
                A: 'id',
                D: 'bp',
                C: 'name',
                E: 'phone',
                F: 'remark',
                B: 'district',
                G: 'rsg'
            }

        },{
            name: 'Sheet5',

            header:{
                rows: 1
            },
            /**------ for finfine zuria customers----------- */
            columnToKey: {
                A: 'id',
                E: 'bp',
                F: 'name',
                G: 'phone',
                C: 'district',
                D: 'csc',
                I: 'rsg',
                
            }

        }]
    });

    console.log(excelData);

    MongoClient.connect(URI, { useNewUrlParser: true}, (err, db) => {
        if (err) throw err;
        let dbo = db.db('socialmedia');
        dbo.collection("keycustomers").insertMany(excelData.Sheet1, (err, res) => {
            if (err) throw err;
            console.log("Number of documents inserted: "+ res.insertedCount);

            //db.close();
        });
        dbo.collection("keycustomers").insertMany(excelData.Sheet2, (err, res) => {
            if (err) throw err;
            console.log("Number of documents inserted: "+ res.insertedCount);

            //db.close();
        });
        dbo.collection("keycustomers").insertMany(excelData.Sheet3, (err, res) => {
            if (err) throw err;
            console.log("Number of documents inserted: "+ res.insertedCount);

            //db.close();
        });
        dbo.collection("keycustomers").insertMany(excelData.Sheet4, (err, res) => {
            if (err) throw err;
            console.log("Number of documents inserted: "+ res.insertedCount);

            //db.close();
        });
        dbo.collection("keycustomers").insertMany(excelData.Sheet5, (err, res) => {
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
