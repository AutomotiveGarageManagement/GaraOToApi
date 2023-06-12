const {
  insertPaymentForm,
  getInfoById,
  updateMoney,
} = require("../services/paymentReceiptSevices");
const createPaymentReceipt = async (req, res) => {
  try {
    const { MaPhieuTN, SDT, Email, SoTienThu } = req.body;
    const data = await insertPaymentForm(MaPhieuTN, SDT, Email, SoTienThu);
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
      EM: "Server Error: Thêm  phiếu  thu tiền không thành công!",
    });
  }
};
const getInfoPaymentReceipt = async (req, res) => {
  try {
    const MaCX = req.body.MaCX;
    console.log(MaCX);
    const data = await getInfoById(MaCX);
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
      EM: "Server Error : Lấy thông tin chi tiết phiếu thu  thất bại!",
      EC: -1,
      DT: "",
    });
  }
};
const updateMoneyReceipt = async (req, res) => {
  const id = req.params.id;
  try {
    await updateMoney(id, req.body.SoTienThu);
    return res.status(200).json({
      EM: "Cập Nhật Thành Công",
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
module.exports = {
  createPaymentReceipt,
  getInfoPaymentReceipt,
  updateMoneyReceipt,
};
