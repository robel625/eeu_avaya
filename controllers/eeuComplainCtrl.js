const mongoose = require('mongoose');
const Complain = require('../models/eeuComplainModel');

const counterSchema= {
    id:{type:String},
    seq:{type:Number}
 }
 const countermodel=mongoose.model("counter",counterSchema)

 const eeuCompCtrl = {

   createComplain: async (req, res) => {

          let seqId="15";
        try {

            const {bp, description,catagory1,catagory2,phone,address, status,customer_id, name, rsg, created_by } = req.body

            const existstatus = ["new","Dispatcher Required", "Inspection Required","Issue due to EEU","In Progress","EAM order Required" ]
            const complain_new = await Complain.findOne({customer_id, catagory1, status: existstatus});
        
            if (complain_new)
               return res.status(400).json({ msg: `There is already an open ${complain_new.id}` });
            
           
           
           await countermodel.findOneAndUpdate(
            {id:'complain'},
            {"$inc":{"seq":1}},
            {new:true},(err,cd)=>{
                
                if(cd==null)
                {
                    const newval=new countermodel({id:'complain',seq:8000})
                    newval.save()
                }else{
                    seqId= cd.seq.toString()
                }
            }
            )

            console.log("seqId",seqId)

            
            
            const  newComplain = new Complain(
                {bp, description,catagory1,catagory2, phone, address, status,customer_id, name, rsg, created_by, id: seqId  }
            );
              await newComplain.save();
            res.json({msg: 'Complain Add Success!',
                       saved: newComplain
                })
            console.log("complainDataSaved",newComplain.id)
        
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getComplain: async (req, res) => {
        try {
            const customerid = req.params.id.toString()
            //const complain = await Complain.find({customer_id : req.params.id})
            const id = req.params.id;
            const complain = await Complain.aggregate([
                { $match: { $expr : { $eq: [ '$customer_id' , { $toObjectId: id } ] } } },
            ])


        res.json({complain})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },

    getComplainRequest: async (req, res) => {
        try {
            const id = req.params.id;
            const complain = await Complain.aggregate([
                { $match: { $expr : { $eq: [ '$_id' , { $toObjectId: id } ] } } },
                {$lookup: {
                    from: "keycustomers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer",
                  }},
                  {$unwind: {
                    path: "$customer",
                    preserveNullAndEmptyArrays: true
                }},
            ])


        res.json({complain})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },
        
  searchComplain: async (req, res) => {
    try {
        const bp = req.query.bp
        console.log("complain req.query.bp",req.query.bp,req.query.phone,req.query.requestid)
        //const complain = await Complain.findOne({bp})
        const complain = await Complain.aggregate([
            {$match: {bp: {$regex: req.query.bp}}},
           {$match: {phone: {$regex: req.query.phone,$options:'i'}}},
           {$match: {id: {$regex: req.query.requestid}}},
           {$lookup: {
            from: "keycustomers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer",
          }},
          {$unwind: {
            path: "$customer",
            preserveNullAndEmptyArrays: true
        }},
        ])
        
        res.json({complain})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

   },

   editComplain: async (req, res) => {
           try{
            const editComplain = req.body
            const complain = await Complain.findOneAndUpdate({_id : req.params.id},editComplain)
            res.json({msg: "Update Success!"})

           } catch (err) {
            return res.status(500).json({msg: err.message})
        }
   },

   complainbyagent: async (req, res) => {
    try{
        if(req.user.role === 'SV')
        {
        const complain = await Complain.find({rsg : req.user.rsg})
        .populate('customer_id')
        res.json({complain})
        }
        else if(req.user.role === 'CC'){
            const complain = await Complain.find({created_by : req.user.username})
            .populate('customer_id')
            res.json({complain})
        }

        

       } catch (err) {
        return res.status(500).json({msg: err.message})
    }
   }
    
};

module.exports = eeuCompCtrl;