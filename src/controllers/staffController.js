// const { updateInfo } = require("../services/carBrandServices");
const {
  loginForStaff,
  createANewStaff,
  updateInfo,
  deleteStaff,
  findWithName,
  getAllStaffInfo,
  getByID,
} = require("../services/staffServices");
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
const updateStaffInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const { HoTen, GioiTinh, CMND, DiaChi, SDT, MaChucVu, MatKhau } = req.body;
    const data = await updateInfo(
      id,
      HoTen,
      GioiTinh,
      CMND,
      DiaChi,
      SDT,
      MaChucVu,
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
const getAllStaff = async (req, res) => {
  try {
    const data = await getAllStaffInfo();
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
const removeStaff = async (req, res) => {
  try {
    await deleteStaff(req.params.id);
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
const getStaffById = async (req, res) => {
  try {
    const data = await getByID(req.params.id);
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
      EM: "Server Error : Lấy danh sách nhân viên thất bại!",
      EC: -1,
      DT: "",
    });
  }
};
const searchStaff = async (req, res) => {
  try {
    const data = await findWithName(req.body.HoTen);
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
      EM: "Server Error : Lấy danh sách nhân viên thất bại!",
      EC: -1,
      DT: "",
    });
  }
};
module.exports = {
  login,
  insertStaff,
  updateStaffInfo,
  removeStaff,
  searchStaff,
  getAllStaff,
  getStaffById,
};
