const sql = require("mssql");
const config = require("../configs/configDataBase");
const insertRepair = async (MaTN, TongTien) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(`exec sp_insert_repair '${MaTN}' `);

    poolConnection.close();
    if (data) {
      return {
        EM: "Lập phiếu sửa chữa thành công!",
        EC: 1,
        MaPSX: data.recordset[0].NewPrimaryKey,
      };
    } else {
      return {
        EM: "Lập  phiếu sửa chữa xe thất bại!",
        EC: 0,
      };
    }
  } catch (error) {
    console.log("Tạo mới phiếu sửa chữa bị lỗi : " + error);
    return {
      EM: "Server Error : Tạo mới phiếu sửa chữa không thành công!",
      EC: -1,
      DT: "",
    };
  }
};
const insertRepairDetail = async (
  MaPSX,
  MaTienCong,
  MaVTPT,
  NoiDung,
  DonGia,
  TienCong,
  SoLuong
) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_insert_repair_details '${MaPSX}' , '${MaTienCong}','${MaVTPT}',N'${NoiDung}' , '${DonGia}','${TienCong}','${SoLuong}' `
    );
    poolConnection.close();
    if (data) {
      return {
        EM: "Thêm thành công!",
        EC: 1,
      };
    } else {
      return {
        EM: "Thêm Thât Bại!",
        EC: 0,
      };
    }
  } catch (error) {
    console.log("Thêm VTPT bị lỗi : " + error);
    return {
      EM: "Server Error : Thêm VTPT không thành công!",
      EC: -1,
      DT: "",
    };
  }
};
const addRepair = async (req) => {
  try {
    const { MaTN, productDetail } = req.body;
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_check_TonTai_PhieuSX '${MaTN}' `
    );
    poolConnection.close();

    if (data.recordset.length != 0) {
      const productDetailData = await insertRepairDetail(
        data.recordset[0].id,
        productDetail.MaTienCong,
        productDetail.MaVTPT,
        productDetail.NoiDung,
        productDetail.DonGia,
        productDetail.TienCong,
        productDetail.SoLuong
      );

      return {
        EM: productDetailData.EM,
        EC: 1,
      };
    } else {
      const ticketRepair = await insertRepair(req.body.MaTN);

      console.log(ticketRepair.MaPSX);
      if (ticketRepair.MaPSX) {
        const insertProductData = await insertRepairDetail(
          ticketRepair.MaPSX,
          productDetail.MaTienCong,
          productDetail.MaVTPT,
          productDetail.NoiDung,
          productDetail.DonGia,
          productDetail.TienCong,
          productDetail.SoLuong
        );
        return {
          EM: insertProductData.EM,
          EC: insertProductData.EC,
        };
      }
      return {
        EM: ticketRepair.EM,
        EC: ticketRepair.EC,
      };
    }
  } catch (error) {
    console.log("Tạo mới phiếu sửa chữa bị lỗi : " + error);
    return {
      EM: "Tạo mới phiếu sửa chữa không thành công!",
      EC: -1,
      DT: "",
    };
  }
};
const getInfoById = async (MaTN) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_getInfo_repair_details '${MaTN}'`);
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
      EM: "Lấy thông tin thất bại!",
      EC: -1,
      DT: "",
    };
  }
};
const removeProduct = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`EXEC sp_delete_prodcut_in_repair ${id}`);
    poolConnection.close();
  } catch (error) {
    console.log("Delete new mobile error: " + error);
  }
};

const updateQuantity = async (id, quantity) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_quantity_in_repair ${id}, '${quantity}'`
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
      EM: error,
      EC: -1,
      DT: "",
    };
  }
};
module.exports = {
  addRepair,
  getInfoById,
  removeProduct,
  updateQuantity,
};
