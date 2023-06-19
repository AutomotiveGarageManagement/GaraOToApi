const {
    insertStuff,
    updateInfo,
    deleteStuff,
    getAllStuff,
    findStuffWithName,
  } = require("../services/stuffServices");
  const createANewStuff = async (req, res) => {
    try {
      const { TenVTPT, DVT, DonGia } = req.body;
      const data = await insertStuff(TenVTPT, DVT, DonGia);
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
        EM: "Server Error: Thêm VTPT không thành công!",
      });
    }
  };
  const getAllStuffInfo = async (req, res) => {
    try {
      const data = await getAllStuff();
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
        EM: "Server Error : Lấy danh sách VTPT thất bại!",
        EC: -1,
        DT: "",
      });
    }
  };
  const updateStuffInfo = async (req, res) => {
    const id = req.params.id;
    const { TenVTPT, DVT, DonGia } = req.body;
    try {
      const data = await updateInfo(id, TenVTPT, DVT, DonGia);
  
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
  const removeStuff = async (req, res) => {
    try {
      await deleteStuff(req.params.id);
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
  const searchStuff = async (req, res) => {
    try {
      const data = await findStuffWithName(req.body.TenVTPT);
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
        EM: "Server Error : Lấy danh sách VTPT thất bại!",
        EC: -1,
        DT: "",
      });
    }
  };
  module.exports = {
    createANewStuff,
    updateStuffInfo,
    removeStuff,
    getAllStuffInfo,
    searchStuff,
  };
  