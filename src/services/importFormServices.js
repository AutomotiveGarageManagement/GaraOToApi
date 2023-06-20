const sql = require("mssql");
const config = require("../configs/configDataBase");
const insertImport = async (
    MaNV,
    MaNCC,
    NgayLapPhieuNhap,
    TenNhaCungCap,
    TongTienNhapHang
) => {
  try {
    const poolConnection = await sql.connect(config);

    let data = await poolConnection.query(
      `exec sp_insert_import '${MaNV}','${MaNCC}','${NgayLapPhieuNhap}','${TenNhaCungCap}','${TongTienNhapHang}' `
    );
    console.log(data)
    poolConnection.close();
    if (data) {
      return {
        EM: "Lập phiếu sửa chữa thành công!",
        EC: 1,
        MaPN: data.recordset[0].NewPrimaryKey,
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
const insertImportDetail = async (
    MaPN,
    MaVTPT,
    SoLuong,
    DonGia,
) => {
  try {
    const poolConnection = await sql.connect(config);
    console.log(      `exec sp_insert_import_details N'${MaPN}' , '${MaVTPT}','${SoLuong}', '${DonGia}' `
    )
    let data = await poolConnection.query(
      `exec sp_insert_import_details N'${MaPN}' ,'${MaVTPT}','${SoLuong}', '${DonGia}' `
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
const addImport = async (req) => {
  try {
    const {MaPN, productDetail } = req.body;
    const ticketRepair = await insertImport(
      req.body.MaNV,
      req.body.MaNCC,
      req.body.NgayLapPhieuNhap,
      req.body.TenNhaCungCap,
      req.body.TongTienNhapHang,
    );

    console.log(ticketRepair.MaPN);
    if (ticketRepair.MaPN) {
      for (const product of productDetail) {
        const insertProductData = await insertImportDetail(
          ticketRepair.MaPN,
          product.MaVTPT,
          product.SoLuong,
          product.DonGia,
        );
      }

      return {
        EM: productDetail.EM,
        EC: productDetail.EC,
      };
    }
    return {
      EM: ticketRepair.EM,
      EC: ticketRepair.EC,
    };
    // const {MaPN, productDetail } = req.body;
    // const poolConnection = await sql.connect(config);
    // let data = await poolConnection.query(
    //   `exec sp_check_TonTai_PhieuNH '${MaPN}' `
    // );
    // poolConnection.close();

    // if (true) {
    //   const productDetailData = await insertImportDetail(
    //     data.recordset[0].id,
    //     productDetail.MaVTPT,
    //     productDetail.MaPN,
    //     productDetail.SoLuong,
    //     productDetail.DonGia,
    //     productDetail.TongTien
    //   );

    //   return {
    //     EM: productDetailData.EM,
    //     EC: 1,
    //   };
    // } else {
    //   const ticketRepair = await insertImport(
    //     req.body.MaNV,
    //     req.body.MaNCC,
    //     req.body.NgayLapPhieuNhap,
    //     req.body.TenNhaCungCap,
    //     req.body.TongTienNhapHang,
    //   );

    //   console.log(ticketRepair.MaPN);
    //   if (ticketRepair.MaPN) {
    //     const insertProductData = await insertImportDetail(
    //       ticketRepair.MaPN,
    //       productDetail.MaVTPT,
    //       productDetail.MaPN,
    //       productDetail.SoLuong,
    //       productDetail.DonGia,
    //       productDetail.TongTien
    //     );
    //     return {
    //       EM: insertProductData.EM,
    //       EC: insertProductData.EC,
    //     };
    //   }
    //   return {
    //     EM: ticketRepair.EM,
    //     EC: ticketRepair.EC,
    //   };
    // }
  } catch (error) {
    console.log("Tạo mới phiếu nhập hàng bị lỗi : " + error);
    return {
      EM: "Tạo mới phiếu nhập hàng không thành công!",
      EC: -1,
      DT: "",
    };
  }
};
const getInfoById = async (MaPN) => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection
      .request()
      .query(`exec sp_getInfo_import_details '${MaPN}'`);
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
const getAllImportInfo = async () => {
  try {
    const poolConnection = await sql.connect(config);
    const data = await poolConnection.request().query(`exec sp_getAll_Import`);
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
const removeProduct = async (id) => {
  try {
    const poolConnection = await sql.connect(config);
    await poolConnection.query(`EXEC sp_delete_prodcut_in_import ${id}`);
    poolConnection.close();
  } catch (error) {
    console.log("Delete new mobile error: " + error);
  }
};

const updateQuantity = async (id, quantity) => {
  try {
    const poolConnection = await sql.connect(config);
    let data = await poolConnection.query(
      `exec sp_update_quantity_in_import ${id}, '${quantity}'`
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
  addImport,
  getInfoById,
  getAllImportInfo,
  removeProduct,
  updateQuantity,
};
