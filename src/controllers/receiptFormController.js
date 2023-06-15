const {
  insertReception,
  getCustomerByIdentifyCard,
  updateInfo,
  getAllReceptionInfo,
} = require("../services/receiptFormServices");
const createReception = async (req, res) => {
  try {
    const {
      TenChuXe,
      DiaChiCX,
      SDT,
      Email,
      CMND,
      MaHangXe,
      BienSoXe,
      GhiChu,
      HanGiaoXe,
    } = req.body;
    const data = await insertReception(
      TenChuXe,
      DiaChiCX,
      SDT,
      Email,
      CMND,
      MaHangXe,
      BienSoXe,
      GhiChu,
      HanGiaoXe
    );
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
    console.log(error);
    return res.status(500).json({
      EM: "Create  a new reception failed",
    });
  }
};
const getCustomerInfo = async (req, res) => {
  try {
    const CMND = req.body.CMND;
    // console.log(MaCX);
    const data = await getCustomerByIdentifyCard(CMND);
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
      EM: "Server Error : Lấy thông tin chi tiết phiếu tiếp nhận thất bại!",
      EC: -1,
      DT: "",
    });
  }
};
const updateInfoReception = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  try {
    await updateInfo(
      id,
      req.body.TenChuXe,
      req.body.DiaChiCX,
      req.body.SDT,
      req.body.Email,
      req.body.CMND,
      req.body.MaHangXe,
      req.body.BienSoXe,
      req.body.GhiChu,
      req.body.HanGiaoXe
    );
    return res.status(200).json({
      EM: "Cập Nhật Thành Công!",
      EC: 1,
      DT: "",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: "Error from server: Cập nhật thông tin không thành công!",
      EC: -1,
      DT: "",
    });
  }
};
const getAllReceptions = async (req, res) => {
  try {
    const data = await getAllReceptionInfo();
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
      EM: "Server Error : Lấy danh sách nhân viên thất bại!",
      EC: -1,
      DT: "",
    });
  }
};

module.exports = {
  createReception,
  getCustomerInfo,
  updateInfoReception,
  getAllReceptions,
};
