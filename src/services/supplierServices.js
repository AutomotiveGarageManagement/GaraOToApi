// const sqlimport ("mssql/msnodesqlv8");
const sql = require("mssql");
const config = require("../configs/configDataBase");
const insertSupplier = async (TenNCC, SDT, DiaChiNhaCungCap, HoTenNDD) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_create_suppliers  N'${TenNCC}' , '${SDT}','${DiaChiNhaCungCap}','${HoTenNDD}'`
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Thêm mới nhà cung cấp  thành công!",
        EC: 1,
      };
    } else {
      return {
        EM: "Thêm mới nhà cung cấp không thành công!",
        EC: 0,
      };
    }
  } catch (error) {
    console.log("Tạo mới nhà cung cấp bị lỗi : " + error);
    return {
      EM: error.originalError.info.message,
      EC: -1,
      DT: "",
    };
  }
};
const getAllSupplier = async () => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_getAll_supplier`);
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
    console.log("Lấy thông tin nhà cung cấp bị lỗi: " + error);
    return {
      EM: "Lấy thông tin thất bại!",
      EC: -1,
      DT: "",
    };
  }
};
const deleteSupplier = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`EXEC sp_delete_supplier ${id}`);
    poolConnection.close();
  } catch (error) {
    console.log("Xóa nhà cung cấp bị lỗi: " + error);
  }
};
const findSupplierWithName = async (TenNCC) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.query(
      `exec sp_find_supplier  N'${TenNCC}'`
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
const updateInfo = async (id, TenNCC, SDT, DiaChiNhaCungCap, HoTenNDD) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_supplier '${id}', N'${TenNCC}' , '${SDT}',N'${DiaChiNhaCungCap}',N'${HoTenNDD}'`
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
    console.log("Update supplier  error", error.originalError.info.message);
    return {
      EM: error.originalError.info.message,
      EC: -1,
      DT: "",
    };
  }
};
module.exports = {
  insertSupplier,
  getAllSupplier,
  deleteSupplier,
  findSupplierWithName,
  updateInfo,
};
