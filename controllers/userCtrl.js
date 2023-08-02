const userTable = require('../models/user');


const fs = require('fs');
const path = require('path');



const { CLIENT_URL } = process.env;

const userCtrl = {
  addWork: async (req, res) => {
    try {
      const { title, description , status } = req.body;

      const newTask = new userTable({
        title, description , status
      });

      await newTask.save();

      res.json({
        success: true,
        msg: 'Task Successfully added',
      });
    } catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getAllTask:async(req,res)=>{
    try{

      const video = await userTable
      .find()
      .sort({
        date: -1,
      });

      res.json({
        success: true,
        video
      });

    }catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  getTaskById:async(req,res)=>{
    try{

      const video = await userTable
      .find({_id:req.params.taskid})
      

      res.json({
        success: true,
        video
      });

    }catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  updateTaskById:async(req,res)=>{
try{
  const taskid=req.params.taskid;
  const dat = await userTable.findOneAndUpdate(
    { _id: taskid },
    {
      status:true,
      date: new Date()
      
    },
    { new: true }
  );

res.json({
  success: true,
  video:dat,
  msg:'Task updated successfully'
});
}catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  editTask:async(req,res)=>{
    try{

      const taskid=req.params.taskid;
      const { title, description , status } = req.body;
      const dat = await userTable.findOneAndUpdate(
        { _id: taskid },
        {
          title,
          description,
          status,
          date: new Date()
          
        },
        { new: true }
      );
    
    res.json({
      success: true,
      video:dat,
      msg:'Task updated successfully'
    });
    }catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  },
  deleteTask:async(req,res)=>{
    try{

      const taskid=req.params.taskid;
    const data=await userTable.findByIdAndRemove({ _id: taskid})
    res.json({
      success: true,
      msg:'Task Deleted Successfully'
    });
    }catch (err) {
      return res.json({ success: false, msg: err.message });
    }
  }
  
 
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '5m',
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

const removeTmp = (pat) => {
  fs.unlink(pat, (err) => {
    if (err) throw err;
  });
};

module.exports = userCtrl;
