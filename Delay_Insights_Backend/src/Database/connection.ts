import mysql from "mysql2/promise"


export const db = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,
});



// database connection for mongoDB
// export async function connectDB(){
//     let str:string = process.env.DatabaseConnectionString!;
//     mongoose.connect(str)
// }

// connectDB()
//   .then(() => {
//     console.log("Database connection was successfull");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on port : ${process.env.PORT}`);
//     });
//   })
//   .catch(() => {
//     console.log("Internal server error occured while connecting to Database");
//   });