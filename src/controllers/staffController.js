const { createANewStaff, loginForStaff } = require("../services/staffServices");
// login
const login = async (req, res) => {
  try {
    const { TenTaiKhoan, MatKhau } = req.body;
    const data = await loginForStaff(TenTaiKhoan, MatKhau);
    if (data && data.EC != -1) {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        Data: data.Data,
      });
    }
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      EM: "Login Failure!",
    });
  }
};
const insertStaff = async (req, res) => {
  try {
    const {
      HoTen = undefined,
      GioiTinh = undefined,
      CMND = un,
      DiaChi = undefined,
      SDT = undefined,
      MaChucVu = undefined,
      TenTaiKhoan = undefined,
      MatKhau = undefined,
    } = req.body;
    const data = await createANewStaff(
      HoTen,
      GioiTinh,
      CMND,
      DiaChi,
      SDT,
      MaChucVu,
      TenTaiKhoan,
      MatKhau
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
      EM: "Create staff failed",
    });
  }
};
module.exports = {
  login,
  insertStaff,
};
