const Employee=require('../models/employeeSchema')

//post 
const createEmployee=async(req,res)=>{
    try{
        const{imageurl,name,email,mobile,designation,gender,course}=req.body;
        const employee=await Employee.create({imageurl,name,email,mobile,designation,gender,course})
        await employee.save()
        res.status(200).json(employee)
    }catch(err){
        res.status(500).json({message:'Error in posting data',error:err.message});
    }
}

//getall
const getAll=async(req,res)=>{
    try{
        const employee=await Employee.find()
        res.status(200).json(employee)
    }catch(err){
        res.status(500).json({message:'Error in getting all data',error:err.message});
    }
}

//getbyid
const getById=async(req,res)=>{
    try{
        const employee=await Employee.findById(req.params.id)
        if(!employee){
            res.status(404).json({message:'employee not found'})
        }
        res.status(200).json(employee)
    }catch(err){
        res.status(500).json({message:'Error in getbyid',error:err.message});
    }
}

//update by id
const updateEmployee=async(req,res)=>{
    try{
        const{imageurl,name,email,mobile,designation,gender,course}=req.body;
        const update_emp=await Employee.findByIdAndUpdate(req.params.id,{imageurl,name,email,mobile,designation,gender,course},{new:true})
        if(!update_emp){
            res.status(404).json({message:'employee not found to update'})
        }
        res.status(200).json(update_emp)
    }catch(err){
        res.status(500).json({message:'Error in updating id',error:err.message});
    }
}

//delete by id
const deleteEmployee=async(req,res)=>{
    try{
        const delete_emp=await Employee.findByIdAndDelete(req.params.id)
        if(!delete_emp){
            res.status(404).json({message:'employee not found to update'})
        }
        res.status(200).json(delete_emp)
    }catch(err){
        res.status(500).json({message:'Error in updating id',error:err.message});
    }
}

module.exports={createEmployee,getAll,getById,updateEmployee,deleteEmployee}