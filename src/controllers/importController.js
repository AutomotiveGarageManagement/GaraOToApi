const {
    addImport,
    getInfoById,
    removeProduct,
    getAllImportInfo,
    updateQuantity,
  } = require("../services/importFormServices");
  const createImport = async (req, res) => {
    try {
      const data = await addImport(req);
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
        EM: "Server Error: Thêm  phiếu sửa chữa thất bại!",
      });
    }
  };
  const getInfoFormImport = async (req, res) => {
    try {
      const MaPN = req.body.MaPN;
      console.log(MaPN);
      const data = await getInfoById(MaPN);
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
  const getInfoAllImport = async (req, res) => {
    try {
      const data = await getAllImportInfo();
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
  const deleteProduct = async (req, res) => {
    try {
      await removeProduct(req.params.id);
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
  const updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
      await updateQuantity(id, req.body.quantity);
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
  
  const updateMB = async (req, res) => {};
  module.exports = {
    createImport,
    getInfoFormImport,
    getInfoAllImport,
    deleteProduct,
    updateProduct,
  };
  