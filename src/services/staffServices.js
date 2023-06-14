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
      EM: error.originalError.info.message,
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
const getAllStaffInfo = async () => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.request().query(`exec sp_getAll_Staff`);
    poolConnection.close();
    console.log(data);
    if (data) {
      return {
        EM: "Lấy Thông Tin thành công!",
        EC: 1,
        DT: data.recordset,
      };
    } else {
      return {
        EM: "Lấy thông tin thất bại!",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("Get one user failed" + error);
    return {
      EM: "Lấy thông tin thất bại!",
      EC: -1,
      DT: "",
    };
  }
};
const deleteStaff = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`EXEC sp_delete_staff ${id}`);
    poolConnection.close();
  } catch (error) {
    console.log("Delete staff error: " + error);
  }
};
const findWithName = async (HoTen) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_find_staff '${HoTen}'`);
    poolConnection.close();
    console.log(data);
    if (data) {
      return {
        EM: "Lấy Thông Tin thành công!",
        EC: 1,
        DT: data.recordset,
      };
    } else {
      return {
        EM: "Lấy thông tin thất bại!",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("Get data failed" + error);
    return {
      EM: "Lấy thông tin thất bại!",
      EC: -1,
      DT: "",
    };
  }
};
const getByID = async (id) => {
  console.log(id);
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_get_staff_ByID '${id}'`);
    poolConnection.close();
    console.log(data);
    if (data) {
      return {
        EM: "Lấy Thông Tin thành công!",
        EC: 1,
        DT: data.recordset,
      };
    } else {
      return {
        EM: "Lấy thông tin thất bại!",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log("Get data failed" + error);
    return {
      EM: "Lấy thông tin thất bại!",
      EC: -1,
      DT: "",
    };
  }
};
const updateInfo = async (
  id,
  HoTen,
  GioiTinh,
  CMND,
  DiaChi,
  SDT,
  MaChucVu,
  MatKhau
) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_staff_info '${id}', N'${HoTen}' , '${GioiTinh}','${CMND}',N'${DiaChi}' , '${SDT}','${MaChucVu}','${MatKhau}' `
    );
    poolConnection.close();

    console.log(data);
    if (data) {
      return {
        EM: "Cập Nhật Thành Công!",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log("Update Car brand error", error.originalError.info.message);
    return {
      EM: error.originalError.info.message,
      EC: -1,
      DT: "",
    };
  }
};
module.exports = {
  loginForStaff,
  createANewStaff,
  updateInfo,
  deleteStaff,
  findWithName,
  getAllStaffInfo,
  getByID,
};
