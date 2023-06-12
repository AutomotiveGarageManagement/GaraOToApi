// const sqlimport ("mssql/msnodesqlv8");
const sql = require("mssql");
const config = require("../configs/configDataBase");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const createANewStaff = async (
  HoTen,
  GioiTinh,
  CMND,
  DiaChi,
  SDT,
  MaChucVu,
  TenTaiKhoan,
  MatKhau
) => {
  try {
    // let hashPassStaff = hashPassword(MatKhau);
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_staff N'${HoTen}' , '${GioiTinh}','${CMND}',N'${DiaChi}' , '${SDT}','${MaChucVu}','${TenTaiKhoan}','${MatKhau}' `
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "create data success",
        EC: 1,
      };
    } else {
      return {
        EM: "create failed",
        EC: 0,
      };
    }
  } catch (error) {
    console.log("Create a new staff error : " + error);
    return {
      EM: " Username exit in DataBase!",
      EC: -1,
      DT: "",
    };
  }
};
const loginForStaff = async (TenTaiKhoan, MatKhau) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.request().query("exec sp_get_infor_login");
    // let isCorrectPassword = false;
    const dataRe = await data.recordset;
    for (let i in dataRe) {
      if (dataRe[i].TenTaiKhoan == TenTaiKhoan) {
        dataObj = await dataRe[i];
        console.log(MatKhau);

        // isCorrectPassword =  await  bcrypt.compare(MatKhau , dataObj.MatKhau);
        // console.log(isCorrectPassword);
        if (MatKhau == dataObj.MatKhau) {
          return {
            EM: "Login Successfully",
            EC: 1,
            Data: dataObj,
          };
        } else {
          return {
            EM: "User name or password is not valid",
            EM: -1,
          };
        }
      }
    }
    return {
      EM: "User name or password  is not valid",
      EC: -1,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from services",
      EC: -1,
      DT: "",
    };
  }
};
module.exports = {
  loginForStaff,
  createANewStaff,
};
