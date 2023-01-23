const Csc = require('../models/eeuCscModel');

const eeuCscCtrl = {
    addCsc: async (req, res) => {
        try {
            const { region, district,csc,rsg, fullname,Agent_Id, phone, email, gender } = req.body
            console.log("cscData",region, district,csc,rsg, fullname,Agent_Id, phone, email, gender)
            const newCsc = new Csc(
                { region, district,csc,rsg, fullname,Agent_Id, phone, email, gender }
            );
              await newCsc.save();
            res.json({msg: 'Csc Add Success!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
};

module.exports = eeuCscCtrl;