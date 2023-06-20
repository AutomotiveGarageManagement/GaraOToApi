const {
    getSumCustomerS,
    getSumTurnoverS,
    getSumReceiptS,
  
    getRepairByMonthS,
    getStatisticInvenS
  } = require("../services/statisticServices");
  const getSumCustomer = async (req, res) => {
    try {
      const data = await getSumCustomerS();
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
        EM: "Server Error : Lấy danh sách thất bại!",
        EC: -1,
        DT: "",
      });
    }
  };

  const getSumTurnover = async (req, res) => {
    try {
      const data = await getSumTurnoverS();
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
        EM: "Server Error : Lấy danh sách thất bại!",
        EC: -1,
        DT: "",
      });
    }
  };

  const getSumReceipt = async (req, res) => {
    try {
      const data = await getSumReceiptS();
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
        EM: "Server Error : Lấy danh sách thất bại!",
        EC: -1,
        DT: "",
      });
    }
  };

  const getRepairByMonth = async (req, res) => {
    try {
      const data = await getRepairByMonthS(req.body.Thang);
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
        EM: "Server Error : Lấy danh sách thất bại!",
        EC: -1,
        DT: "",
      });
    }
  };

  const getStatisticInven = async (req, res) => {
    try {
      const data = await getStatisticInvenS(req.body.start_date, req.body.end_date);
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
        EM: "Server Error : Lấy danh sách thất bại!",
        EC: -1,
        DT: "",
      });
    }
  }
  
  module.exports = {
    getSumCustomer,
    getSumTurnover,
    getSumReceipt,
  
    getRepairByMonth,
    getStatisticInven
  };
  