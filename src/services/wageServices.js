// const sqlimport ("mssql/msnodesqlv8");
const sql = require("mssql");
const config = require("../configs/configDataBase");
const insertWageType = async (LoaiTienCong, GiaTriTienCong) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_create_wage  N'${LoaiTienCong}', '${GiaTriTienCong}' `
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Thêm mới loại tiền công thành công!",
        EC: 1,
      };
    } else {
      return {
        EM: "Thêm mới  loại tiền công thất bại!",
        EC: 0,
      };
    }
  } catch (error) {
    console.log("Tạo mới loại tiền công bị lỗi : " + error);
    return {
      EM: error.originalError.info.message,
      EC: -1,
      DT: "",
    };
  }
};
const getAllWage = async () => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_getAll_wageType`);
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
    console.log("Get Infomation error:" + error);
    return {
      EM: "Lấy thông tin thất bại!",
      EC: -1,
      DT: "",
    };
  }
};
const deleteWageType = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`EXEC sp_delete_wage ${id}`);
    poolConnection.close();
  } catch (error) {
    console.log("Delete Car Brand error: " + error);
  }
};
const findWithName = async (LoaiTienCong) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_find_wageType '${LoaiTienCong}'`);
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
const updateInfo = async (id, LoaiTienCong, GiaTriTienCong) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_wage '${id}', N'${LoaiTienCong}','${GiaTriTienCong}'`
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
    console.log("Update wage type error", error.originalError.info.message);
    return {
      EM: error.originalError.info.message,
      EC: -1,
      DT: "",
    };
  }
};
module.exports = {
  insertWageType,
  getAllWage,
  deleteWageType,
  findWithName,
  updateInfo,
};
