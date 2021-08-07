using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class CustomerGroupsController : ControllerBase
    {
        /// <summary>
        /// Lấy toàn bộ dữ liệu khách hàng
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// <returns>Trả về mã code và json chứa thông tin tất cả khách hàng</returns> 
        [HttpGet]
        public IActionResult GetCustomers()
        {
            // 1. Khai báo thông tin kết nối DATABASE:
            var connectionString =
                "Host = 47.241.69.179;" +
                "Database = MISA.CukCuk_Demo_NVMANH;" +
                "User Id = dev;" +
                "Password = 12345678";

            // 2. Khởi tạo đối tượng kết nối với DATABASE:
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // 3. Lấy dữ liệu:
            var sqlCommand = "SELECT * FROM CustomerGroup";
            var customerGroups = dbConnection.Query<object>(sqlCommand);

            // 4. Trả về cho CLIENT:
            var response = StatusCode(200, customerGroups);
            return response;
        }

        /// <summary>
        /// Lấy dữ liệu một khách hàng với customerId
        /// </summary>
        /// <param name="customerId">Là id của một khách hàng trong cơ sở dữ liệu</param>
        /// <returns>Trả về mã code và object chứa thông tin một khách hàng có id trùng khớp</returns> 
        [HttpGet("{customerGroupId}")]
        public IActionResult GetCustomer(string customerGroupId)
        {
            // 1. Khai báo thông tin kết nối DATABASE:
            var connectionString =
                "Host = 47.241.69.179;" +
                "Database = MISA.CukCuk_Demo_NVMANH;" +
                "User Id = dev;" +
                "Password = 12345678";

            // 2. Khởi tạo đối tượng kết nối với DATABASE:
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // 3. Lấy dữ liệu:
            var sqlCommand = "SELECT * FROM CustomerGroup WHERE CustomerGroupId = @CustomerGroupIdParam";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@CustomerGroupIdParam", customerGroupId);
            var customerGroups = dbConnection.QueryFirstOrDefault<object>(sqlCommand, param: parameters);

            // 4. Trả về cho CLIENT:
            var response = StatusCode(200, customerGroups);
            return response;
        }
    }
}
