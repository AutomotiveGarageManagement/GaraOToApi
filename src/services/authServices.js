const sql = require("mssql");
const config = require("../configs/configDataBase");
const bcrypt = require("bcrypt");

const loginForStaff = async(TenTaiKhoan,MatKhau) => {
  try{
     const poolConnection = await sql.connect(config);
    let data = await poolConnection.request().query("exec sp_get_infor_login");
    let isCorrectPassword = false;
    const dataRe = await data.recordset;
    for (let i in dataRe ){
      if(dataRe[i].TenTaiKhoan == TenTaiKhoan){
        dataObj = await dataRe[i];
        isCorrectPassword =   bcrypt.compareSync(MatKhau , dataObj.MatKhau);
        console.log(isCorrectPassword);
        if(isCorrectPassword){
          return {
            EM:"Login Successfully",
            EC : 1,
            Data : dataObj
          }
        }
        else{
          return {
            EM:"User name or password is not valid",
            EM: -1
          }
        }
      }
    }
    return {
      EM : "User name or password  is not valid",
      EC : -1 
    }
  }catch(error){
    console.log(error);
    return {
      EM: "Error from services",
      EC: -1,
      DT: "",
    };

  }
}
module.exports = {
  loginForStaff 
}

