import{hash, genSalt, compare} from "bcrypt"


const generateSalt = async()=>await genSalt(10)


export const hashPassword = async(pass)=>{
    const salt = await generateSalt()
    return hash(pass, salt)
}
export const comparePassword = async(userPassword,password)=>{
    return await compare(userPassword, password)
}