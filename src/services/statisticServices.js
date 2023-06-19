// const sqlimport ("mssql/msnodesqlv8");
const sql = require("mssql");
const config = require("../configs/configDataBase");

const getSumCustomerS = async () => {
    try {
      const poolConnection = await sql.connect(config);
      const data = await poolConnection
        .request()
        .query(`exec sp_getSumCustomer`);
      poolConnection.close();
      console.log(data);
      if (data) {
        return {
          EM: "Lấy Thông Tin thành công!",
          EC: 1,
          DT: data.recordset,
        };
      } else {
        return {
          EM: "Lấy thông tin thất bại!",
          EC: 0,
          DT: [],
        };
      }
    } catch (error) {
      console.log("Lấy thông tin bị lỗi: " + error);
      return {
        EM: "Lấy thông tin thất bại!",
        EC: -1,
        DT: "",
      };
    }
};

const getSumTurnoverS = async () => {
    try {
      const poolConnection = await sql.connect(config);
      const data = await poolConnection
        .request()
        .query(`exec sp_getSumTurnover`);
      poolConnection.close();
      console.log(data);
      if (data) {
        return {
          EM: "Lấy Thông Tin thành công!",
          EC: 1,
          DT: data.recordset,
        };
      } else {
        return {
          EM: "Lấy thông tin thất bại!",
          EC: 0,
          DT: [],
        };
      }
    } catch (error) {
      console.log("Lấy thông tin bị lỗi: " + error);
      return {
        EM: "Lấy thông tin thất bại!",
        EC: -1,
        DT: "",
      };
    }
};


const getSumReceiptS = async () => {
    try {
      const poolConnection = await sql.connect(config);
      const data = await poolConnection
        .request()
        .query(`exec sp_getSumReceipt`);
      poolConnection.close();
      console.log(data);
      if (data) {
        return {
          EM: "Lấy Thông Tin thành công!",
          EC: 1,
          DT: data.recordset,
        };
      } else {
        return {
          EM: "Lấy thông tin thất bại!",
          EC: 0,
          DT: [],
        };
      }
    } catch (error) {
      console.log("Lấy thông tin bị lỗi: " + error);
      return {
        EM: "Lấy thông tin thất bại!",
        EC: -1,
        DT: "",
      };
    }
};

const getRepairByMonthS = async (Thang) => {
    try {
      const poolConnection = await sql.connect(config);
      const data = await poolConnection
        .request()
        .query(`exec sp_getRepairByMonthS N'${Thang}'`);
      poolConnection.close();
      console.log(data);
      if (data) {
        return {
          EM: "Lấy Thông Tin thành công!",
          EC: 1,
          DT: data.recordset,
        };
      } else {
        return {
          EM: "Lấy thông tin thất bại!",
          EC: 0,
          DT: [],
        };
      }
    } catch (error) {
      console.log("Lấy thông tin bị lỗi: " + error);
      return {
        EM: "Lấy thông tin thất bại!",
        EC: -1,
        DT: "",
      };
    }
};

module.exports = {
    getSumCustomerS,
    getSumTurnoverS,
    getSumReceiptS,
  
    getRepairByMonthS,
};
