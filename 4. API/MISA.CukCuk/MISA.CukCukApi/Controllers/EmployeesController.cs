using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.CukCukApi.Model;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace MISA.CukCukApi.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        /// <summary>
        /// Lấy toàn bộ dữ liệu nhân viên
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <returns>Trả về mã code và json chứa thông tin tất cả nhân viên</returns> 
        [HttpGet]
        public IActionResult GetEmployees()
        {
            try
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
                if (employees.Count() > 0)
                { 
                    var response = StatusCode(200, employees);
                    return response;
                }
                else
                {
                    return StatusCode(204, employees);
                }
            }
            catch (Exception ex)
            {
                var errorObj = new
                {
                    devMsg = ex.Message,
                    userMsg = Properties.Resources.Exception_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return StatusCode(500, errorObj);
            }
        }

        /// <summary>
        /// Lấy dữ liệu một nhân viên với employeeId
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="employeeId">Là id của một nhân viên trong cơ sở dữ liệu</param>
        /// <returns>Trả về mã code và object chứa thông tin một nhân viên có id trùng khớp</returns> 
        [HttpGet("{employeeId}")]
        public IActionResult GetEmployee(string employeeId)
        {
            try
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
            catch (Exception ex)
            {
                var errorObj = new
                {
                    devMsg = ex.Message,
                    userMsg = Properties.Resources.Exception_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return StatusCode(500, errorObj);
            }
        }

        /// <summary>
        /// Tạo thông tin một nhân viên mới trong DATABASE
        /// </summary> 
        /// CreatedBy: NTDUNG (07/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
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

            // Khai báo dynamicParam:
            var dynamicParam = new DynamicParameters();

            #region CheckInfo
            // Kiểm tra thông tin của khách hàng đã hợp lệ hay chưa?
            // 1. MÃ KHÁCH HÀNG bắt buộc phải có
            if (employee.EmployeeCode == "" || employee.EmployeeCode == null)
            {
                var errorObj = new
                {
                    devMsg = Properties.Resources.EmployeeCode_Empty_ErrorMsg,
                    userMsg = Properties.Resources.EmployeeCode_Empty_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return BadRequest(errorObj);
            }

            // 2. EMAIL bắt buộc và phải đúng định dạng
            if (employee.Email == "" || employee.Email == null)
            {
                var errorObj = new
                {
                    devMsg = Properties.Resources.EmployeeEmail_Empty_ErrorMsg,
                    userMsg = Properties.Resources.EmployeeEmail_Empty_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return BadRequest(errorObj);
            }
            var emailFormat = @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
            bool isValidEmail = Regex.IsMatch(employee.Email, emailFormat);

            if (!isValidEmail)
            {
                var errorObj = new
                {
                    devMsg = Properties.Resources.EmployeeEmail_Invalid_ErrorMsg,
                    userMsg = Properties.Resources.EmployeeEmail_Invalid_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return BadRequest(errorObj);
            }

            // 3. MÃ KHÁCH HÀNG không được phép trùng
            dynamicParam.Add("@EmployeeCodeCheck", employee.EmployeeCode);

            var sqlCheckEmployeeCode = @"SELECT * FROM Employee WHERE EmployeeCode = @EmployeeCodeCheck";

            var searchEmployeeCode = dbConnection.Query<Object>(sqlCheckEmployeeCode, param: dynamicParam);

            if (searchEmployeeCode.Count() > 0)
            {
                var errorObj = new
                {
                    devMsg = Properties.Resources.EmployeeCode_Duplicate_ErrorMsg,
                    userMsg = Properties.Resources.EmployeeCode_Duplicate_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return BadRequest(errorObj);
            }
            #endregion

            // 3. Truy vấn dữ liệu
            employee.EmployeeId = Guid.NewGuid();
            var columnsName = string.Empty;
            var columnsParam = string.Empty;

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

        /// <summary>
        /// Chỉnh sửa thông tin một nhân viên theo employeeId
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name = "employee" > Dữ liệu mới cập nhật cho một nhân viên</param>
        /// <param name = "employeeId" > Id của nhân viên</param>
        /// <returns>Trả về mã code và số dòng bị ảnh hưởng (0 không thành công, 1 đã tạo thành công), hoặc trả về lỗi</returns>
        [HttpPut("{employeeId}")]
        public IActionResult PUTEmployee([FromBody] Employee employee, string employeeId)
        {
            try
            {
                //1.Khai báo thông tin kết nối DATABASE:
                var connectionString =
                    "Host = 47.241.69.179;" +
                    "Database = MISA.CukCuk_Demo_NVMANH;" +
                    "User Id = dev;" +
                    "Password = 12345678";

                //2.Khởi tạo đối tượng kết nối với DATABASE:
                IDbConnection dbConnection = new MySqlConnection(connectionString);

                //Khai báo dynamicParam:
                var dynamicParam = new DynamicParameters();

                #region CheckInfo
                // Kiểm tra thông tin của khách hàng đã hợp lệ hay chưa?
                // 1. MÃ KHÁCH HÀNG bắt buộc phải có
                if (employee.EmployeeCode == "" || employee.EmployeeCode == null)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.EmployeeCode_Empty_ErrorMsg,
                        userMsg = Properties.Resources.EmployeeCode_Empty_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                // 2. EMAIL bắt buộc và phải đúng định dạng
                if (employee.Email == "" || employee.Email == null)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.EmployeeEmail_Empty_ErrorMsg,
                        userMsg = Properties.Resources.EmployeeEmail_Empty_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }
                var emailFormat = @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
                bool isValidEmail = Regex.IsMatch(employee.Email, emailFormat);

                if (!isValidEmail)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.EmployeeEmail_Invalid_ErrorMsg,
                        userMsg = Properties.Resources.EmployeeEmail_Invalid_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                // 3. MÃ KHÁCH HÀNG không được phép trùng
                dynamicParam.Add("@EmployeeCodeCheck", employee.EmployeeCode);

                var sqlCheckEmployeeCode = @"SELECT * FROM Employee WHERE EmployeeCode = @EmployeeCodeCheck";

                var searchEmployeeCode = dbConnection.Query<Object>(sqlCheckEmployeeCode, param: dynamicParam);

                if (searchEmployeeCode.Count() > 1)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.EmployeeCode_Duplicate_ErrorMsg,
                        userMsg = Properties.Resources.EmployeeCode_Duplicate_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }
                #endregion

                //3.Truy vấn dữ liệu
                var columnsUpdate = string.Empty;


                //Đọc từng property của object:
                var properties = employee.GetType().GetProperties(); ;

                //Gán CustomerId vào dynamicParam
                dynamicParam.Add("@EmployeeIdParam", employeeId);

                //Duyệt từng property:
                foreach (var prop in properties)
                {
                    //Lấy tên của prop: 
                    var propName = prop.Name;

                    //Lấy value của prop:
                    var propValue = prop.GetValue(employee);

                    //Lấy kiểu dữ liệu của prop:
                    var propType = prop.PropertyType;

                    //Thêm param tương ứng với mỗi property của đối tượng:
                    dynamicParam.Add($"@{propName}", propValue);

                    columnsUpdate += $"{propName} = @{propName},";
                }
                columnsUpdate = columnsUpdate.Remove(columnsUpdate.Length - 1, 1);

                var sqlCommand = $"UPDATE Employee SET {columnsUpdate} WHERE EmployeeId = @EmployeeIdParam";

                var rowEffects = dbConnection.Execute(sqlCommand, param: dynamicParam);

                //4.Trả về cho CLIENT
                var response = StatusCode(200, rowEffects);
                return response;
            }
            catch (Exception ex)
            {
                var errorObj = new
                {
                    devMsg = ex.Message,
                    userMsg = Properties.Resources.Exception_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return StatusCode(500, errorObj);
            }
        }
        
        /// <summary>
        /// Xoá một nhân viên theo EmployeeId
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="employeeId">Id của nhân viên</param>
        /// <returns>Trả về mã code và số dòng bị ảnh hưởng (0 không thành công, 1 đã tạo thành công) hoặc trả về lỗi</returns>
        [HttpDelete("{employeeId}")]
        public IActionResult DELETEEmployee(string employeeId)
        {
            try
            {
                // 1. Khai báo thông tin kết nối DATABASE:
                var connectionString =
                    "Host = 47.241.69.179;" +
                    "Database = MISA.CukCuk_Demo_NVMANH;" +
                    "User Id = dev;" +
                    "Password = 12345678";

                // 2. Khởi tạo đối tượng kết nối với DATABASE:
                IDbConnection dbConnection = new MySqlConnection(connectionString);
                
                // Khai báo dynamicParam:
                var dynamicParam = new DynamicParameters();

                #region CheckInfo
                // Kiểm tra id có tồn tại không 
                dynamicParam.Add("@EmployeeIdCheck", employeeId);

                var sqlCheckEmployeeId = @"SELECT * FROM Employee WHERE EmployeeId = @EmployeeIdCheck";

                var searchEmployeeId = dbConnection.Query<Object>(sqlCheckEmployeeId, param: dynamicParam);

                if (searchEmployeeId.Count() <= 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.Dev_EmployeeId_NonExist_ErrorMsg,
                        userMsg = Properties.Resources.EmployeeId_NonExist_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }
                #endregion
                
                // 3. Truy vấn dữ liệu
                var columnsUpdate = string.Empty;


                // Gán CustomerId vào dynamicParam
                dynamicParam.Add("@EmployeeIdParam", employeeId);

                var sqlCommand = $"DELETE FROM Employee WHERE EmployeeId = @EmployeeIdParam";

                var rowEffects = dbConnection.Execute(sqlCommand, param: dynamicParam);

                // 4. Trả về cho CLIENT
                var response = StatusCode(200, rowEffects);
                return response;
            }
            catch (Exception ex)
            {
                var errorObj = new
                {
                    devMsg = ex.Message,
                    userMsg = Properties.Resources.Exception_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return StatusCode(500, errorObj);
            }
        }
    }
}
