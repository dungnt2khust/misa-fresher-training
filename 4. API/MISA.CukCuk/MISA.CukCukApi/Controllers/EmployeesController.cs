using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.CukCukApi.Model;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCukApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        /// <summary>
        /// Lấy toàn bộ dữ liệu nhân viên
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// ModifiedBy: NTDUNG (11/08/2021)
        /// <returns>Trả về mã code và json chứa thông tin tất cả nhân viên</returns> 
        [HttpGet]
        public IActionResult GetEmployees()
        {
            // 1. Khai báo thông tin kết nối DATABASE:
            var connectionString =
                "Host = 47.241.69.179;" +
                "Database = WEB07.MF936.NTDUNG.CukCuk;" +
                "User Id = dev;" +
                "Password = 12345678";

            // 2. Khởi tạo đối tượng kết nối với DATABASE:
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // 3. Lấy dữ liệu:
            var sqlCommand = "SELECT * FROM Employee";
            var employees = dbConnection.Query<object>(sqlCommand);

            // 4. Trả về cho CLIENT:
            var response = StatusCode(200, employees);
            return response;
        }

        /// <summary>
        /// Lấy dữ liệu một nhân viên với employeeId
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// ModifiedBy: NTDUNG (11/08/2021)
        /// <param name="employeeId">Là id của một nhân viên trong cơ sở dữ liệu</param>
        /// <returns>Trả về mã code và object chứa thông tin một nhân viên có id trùng khớp</returns> 
        [HttpGet("{employeeId}")]
        public IActionResult GetEmployee(string employeeId)
        {
            // 1. Khai báo thông tin kết nối DATABASE:
            var connectionString =
                "Host = 47.241.69.179;" +
                "Database = WEB07.MF936.NTDUNG.CukCuk;" +
                "User Id = dev;" +
                "Password = 12345678";

            // 2. Khởi tạo đối tượng kết nối với DATABASE:
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // 3. Lấy dữ liệu:
            var sqlCommand = "SELECT * FROM Employee WHERE EmployeeId = @EmployeeIdParam";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@EmployeeIdParam", employeeId);
            var employee = dbConnection.QueryFirstOrDefault<object>(sqlCommand, param: parameters);

            // 4. Trả về cho CLIENT:
            var response = StatusCode(200, employee);
            return response;
        }

        /// <summary>
        /// Tạo thông tin một nhân viên mới trong DATABASE
        /// </summary>
        /// <param name="employee">Dữ liệu của nhân viên mới</param>
        /// <returns>Trả về mã code và số dòng bị ảnh hưởng(0 không thành công, 1 đã tạo thành công)</returns>
        [HttpPost]
        public IActionResult POSTEmployee([FromBody] Employee employee)
        {
            // 1. Khai báo thông tin kết nối DATABASE:
            var connectionString =
                "Host = 47.241.69.179;" +
                "Database = MISA.CukCuk_Demo_NVMANH;" +
                "User Id = dev;" +
                "Password = 12345678";

            // 2. Khởi tạo đối tượng kết nối với DATABASE:
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // 3. Truy vấn dữ liệu
            employee.EmployeeId = Guid.NewGuid();
            var columnsName = string.Empty;
            var columnsParam = string.Empty;

            // Khai báo dynamicParam:
            var dynamicParam = new DynamicParameters();

            // Đọc từng property của object:
            var properties = employee.GetType().GetProperties(); ;

            // Duyệt từng property:
            foreach (var prop in properties)
            {
                // Lấy tên của prop: 
                var propName = prop.Name;

                // Lấy value của prop:
                var propValue = prop.GetValue(employee);

                // Lấy kiểu dữ liệu của prop:
                var propType = prop.PropertyType;

                // Thêm param tương ứng với mỗi property của đối tượng:
                dynamicParam.Add($"@{propName}", propValue);

                columnsName += $"{propName},";
                columnsParam += $"@{propName},";
            }
            columnsName = columnsName.Remove(columnsName.Length - 1, 1);
            columnsParam = columnsParam.Remove(columnsParam.Length - 1, 1);
            var sqlCommand = $"INSERT INTO Employee ({columnsName}) VALUES ({columnsParam})";

            var rowEffects = dbConnection.Execute(sqlCommand, param: dynamicParam);

            // 4. Trả về cho CLIENT
            var response = StatusCode(200, rowEffects);
            return response;
        }

        ///// <summary>
        ///// Chỉnh sửa thông tin một khách hàng theo customerId
        ///// </summary>
        ///// <param name="customer"> Dữ liệu mới cập nhật cho một khách hàng</param>
        ///// <param name="customerId"> Id của khách hàng</param>
        ///// <returns>Trả về mã code và số dòng bị ảnh hưởng (0 không thành công, 1 đã tạo thành công)</returns>
        ////[HttpPut("{customerId}")]
        ////public IActionResult PUTCustomer([FromBody] Employee customer, string customerId)
        ////{
        ////     1. Khai báo thông tin kết nối DATABASE:
        ////    var connectionString =
        ////        "Host = 47.241.69.179;" +
        ////        "Database = MISA.CukCuk_Demo_NVMANH;" +
        ////        "User Id = dev;" +
        ////        "Password = 12345678";

        ////     2. Khởi tạo đối tượng kết nối với DATABASE:
        ////    IDbConnection dbConnection = new MySqlConnection(connectionString);

        ////     3. Truy vấn dữ liệu
        ////    var columnsUpdate = string.Empty;

        ////     Khai báo dynamicParam:
        ////    var dynamicParam = new DynamicParameters();

        ////     Đọc từng property của object:
        ////    var properties = customer.GetType().GetProperties(); ;

        ////     Gán CustomerId vào dynamicParam
        ////    dynamicParam.Add("@CustomerIdParam", customer.CustomerId);

        ////     Duyệt từng property:
        ////    foreach (var prop in properties)
        ////    {
        ////         Lấy tên của prop: 
        ////        var propName = prop.Name;

        ////         Lấy value của prop:
        ////        var propValue = prop.GetValue(customer);

        ////         Lấy kiểu dữ liệu của prop:
        ////        var propType = prop.PropertyType;
        ////        if (propName != "CustomerId")
        ////        {
        ////             Thêm param tương ứng với mỗi property của đối tượng:
        ////            dynamicParam.Add($"@{propName}", propValue);

        ////            columnsUpdate += $"{propName} = @{propName},";
        ////        }
        ////    }
        ////    columnsUpdate = columnsUpdate.Remove(columnsUpdate.Length - 1, 1);

        ////    var sqlCommand = $"UPDATE Customer SET {columnsUpdate} WHERE CustomerId = @CustomerIdParam";

        ////    var rowEffects = dbConnection.Execute(sqlCommand, param: dynamicParam);

        ////     4. Trả về cho CLIENT
        ////    var response = StatusCode(200, rowEffects);
        ////    return response;
        ////}
        ///// <summary>
        ///// Xoá một khách hàng theo customerId
        ///// </summary>
        ///// <param name="customerId">Id của khách hàng</param>
        ///// <returns>Trả về mã code và số dòng bị ảnh hưởng (0 không thành công, 1 đã tạo thành công)</returns>
        //[HttpDelete("{customerId}")]
        //public IActionResult DELETECustomer(string customerId)
        //{
        //    // 1. Khai báo thông tin kết nối DATABASE:
        //    var connectionString =
        //        "Host = 47.241.69.179;" +
        //        "Database = MISA.CukCuk_Demo_NVMANH;" +
        //        "User Id = dev;" +
        //        "Password = 12345678";

        //    // 2. Khởi tạo đối tượng kết nối với DATABASE:
        //    IDbConnection dbConnection = new MySqlConnection(connectionString);

        //    // 3. Truy vấn dữ liệu
        //    var columnsUpdate = string.Empty;

        //    // Khai báo dynamicParam:
        //    var dynamicParam = new DynamicParameters();

        //    // Gán CustomerId vào dynamicParam
        //    dynamicParam.Add("@CustomerIdParam", customerId);

        //    var sqlCommand = $"DELETE FROM Customer WHERE CustomerId = @CustomerIdParam";

        //    var rowEffects = dbConnection.Execute(sqlCommand, param: dynamicParam);

        //    // 4. Trả về cho CLIENT
        //    var response = StatusCode(200, rowEffects);
        //    return response;
        //}
    }
}
