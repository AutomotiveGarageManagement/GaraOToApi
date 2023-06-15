const config = {
  server: "MSI", // serrver name
  database: "GaraOto", // name of Database
  user: "sa", // user name
  password: "1",
  port: 1433, // port for  SQL Server
  driver: "ODBC Driver 17 for SQL Server", // Tên trình điều khiển ODBC
  encrypt: false, // Vô hiệu hóa SSL;
  dateStrings: "date",
};

module.exports = config;
