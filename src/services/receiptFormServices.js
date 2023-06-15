// const sqlimport ("mssql/msnodesqlv8");
const sql = require("mssql");
const config = require("../configs/configDataBase");
const insertReception = async (
  TenChuXe,
  DiaChiCX,
  SDT,
  Email,
  MaHangXe,
  BienSoXe,
  GhiChu,
  HanGiaoXe
) => {
  try {
    // let hashPassStaff = hashPassword(MatKhau);
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_reception N'${TenChuXe}' , N'${DiaChiCX}','${SDT}',N'${Email}' , '${MaHangXe}','${BienSoXe}',N'${GhiChu}','${HanGiaoXe}' `
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Lập phiếu tiếp nhận xe thành công!",
        EC: 1,
      };
    } else {
      return {
        EM: "Lập  phiếu tiếp nhận xe thất bại!",
        EC: 0,
      };
    }
  } catch (error) {
    console.log(
      "Lập phiếu tiếp nhận bị lỗi :",
      error.originalError.info.message
    );
    return {
      EM: error.originalError.info.message,
      EC: -1,
      DT: "",
    };
  }
};
const getCustomerByIdentifyCard = async (CMND) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_getInfo_reception '${CMND}'`);
    poolConnection.close();
    console.log(data);
    if (data.recordset.length > 0) {
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
      EM: "Lấy thông in thất bại!",
      EC: -1,
      DT: "",
    };
  }
};

const updateInfo = async (
  id,
  TenChuXe,
  DiaChiCX,
  SDT,
  Email,
  MaHangXe,
  BienSoXe,
  GhiChu,
  HanGiaoXe
) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_reception '${id}', N'${TenChuXe}' , N'${DiaChiCX}','${SDT}','${Email}' , '${MaHangXe}','${BienSoXe}',N'${GhiChu}','${HanGiaoXe}' `
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
    console.log("Update product error", error.originalError.info.message);
    return {
      EM: "Server Error: Cập nhật dữ liệu  mới không thành công!",
      EC: -1,
      DT: "",
    };
  }
};
const getAllReceptionInfo = async () => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_getAll_receptions`);
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
module.exports = {
  insertReception,
  getCustomerByIdentifyCard,
  updateInfo,
  getAllReceptionInfo,
};
