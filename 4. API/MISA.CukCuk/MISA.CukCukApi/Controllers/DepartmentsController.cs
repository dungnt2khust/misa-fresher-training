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
    public class DepartmentsController : ControllerBase
    {
        /// <summary>
        /// Lấy toàn bộ thông tin phòng ban
        /// </summary>
        /// CreatedBy: NTDUNG (11/08/2021)
        /// <returns>Trả về mã code và json chứa thông tin tất cả phòng ban</returns>  
        [HttpGet]
        public IActionResult GETDepartments()
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
            var departments = dbConnection.Query<object>(sqlCommand);

            // 4. Trả về cho CLIENT:
            var response = StatusCode(200, departments);
            return response;
        }

        /// <summary>
        /// Lấy thông tin một phòng ban theo DepartmentId
        /// </summary>
        /// CreatedBy: NTDUNG (11/08/2021)
        /// <param name="departmentId">Là id của một phòng ban trong cơ sở dữ liệu</param>
        /// <returns>Trả về mã code và json chứa thông tin của một phòng ban</returns>  
        [HttpGet("{departmentId}")]
        public IActionResult GETDepartment(string departmentId)
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
            var departments = dbConnection.Query<object>(sqlCommand, param:parameters);

            // 4. Trả về cho CLIENT:
            var response = StatusCode(200, departments);
            return response;
        }

        /// <summary>
        /// Tạo mới một phòng ban
        /// </summary>
        /// CreatedBy: NTDUNG (11/08/2021)
        /// <param name="department">Là dữ liệu của một phòng ban dùng để thêm mới</param>
        /// <returns>Trả về số dòng bị ảnh hương (0 - tạo mới thất bại, 1 - tạo mới thành công)</returns>  
        [HttpPost]
        public IActionResult POSTDepartment([FromBody] Department department)
        {
            // 1. Khai báo thông tin kết nối DATABASE:
            var connectionString =
                "Host = 47.241.69.179;" +
                "Database = WEB07.MF936.NTDUNG.CukCuk;" +
                "User Id = dev;" +
                "Password = 12345678";

            // 2. Khởi tạo đối tượng kết nối với DATABASE:
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // 3. Truy vấn dữ liệu:
            department.DepartmentId = Guid.NewGuid();
            department.CreatedDate = DateTime.Now;
            department.CreatedBy = "NTDUNG";

            var columnsName = string.Empty;
            var columnsParam = string.Empty;

            // Khai báo dynamicParam:
            var dynamicParam = new DynamicParameters();

            // Đọc từng property của object:
            var properties = department.GetType().GetProperties(); ;

            // Duyệt từng property:
            foreach (var prop in properties)
            {
                // Lấy tên của prop: 
                var propName = prop.Name;

                // Lấy value của prop: 
                var propValue = prop.GetValue(department);

                // Lấy kiểu dữ liệu của prop:
                var propType = prop.PropertyType;

                // Thêm param tương ứng với mỗi property của đối tượng:
                dynamicParam.Add($"@{propName}", propValue);

                columnsName += $"{propName},";
                columnsParam += $"@{propName},";
            }
            columnsName = columnsName.Remove(columnsName.Length - 1, 1);
            columnsParam = columnsParam.Remove(columnsParam.Length - 1, 1);
            var sqlCommand = $"INSERT INTO Department({columnsName}) VALUES ({columnsParam})";

            var rowEffects = dbConnection.Execute(sqlCommand, param: dynamicParam);

            // 4. Trả về cho CLIENT
            var response = StatusCode(200, rowEffects);
            return response;
        }
    }
}
