const {
  getAllParameter,
  updateParameter,
} = require("../services/parameterServices");
const getAllParameterInfo = async (req, res) => {
  try {
    const data = await getAllParameter();
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
const updateParameterInfo = async (req, res) => {
  try {
    const data = await updateParameter(
      req.body.SoLuongXeToiDa,
      req.body.PhanTramTienLoiCuaSanPham
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
module.exports = {
  updateParameterInfo,
  getAllParameterInfo,
};
