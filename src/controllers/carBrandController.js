const {
  insertCarBrand,
  updateInfo,
  deleteCar,
  getAllCarInfo,
  findWithName,
} = require("../services/carBrandServices");
const createANewCarBrand = async (req, res) => {
  try {
    const TenHX = req.body.TenHX;
    console.log(TenHX);
    const data = await insertCarBrand(TenHX);
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
      EM: "Server Error: Thêm hãng xe không thành công!",
    });
  }
};
const getAllCarBrand = async (req, res) => {
  try {
    const data = await getAllCarInfo();
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
      EM: "Server Error : Lấy danh sách hãng xe thất bại!",
      EC: -1,
      DT: "",
    });
  }
};
const updateCarInfo = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await updateInfo(id, req.body.TenHX);
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
const removeCarBrand = async (req, res) => {
  try {
    await deleteCar(req.params.id);
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
const searchCarBrand = async (req, res) => {
  try {
    const data = await findWithName(req.body.TenHX);
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
      EM: "Server Error : Lấy danh sách hãng xe thất bại!",
      EC: -1,
      DT: "",
    });
  }
};
module.exports = {
  createANewCarBrand,
  getAllCarBrand,
  updateCarInfo,
  removeCarBrand,
  searchCarBrand,
};
