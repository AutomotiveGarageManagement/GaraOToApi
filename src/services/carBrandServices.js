// const sqlimport ("mssql/msnodesqlv8");
const sql = require("mssql");
const config = require("../configs/configDataBase");
const insertCarBrand = async (TenHX) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_create_car_brand  '${TenHX}' `
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Thêm hiệu xe thành công!",
        EC: 1,
      };
    } else {
      return {
        EM: "Thêm hiệu xe không thành công!",
        EC: 0,
      };
    }
  } catch (error) {
    console.log("Tạo mới hiệu xe bị lỗi : " + error);
    return {
      EM: error.originalError.info.message,
      EC: -1,
      DT: "",
    };
  }
};
const getAllCarInfo = async () => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_getAll_carBrand`);
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
const deleteCar = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`EXEC sp_delete_car_brand ${id}`);
    poolConnection.close();
  } catch (error) {
    console.log("Delete Car Brand error: " + error);
  }
};
const findWithName = async (TenHX) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_find_CarBrand '${TenHX}'`);
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
const updateInfo = async (id, TenHX) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_car_brand ${id}, '${TenHX}'`
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
      EM: "Error Server:Cập nhật thông tin không thành công!",
      EC: -1,
      DT: "",
    };
  }
};
module.exports = {
  insertCarBrand,
  getAllCarInfo,
  deleteCar,
  findWithName,
  updateInfo,
};
