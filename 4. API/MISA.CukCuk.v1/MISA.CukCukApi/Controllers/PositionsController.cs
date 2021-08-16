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
    public class PositionsController : ControllerBase
    {
        /// <summary>
        /// Lấy toàn bộ thông tin chức vụ
        /// </summary>
        /// CreatedBy: NTDUNG (11/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <returns>Trả về mã code và json chứa thông tin tất cả chức vụ</returns>  
        [HttpGet]
        public IActionResult GETPositions()
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
                var sqlCommand = "SELECT * FROM Position";
                var positions = dbConnection.Query<object>(sqlCommand);

                // 4. Trả về cho CLIENT:
                if (positions.Count() > 0)
                {
                    var response = StatusCode(200, positions);
                    return response;
                }
                else
                {
                    return StatusCode(204, positions);
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
        /// Lấy thông tin một chức vụ theo PositionId
        /// </summary>
        /// CreatedBy: NTDUNG (11/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="positionId">Là id của một chức vụ trong cơ sở dữ liệu</param>
        /// <returns>Trả về mã code và json chứa thông tin của một chức vụ</returns>  
        [HttpGet("{positionId}")]
        public IActionResult GETPosition(string positionId)
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
                var sqlCommand = "SELECT * FROM Position WHERE PositionId = @PositionIdParam";
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@PositionIdParam", positionId);
                var positions = dbConnection.Query<object>(sqlCommand, param: parameters);

                // 4. Trả về cho CLIENT:
                var response = StatusCode(200, positions);
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
        /// Tạo mới một chức vụ
        /// </summary>
        /// CreatedBy: NTDUNG (11/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="position">Là dữ liệu của một chức vụ dùng để thêm mới</param>
        /// <returns>Trả về số dòng bị ảnh hương (0 - tạo mới thất bại, 1 - tạo mới thành công)</returns>  
        [HttpPost]
        public IActionResult POSTPosition([FromBody] Position position)
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
                // Kiểm tra thông tin của chức vụ đã hợp lệ hay chưa?
                // 1. MÃ PHÒNG BAN bắt buộc phải có và không được phép trùng
                if (position.PositionCode == "" || position.PositionCode == null)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.PositionCode_Empty_ErrorMsg,
                        userMsg = Properties.Resources.PositionCode_Empty_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                dynamicParam.Add("@PositionCodeCheck", position.PositionCode);

                var sqlCheckPositionCode = @"SELECT * FROM Position WHERE PositionCode = @PositionCodeCheck";

                var searchPositionCode = dbConnection.Query<Object>(sqlCheckPositionCode, param: dynamicParam);

                if (searchPositionCode.Count() > 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.PositionCode_Duplicate_ErrorMsg,
                        userMsg = Properties.Resources.PositionCode_Duplicate_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                // 2. TÊN PHÒNG BAN không được để trống và không được phép trùng 
                if (position.PositionName == "" || position.PositionName == null)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.PositionName_Empty_ErrorMsg,
                        userMsg = Properties.Resources.PositionName_Empty_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                dynamicParam.Add("@PositionNameCheck", position.PositionName);

                var sqlCheckPositionName = @"SELECT * FROM Position WHERE PositionName = @PositionNameCheck";

                var searchPositionName = dbConnection.Query<Object>(sqlCheckPositionName, param: dynamicParam);

                if (searchPositionName.Count() > 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.PositionName_Duplicate_ErrorMsg,
                        userMsg = Properties.Resources.PositionName_Duplicate_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }
                #endregion

                // 3. Truy vấn dữ liệu:
                position.PositionId = Guid.NewGuid();
                position.CreatedDate = DateTime.Now;
                position.CreatedBy = "NTDUNG";

                var columnsName = string.Empty;
                var columnsParam = string.Empty;

                // Đọc từng property của object:
                var properties = position.GetType().GetProperties(); ;

                // Duyệt từng property:
                foreach (var prop in properties)
                {
                    // Lấy tên của prop: 
                    var propName = prop.Name;

                    // Lấy value của prop: 
                    var propValue = prop.GetValue(position);

                    // Lấy kiểu dữ liệu của prop:
                    var propType = prop.PropertyType;

                    // Thêm param tương ứng với mỗi property của đối tượng:
                    dynamicParam.Add($"@{propName}", propValue);

                    columnsName += $"{propName},";
                    columnsParam += $"@{propName},";
                }
                columnsName = columnsName.Remove(columnsName.Length - 1, 1);
                columnsParam = columnsParam.Remove(columnsParam.Length - 1, 1);
                var sqlCommand = $"INSERT INTO Position({columnsName}) VALUES ({columnsParam})";

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
        /// Chỉnh sửa một chức vụ
        /// </summary>
        /// CreatedBy: NTDUNG (12/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="position">Là dữ liệu của một chức vụ dùng để chỉnh sửa</param>
        /// <param name="positionId">là Id của chức vụ muốn chỉnh sửa</param>
        /// <returns>Trả về số dòng bị ảnh hương (0 - tạo mới thất bại, 1 - tạo mới thành công)</returns>  
        [HttpPut("{positionId}")]
        public IActionResult PUTPosition([FromBody] Position position, string positionId)
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

                dynamicParam.Add("@PositionIdParam", positionId);

                #region CheckInfo
                // Kiểm tra thông tin của chức vụ đã hợp lệ hay chưa?
                // 1. MÃ PHÒNG BAN bắt buộc phải có và không được phép trùng
                if (position.PositionCode == "" || position.PositionCode == null)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.PositionCode_Empty_ErrorMsg,
                        userMsg = Properties.Resources.PositionCode_Empty_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                dynamicParam.Add("@PositionCodeCheck", position.PositionCode);

                var sqlCheckPositionCode = @"SELECT * FROM Position WHERE PositionCode = @PositionCodeCheck AND PositionId != @PositionIdParam";

                var searchPositionCode = dbConnection.Query<Object>(sqlCheckPositionCode, param: dynamicParam);

                if (searchPositionCode.Count() > 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.PositionCode_Duplicate_ErrorMsg,
                        userMsg = Properties.Resources.PositionCode_Duplicate_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                // 2. TÊN PHÒNG BAN không được để trống và không được phép trùng 
                if (position.PositionName == "" || position.PositionName == null)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.PositionName_Empty_ErrorMsg,
                        userMsg = Properties.Resources.PositionName_Empty_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                dynamicParam.Add("@PositionNameCheck", position.PositionName);

                var sqlCheckPositionName = @"SELECT * FROM Position WHERE PositionName = @PositionNameCheck AND PositionId != @PositionIdParam";

                var searchPositionName = dbConnection.Query<Object>(sqlCheckPositionName, param: dynamicParam);

                if (searchPositionName.Count() > 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.PositionName_Duplicate_ErrorMsg,
                        userMsg = Properties.Resources.PositionName_Duplicate_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }
                #endregion

                // 3. Truy vấn dữ liệu:
                position.ModifiedDate = DateTime.Now;
                position.ModifiedBy = "NTDUNG";

                var columnsUpdate = string.Empty;

                // Đọc từng property của object:
                var properties = position.GetType().GetProperties(); ;

                // Duyệt từng property:
                foreach (var prop in properties)
                {
                    // Lấy tên của prop: 
                    var propName = prop.Name;

                    // Lấy value của prop: 
                    var propValue = prop.GetValue(position);

                    // Lấy kiểu dữ liệu của prop:
                    var propType = prop.PropertyType;
                    if (propName != "PositionId")
                    {
                        // Thêm param tương ứng với mỗi property của đối tượng:
                        dynamicParam.Add($"@{propName}", propValue);

                        columnsUpdate += $"{propName} = @{propName},";
                    }
                }
                columnsUpdate = columnsUpdate.Remove(columnsUpdate.Length - 1, 1);

                var sqlCommand = $"UPDATE Position SET {columnsUpdate} WHERE PositionId = @PositionIdParam";

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
        /// Xoá một chức vụ theo positionId
        /// </summary>
        /// CreatedBy: NTDUNG (12/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="positionId">Id của chức vụ muốn xoá</param>
        /// <returns>Trả về mã code và số dòng bị ảnh hưởng (0 không thành công, 1 đã tạo thành công)</returns>
        [HttpDelete("{positionId}")]
        public IActionResult DELETEPosition(string positionId)
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
                dynamicParam.Add("@PositionIdCheck", positionId);

                var sqlCheckPositionId = @"SELECT * FROM Position WHERE PositionId = @PositionIdCheck";

                var searchPositionId = dbConnection.Query<Object>(sqlCheckPositionId, param: dynamicParam);

                if (searchPositionId.Count() <= 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.Dev_PositionId_NonExist_ErrorMsg,
                        userMsg = Properties.Resources.PositionId_NonExist_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return StatusCode(500, errorObj);
                }
                #endregion

                // 3. Truy vấn dữ liệu

                // Gán positionId vào dynamicParam
                dynamicParam.Add("@PositionIdParam", positionId);

                var sqlCommand = $"DELETE FROM Position WHERE PositionId = @PositionIdParam";

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
