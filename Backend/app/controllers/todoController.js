
// Create
export const store=async (req,res)=>{
    return res.json({
        status:"success",
        message:"Item created successfully"
    })
}


// Read
export const show=async (req,res)=>{
    return res.json({
        status:"success",
        message:"Item show successfully"
    })
}


// Update
export const update=async (req,res)=>{
    return res.json({
        status:"success",
        message:"Item update successfully"
    })
}

// Delete
export const destroy=async (req,res)=>{
    return res.json({
        status:"success",
        message:"Item Delete successfully"
    })
}