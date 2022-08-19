const getErrorBody = (message)=>{
    return {
        error: 'An error occurred!',
        message,
    }
}

const getSuccessBody = (message,id)=>{
    return {
        message,
        id
    }
}

const validateProperties = (body, properties) =>{
    const keys = Object.keys(body);
    for(const key of properties){
        if(!keys.includes(key)){
            return "Missing field "+key;
        }
    }
    return undefined;
}


const sendGeneralError = (err,res)=>{
    console.error("Error occurred!",err);
    res.status(400).send(getErrorBody(err.message));
    return;
}

//Snippets

// catch(e){
//     sendGeneralError(e,res);
//     return;
// }


module.exports = {getErrorBody, validateProperties,sendGeneralError, getSuccessBody}