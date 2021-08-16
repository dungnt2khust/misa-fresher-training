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
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        /// <summary>
        /// Lấy toàn bộ thông tin phòng ban
        /// </summary>
        /// CreatedBy: NTDUNG (11/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <returns>Trả về mã code và json chứa thông tin tất cả phòng ban</returns>  
        [HttpGet]
        public IActionResult GETDepartments()
        {
            try { 
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
                if (departments.Count() > 0)
                { 
                    var response = StatusCode(200, departments);
                    return response;
                }
                else
                {
                    return StatusCode(204, departments);
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
        /// Lấy thông tin một phòng ban theo DepartmentId
        /// </summary>
        /// CreatedBy: NTDUNG (11/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="departmentId">Là id của một phòng ban trong cơ sở dữ liệu</param>
        /// <returns>Trả về mã code và json chứa thông tin của một phòng ban</returns>  
        [HttpGet("{departmentId}")]
        public IActionResult GETDepartment(string departmentId)
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
                var sqlCommand = "SELECT * FROM Department WHERE DepartmentId = @DepartmentIdParam";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@DepartmentIdParam", departmentId);
                var departments = dbConnection.Query<object>(sqlCommand, param: parameters);

                // 4. Trả về cho CLIENT:
                var response = StatusCode(200, departments);
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
        /// Tạo mới một phòng ban
        /// </summary>
        /// CreatedBy: NTDUNG (11/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="department">Là dữ liệu của một phòng ban dùng để thêm mới</param>
        /// <returns>Trả về số dòng bị ảnh hương (0 - tạo mới thất bại, 1 - tạo mới thành công)</returns>  
        [HttpPost]
        public IActionResult POSTDepartment([FromBody] Department department)
        {
            try { 
                // 1. Khai báo thông tin kết nối DATABASE:
                var connectionString =
                    "Host = 47.241.69.179;" +
                    "Database = WEB07.MF936.NTDUNG.CukCuk;" +
                    "User Id = dev;" +
                    "Password = 12345678";

                // 2. Khởi tạo đối tượng kết nối với DATABASE:
                IDbConnection dbConnection = new MySqlConnection(connectionString);
                
                // Khai báo dynamicParam:
                var dynamicParam = new DynamicParameters();

                #region CheckInfo
                // Kiểm tra thông tin của phòng ban đã hợp lệ hay chưa?
                // 1. MÃ PHÒNG BAN bắt buộc phải có và không được phép trùng
                if (department.DepartmentCode == "" || department.DepartmentCode == null)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.DepartmentCode_Empty_ErrorMsg,
                        userMsg = Properties.Resources.DepartmentCode_Empty_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }  

                dynamicParam.Add("@DepartmentCodeCheck", department.DepartmentCode);

                var sqlCheckDepartmentCode = @"SELECT * FROM Department WHERE DepartmentCode = @DepartmentCodeCheck";

                var searchDepartmentCode = dbConnection.Query<Object>(sqlCheckDepartmentCode, param: dynamicParam);

                if (searchDepartmentCode.Count() > 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.DepartmentCode_Duplicate_ErrorMsg,
                        userMsg = Properties.Resources.DepartmentCode_Duplicate_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }
                
                // 2. TÊN PHÒNG BAN không được để trống và không được phép trùng 
                if (department.DepartmentName == "" || department.DepartmentName == null)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.DepartmentName_Empty_ErrorMsg,
                        userMsg = Properties.Resources.DepartmentName_Empty_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                dynamicParam.Add("@DepartmentNameCheck", department.DepartmentName);

                var sqlCheckDepartmentName = @"SELECT * FROM Department WHERE DepartmentName = @DepartmentNameCheck";

                var searchDepartmentName = dbConnection.Query<Object>(sqlCheckDepartmentName, param: dynamicParam);

                if (searchDepartmentName.Count() > 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.DepartmentName_Duplicate_ErrorMsg,
                        userMsg = Properties.Resources.DepartmentName_Duplicate_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }
                #endregion

                // 3. Truy vấn dữ liệu:
                department.DepartmentId = Guid.NewGuid();
                department.CreatedDate = DateTime.Now;
                department.CreatedBy = "NTDUNG";

                var columnsName = string.Empty;
                var columnsParam = string.Empty;

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
        /// Chỉnh sửa một phòng ban
        /// </summary>
        /// CreatedBy: NTDUNG (12/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="department">Là dữ liệu của một phòng ban dùng để chỉnh sửa</param>
        /// <param name="departmentId">là Id của phòng ban muốn chỉnh sửa</param>
        /// <returns>Trả về số dòng bị ảnh hương (0 - tạo mới thất bại, 1 - tạo mới thành công)</returns>  
        [HttpPut("{departmentId}")]
        public IActionResult PUTDepartment([FromBody] Department department, string departmentId)
        {
            try { 
                // 1. Khai báo thông tin kết nối DATABASE:
                var connectionString =
                    "Host = 47.241.69.179;" +
                    "Database = WEB07.MF936.NTDUNG.CukCuk;" +
                    "User Id = dev;" +
                    "Password = 12345678";

                // 2. Khởi tạo đối tượng kết nối với DATABASE:
                IDbConnection dbConnection = new MySqlConnection(connectionString);

                // Khai báo dynamicParam:
                var dynamicParam = new DynamicParameters();

                dynamicParam.Add("@DepartmentIdParam", departmentId);

                #region CheckInfo
                // Kiểm tra thông tin của phòng ban đã hợp lệ hay chưa?
                // 1. MÃ PHÒNG BAN bắt buộc phải có và không được phép trùng
                if (department.DepartmentCode == "" || department.DepartmentCode == null)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.DepartmentCode_Empty_ErrorMsg,
                        userMsg = Properties.Resources.DepartmentCode_Empty_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                dynamicParam.Add("@DepartmentCodeCheck", department.DepartmentCode);

                var sqlCheckDepartmentCode = @"SELECT * FROM Department WHERE DepartmentCode = @DepartmentCodeCheck AND DepartmentId != @DepartmentIdParam";

                var searchDepartmentCode = dbConnection.Query<Object>(sqlCheckDepartmentCode, param: dynamicParam);

                if (searchDepartmentCode.Count() > 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.DepartmentCode_Duplicate_ErrorMsg,
                        userMsg = Properties.Resources.DepartmentCode_Duplicate_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                // 2. TÊN PHÒNG BAN không được để trống và không được phép trùng 
                if (department.DepartmentName == "" || department.DepartmentName == null)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.DepartmentName_Empty_ErrorMsg,
                        userMsg = Properties.Resources.DepartmentName_Empty_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                dynamicParam.Add("@DepartmentNameCheck", department.DepartmentName);

                var sqlCheckDepartmentName = @"SELECT * FROM Department WHERE DepartmentName = @DepartmentNameCheck AND DepartmentId != @DepartmentIdParam";

                var searchDepartmentName = dbConnection.Query<Object>(sqlCheckDepartmentName, param: dynamicParam);

                if (searchDepartmentName.Count() > 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.DepartmentName_Duplicate_ErrorMsg,
                        userMsg = Properties.Resources.DepartmentName_Duplicate_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }
                #endregion

                // 3. Truy vấn dữ liệu:
                department.ModifiedDate = DateTime.Now;
                department.ModifiedBy = "NTDUNG";

                var columnsUpdate = string.Empty;

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
                    if (propName != "DepartmentId")
                    {
                        // Thêm param tương ứng với mỗi property của đối tượng:
                        dynamicParam.Add($"@{propName}", propValue);

                        columnsUpdate += $"{propName} = @{propName},";
                    }
                }
                columnsUpdate = columnsUpdate.Remove(columnsUpdate.Length - 1, 1);

                var sqlCommand = $"UPDATE Department SET {columnsUpdate} WHERE DepartmentId = @DepartmentIdParam";

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

        /// <summary>
        /// Xoá một phòng ban theo departmentId
        /// </summary>
        /// CreatedBy: NTDUNG (12/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="departmentId">Id của phòng ban muốn xoá</param>
        /// <returns>Trả về mã code và số dòng bị ảnh hưởng (0 không thành công, 1 đã tạo thành công)</returns>
        [HttpDelete("{departmentId}")]
        public IActionResult DELETEDepartment(string departmentId)
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
                dynamicParam.Add("@DepartmentIdCheck", departmentId);

                var sqlCheckDepartmentId = @"SELECT * FROM Department WHERE DepartmentId = @DepartmentIdCheck";

                var searchDepartmentId = dbConnection.Query<Object>(sqlCheckDepartmentId, param: dynamicParam);

                return BadRequest(searchDepartmentId.Count());
                if (searchDepartmentId.Count() <= 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.Dev_DepartmentId_NonExist_ErrorMsg,
                        userMsg = Properties.Resources.DepartmentId_NonExist_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return StatusCode(500, errorObj);
                }
                #endregion

                // 3. Truy vấn dữ liệu

                // Gán departmentId vào dynamicParam
                dynamicParam.Add("@DepartmentIdParam", departmentId);

                var sqlCommand = $"DELETE FROM Department WHERE DepartmentId = @DepartmentIdParam";

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
