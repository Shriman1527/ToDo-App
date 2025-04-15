const JWT_USER_PASSWORD=process.env.JWT_USER_PASSWORD;



const MONGO_URL=process.env.MONGO_URL;

// we have created this config file to avoid the circular depency


module.exports={
    JWT_USER_PASSWORD,
    MONGO_URL
}