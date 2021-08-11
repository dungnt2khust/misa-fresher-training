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
    public class DepartmentsController : ControllerBase
    {
        /// <summary>
        /// Lấy toàn bộ thông tin phòng ban
        /// </summary>
        /// CreatedBy: NTDUNG (11/08/2021)
        /// <returns>Trả về mã code và json chứa thông tin tất cả phòng ban</returns>  
        [HttpGet]
        public IActionResult GetDepartments()
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
            var sqlCommand = "SELECT * FROM Department";
            var customers = dbConnection.Query<object>(sqlCommand);

            // 4. Trả về cho CLIENT:
            var response = StatusCode(200, customers);
            return response;
        }

        /// <summary>
        /// Lấy thông tin một phòng ban theo DepartmentId
        /// </summary>
        /// CreatedBy: NTDUNG (11/08/2021)
        /// <param name="departmentId">Là id của một phòng ban trong cơ sở dữ liệu</param>
        /// <returns>Trả về mã code và json chứa thông tin của một phòng ban</returns>  
        [HttpGet("{departmentId}")]
        public IActionResult GetDepartment(string departmentId)
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
            var sqlCommand = "SELECT * FROM Department WHERE DepartmentId = @DepartmentIdParam";
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@DepartmentIdParam", departmentId);
            var department = dbConnection.Query<object>(sqlCommand, param:parameters);

            // 4. Trả về cho CLIENT:
            var response = StatusCode(200, department);
            return response;
        }
    }
}
