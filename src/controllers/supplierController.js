const {
  insertSupplier,
  updateInfo,
  deleteSupplier,
  getAllSupplier,
  findSupplierWithName,
} = require("../services/supplierServices");
const createANewSupplier = async (req, res) => {
  try {
    const { TenNCC, SDT, DiaChiNhaCungCap, HoTenNDD } = req.body;
    const data = await insertSupplier(TenNCC, SDT, DiaChiNhaCungCap, HoTenNDD);
    if (data && +data.EC == 1) {
      return res.status(201).json({
        Em: data.EM,
        EC: 1,
        DT: "",
      });
    } else if (data && +data.EC != 1) {
      return res.status(201).json({
        EM: data.EM,
        EC: data.EC,
      });
    }
  } catch (error) {
    console.log("Error:" + error);
    return res.status(500).json({
      EM: "Server Error: Thêm nhà cung cấp không thành công!",
    });
  }
};
const getAllSupplierInfo = async (req, res) => {
  try {
    const data = await getAllSupplier();
    if (data && +data.EC === 1) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
    if (data && +data.EC != 1) {
      return res.status(500).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (eror) {
    console.log(error);
    return res.status(500).json({
      EM: "Server Error : Lấy danh sách nhà cung cấp  thất bại!",
      EC: -1,
      DT: "",
    });
  }
};
const updateSupplierInfo = async (req, res) => {
  const id = req.params.id;
  const { TenNCC, SDT, DiaChiNhaCungCap, HoTenNDD } = req.body;
  try {
    const data = await updateInfo(id, TenNCC, SDT, DiaChiNhaCungCap, HoTenNDD);

    if (data && +data.EC === 1) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
    if (data && +data.EC != 1) {
      return res.status(500).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server: Cập nhật thông tin không thành công!",
      EC: -1,
      DT: "",
    });
  }
};
const removeSupplier = async (req, res) => {
  try {
    await deleteSupplier(req.params.id);
    return res.status(203).json({
      EM: "Xóa Thành Công!",
      EC: 1,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server : Xóa không thành công!",
      EC: -1,
      DT: "",
    });
  }
};
const searchSupplier = async (req, res) => {
  try {
    const data = await findSupplierWithName(req.body.TenNCC);
    if (data && +data.EC === 1) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
    if (data && +data.EC != 1) {
      return res.status(500).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (eror) {
    console.log(error);
    return res.status(500).json({
      EM: "Server Error : Lấy danh sách nhà cung cấp thất bại!",
      EC: -1,
      DT: "",
    });
  }
};
module.exports = {
  createANewSupplier,
  updateSupplierInfo,
  removeSupplier,
  getAllSupplierInfo,
  searchSupplier,
};
