import jwt from 'jsonwebtoken';
const key="avadhesh";
function save(user){
    try{
    return jwt.sign({
        name:user.name,
        email:user.email
    },key,
    { expiresIn: '1h' } 
    );
}catch(err){
console.error("error while saving",err);
}


}
function getuser(token){
    if(!token) return null;
    return jwt.verify(token,key);
}
export default {save,getuser};
