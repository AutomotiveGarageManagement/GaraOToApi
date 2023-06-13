const {
  insertWageType,
  getAllWage,
  deleteWageType,
  findWithName,
  updateInfo,
} = require("../services/wageServices");
const createANewWageType = async (req, res) => {
  try {
    const { LoaiTienCong, GiaTriTienCong } = req.body;
    const data = await insertWageType(LoaiTienCong, GiaTriTienCong);
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
      EM: "Server Error: Thêm mới loại tiền công thất bại!",
    });
  }
};
const getAllWageType = async (req, res) => {
  try {
    const data = await getAllWage();
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
      EM: "Server Error : Lấy danh sách loại tiền công thất bại!",
      EC: -1,
      DT: "",
    });
  }
};
const updateWageInfo = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await updateInfo(
      id,
      req.body.LoaiTienCong,
      req.body.GiaTriTienCong
    );
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
const removeWageType = async (req, res) => {
  try {
    await deleteWageType(req.params.id);
    return res.status(203).json({
      EM: "Xóa Thành Công!",
      EC: 1,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server",
      EC: -1,
      DT: "",
    });
  }
};
const searchWageType = async (req, res) => {
  try {
    const data = await findWithName(req.body.LoaiTienCong);
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
      EM: "Server Error : Lấy danh sách loại tiền công thất bại!",
      EC: -1,
      DT: "",
    });
  }
};
module.exports = {
  createANewWageType,
  updateWageInfo,
  removeWageType,
  getAllWageType,
  searchWageType,
};
