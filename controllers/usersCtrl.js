const Users = require('../models/userModel')

const usersCtrl = {
    getAllUsers: async (req, res) => {
        try {
            const users = await Users.find()
            
            res.json({users})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateUser1: async (req, res) => {
        try{
            const { fullname, username, role, rsg, password, mobile, email, address,region, district, csc } = req.body
            console.log(req.params.id,fullname, username, role, rsg, password, mobile, email, address,region, district, csc)
            const user = await  Users.findOneAndUpdate({_id : req.params.id}, {fullname, username, role, rsg, password, mobile, email, address,region, district, csc})
                       
               
            res.json({msg: "Update Success!"})
    
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
        },


        addUser1: async (req, res) => {
            try {
                const { fullname, username, role, rsg, password, mobile, email, address, region, district, csc } = req.body
                console.log(fullname, username, role, rsg, password, mobile, email, address, region, district, csc)
                const user = new Users({
                    fullname, username, role, rsg, password, mobile, email, address, region, district, csc
                  });
                  await user.save();
                res.json({msg: 'User Add Success!'})
    
            } catch (err) {
                return res.status(500).json({msg: err.message})
            }
        },


   
}


module.exports = usersCtrl