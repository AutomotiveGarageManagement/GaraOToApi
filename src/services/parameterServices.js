// const sqlimport ("mssql/msnodesqlv8");
const sql = require("mssql");
const config = require("../configs/configDataBase");
const getAllParameter = async () => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_getall_parameter`);
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
    console.log("Get  all parameters failed" + error);
    return {
      EM: "Lấy thông tin thất bại!",
      EC: -1,
      DT: "",
    };
  }
};
const updateParameter = async (SoLuongXeToiDa, PhanTramTienLoiCuaSanPham) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_parameter '${SoLuongXeToiDa}', '${PhanTramTienLoiCuaSanPham}'`
    );
    poolConnection.close();
    console.log(data);
    if (data) {
      return {
        EM: "Cập nhật giá trị tham số thành công!",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log("update  prameter error: ", error.originalError.info.message);
    return {
      EM: error.originalError.info.message,
      EC: -1,
      DT: "",
    };
  }
};
module.exports = {
  updateParameter,
  getAllParameter,
};
