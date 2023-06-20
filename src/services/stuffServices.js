// const sqlimport ("mssql/msnodesqlv8");
const sql = require("mssql");
const config = require("../configs/configDataBase");
const insertStuff = async (TenVTPT, DVT, DonGia) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_create_stuffs  N'${TenVTPT}' , '${DVT}','${DonGia}'`
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Thêm mới VTPT  thành công!",
        EC: 1,
      };
    } else {
      return {
        EM: "Thêm mới VTPT không thành công!",
        EC: 0,
      };
    }
  } catch (error) {
    console.log("Tạo mới VTPT bị lỗi : " + error);
    return {
      EM: error.originalError.info.message,
      EC: -1,
      DT: "",
    };
  }
};
const getAllStuff = async () => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_getAll_stuff`);
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
    console.log("Lấy thông tin VTPT bị lỗi: " + error);
    return {
      EM: "Lấy thông tin thất bại!",
      EC: -1,
      DT: "",
    };
  }
};
const deleteStuff = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`EXEC sp_delete_stuff ${id}`);
    poolConnection.close();
  } catch (error) {
    console.log("Xóa VTPT bị lỗi: " + error);
  }
};
const findStuffWithName = async (TenVTPT) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(
      `exec sp_find_stuff  N'${TenVTPT}'`
    );
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
const updateInfo = async (id, TenVTPT, DVT, DonGia) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_stuff '${id}', N'${TenVTPT}' , '${DVT}',N'${DonGia}'`
    );
    poolConnection.close();
    // console.log(data.recordset[0].status);
    console.log(data);
    if ((await data.recordset[0].status) == 1) {
      return {
        EM: "Cập Nhật Thành Công",
        EC: 1,
        DT: "",
      };
    }
  } catch (error) {
    console.log("Update stuff error", error.originalError.info.message);
    return {
      EM: error.originalError.info.message,
      EC: -1,
      DT: "",
    };
  }
};
module.exports = {
  insertStuff,
  getAllStuff,
  deleteStuff,
  findStuffWithName,
  updateInfo,
};
