const KeyCustomers = require('../models/keyCustomersModel');

const eeuCtrl = {
    addCustomer: async (req, res) => {
        try {
            const { bp, region, district,csc,rsg, name, phone, email, address } = req.body
            console.log(bp, region, district,csc,rsg, name, phone, email, address)
            const newCustomer = new KeyCustomers({
                bp, region, district,csc,rsg, name, phone, email, address
              });
              console.log(bp, region, district,csc,rsg, name, phone, email, address)
              await newCustomer.save();
            res.json({msg: 'Customer Add Success!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    searchCustomer: async (req, res) => {
        try {
            //!bp && !canumber && !customerid && !fullname && !phone

            //const customer = await Customers.find({canumber: {$regex: req.query.canumber}})
           // .limit(10)
            const customer = await KeyCustomers.aggregate([
                {$match: {bp: {$regex: req.query.bp}}},
               {$match: {phone: {$regex: req.query.phone,$options:'i'}}},
               {$match: {name: {$regex: req.query.name,$options:'i'}}},
               {$match: {rsg: {$regex: req.query.rsg,$options:'i'}}},
               {$lookup: {
                from: "users1",
                localField: "rsg",
                foreignField: "rsg",
                as: "responsbile",
              }},
            ])
            
            res.json({customer})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }, 
    getCustomer: async (req, res) => {
        try {
           // const customer = await KeyCustomers.findById(req.params.id)
            //.populate("RSG")
            const id = req.params.id;
            const customer = await KeyCustomers.aggregate([
                { $match: { $expr : { $eq: [ '$_id' , { $toObjectId: id } ] } } },
               {$lookup: {
                from: "users1",
                localField: "rsg",
                foreignField: "rsg",
                as: "responsbile",
              }},
            ])

            if(!customer) return res.status(400).json({msg: "customer does not exist."})
            
            res.json({customer})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    customerdetail: async (req, res) => {
        try {
            const id = req.params.id;
            console.log("id",id)
            const customer = await KeyCustomers.aggregate([
                { $match: { $expr : { $eq: [ '$_id' , { $toObjectId: id } ] } } },
                {$lookup: {
                    from: "users1",
                    localField: "rsg",
                    foreignField: "rsg",
                    as: "responsbile",
                  }},
                  {$lookup: {
                    from: "eeucomplains",
                    localField: "_id",
                    foreignField: "customer_id",
                    as: "complains",
                  }},

            ])
            //.populate("RSG")
            if(!customer) return res.status(400).json({msg: "customer does not exist."})
            
            res.json({customer})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateCustomerstring: async (req, res) => {
        // try {
            const customer = await KeyCustomers.findOne({id : req.params.id})
            .then(result => {
                if  (result) {
                    console.log("result",result)
                     KeyCustomers.findOneAndUpdate({_id: result._id}, {bp: result.bp, phone: result.phone})
                       .then(result2 => { if  (result2) { console.log("result2",result2)}})
                    console.log("fau", result._id)
                } else {
                    console.log("err")
                }
              })
           
           res.json({customer})
           // res.data.customer.json({customer})
            //.populate("RSG")
            
        // } catch (err) {
        //     return res.status(500).json({msg: err.message})
        // }
    },

    updateCustomer: async (req, res) => {
    try{
        const { bp, region, district,csc,rsg, name, phone, email, address } = req.body
        console.log(req.params.id,bp, region, district,csc,rsg, name, phone, email, address)
        const customer = await  KeyCustomers.findOneAndUpdate({_id : req.params.id}, {bp, region, district,csc,rsg, name, phone, email, address})
                   
           
        res.json({msg: "Update Success!"})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    },
};

   

module.exports = eeuCtrl;