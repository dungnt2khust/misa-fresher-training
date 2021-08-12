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
    public class CustomerGroupsController : ControllerBase
    {
        /// <summary>
        /// Lấy toàn bộ dữ liệu nhóm khách hàng
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <returns>Trả về mã code và json chứa thông tin tất cả nhóm khách hàng</returns> 
        [HttpGet]
        public IActionResult GETCustomerGroups()
        {
            try { 
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
                if (customerGroups.Count() > 0)
                { 
                    var response = StatusCode(200, customerGroups);
                    return response;
                } 
                else
                {
                    return StatusCode(204, customerGroups);
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
        /// Lấy dữ liệu một nhóm khách hàng với customerGroupId
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="customerGroupId">Là id của một nhóm khách hàng trong cơ sở dữ liệu</param>
        /// <returns>Trả về mã code và object chứa thông tin một nhóm khách hàng có id trùng khớp</returns> 
        [HttpGet("{customerGroupId}")]
        public IActionResult GETCustomerGroup(string customerGroupId)
        {
            try { 
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
        /// Tạo thông tin một nhóm khách hàng mới trong DATABASE
        /// </summary>
        /// CreatedBy: NTDUNG (12/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="customerGroup">Dữ liệu của nhóm khách hàng mới</param>
        /// <returns>Trả về mã code, số dòng bị ảnh hưởng (0 không thành công, 1 đã tạo thành công), hoặc trả về lỗi</returns>
        [HttpPost]
        public IActionResult POSTCustomerGroup([FromBody] CustomerGroup customerGroup)
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
                // Kiểm tra tên của nhóm khách hàng có bị trùng không
                dynamicParam.Add("@CustomerGroupNameParam", customerGroup.CustomerGroupName);

                var sqlCheckCustomerGroupName = @"SELECT * FROM CustomerGroup WHERE CustomerGroupName = @CustomerGroupNameParam";

                var searchCustomerGroupName = dbConnection.Query<Object>(sqlCheckCustomerGroupName, param: dynamicParam);

                if (searchCustomerGroupName.Count() > 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.Dev_CustomerGroupName_Duplicate_ErrorMsg,
                        userMsg = Properties.Resources.CustomerGroupName_Duplicate_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }
                #endregion

                // 3. Truy vấn dữ liệu
                customerGroup.CustomerGroupId = Guid.NewGuid();
                customerGroup.CreatedDate = DateTime.Now;
                customerGroup.CreatedBy = "NTDUNG";
                var columnsName = string.Empty;
                var columnsParam = string.Empty;

                // Đọc từng property của object:
                var properties = customerGroup.GetType().GetProperties(); ;

                // Duyệt từng property:
                foreach (var prop in properties)
                {
                    // Lấy tên của prop: 
                    var propName = prop.Name;

                    // Lấy value của prop:
                    var propValue = prop.GetValue(customerGroup);

                    // Lấy kiểu dữ liệu của prop:
                    var propType = prop.PropertyType;

                    // Thêm param tương ứng với mỗi property của đối tượng:
                    dynamicParam.Add($"@{propName}", propValue);

                    columnsName += $"{propName},";
                    columnsParam += $"@{propName},";
                }
                columnsName = columnsName.Remove(columnsName.Length - 1, 1);
                columnsParam = columnsParam.Remove(columnsParam.Length - 1, 1);
                var sqlCommand = $"INSERT INTO CustomerGroup({columnsName}) VALUES ({columnsParam})";

                var rowEffects = dbConnection.Execute(sqlCommand, param: dynamicParam);

                // 4. Trả về cho CLIENT
                var response = StatusCode(201, rowEffects);
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
        /// Chỉnh sửa thông tin một nhóm khách hàng mới trong DATABASE
        /// </summary>
        /// CreatedBy: NTDUNG (12/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="customerGroup">Dữ liệu của nhóm khách hàng muốn cập nhật</param>
        /// <param name="customerGroupId">Id của nhóm khách hàng muốn chỉnh sửa</param>
        /// <returns>Trả về mã code, số dòng bị ảnh hưởng (0 không thành công, 1 đã tạo thành công), hoặc trả về lỗi</returns>
        [HttpPut("{customerGroupId}")]
        public IActionResult PUTCustomerGroup([FromBody] CustomerGroup customerGroup, string customerGroupId)
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
                // Kiểm tra tên của nhóm khách hàng có bị trùng không
                dynamicParam.Add("@CustomerGroupNameParam", customerGroup.CustomerGroupName);
                dynamicParam.Add("@CustomerGroupIdParam", customerGroupId);

                var sqlCheckCustomerGroupName = @"SELECT * FROM CustomerGroup WHERE CustomerGroupName = @CustomerGroupNameParam AND 
                                                        CustomerGroupId != @CustomerGroupIdParam";

                var searchCustomerGroupName = dbConnection.Query<Object>(sqlCheckCustomerGroupName, param: dynamicParam);

                if (searchCustomerGroupName.Count() > 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.Dev_CustomerGroupName_Duplicate_ErrorMsg,
                        userMsg = Properties.Resources.CustomerGroupName_Duplicate_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }
                #endregion

                // 3. Truy vấn dữ liệu
                customerGroup.ModifiedDate = DateTime.Now;
                customerGroup.ModifiedBy = "NTDUNG";
                var columnsUpdate = string.Empty;

                // Đọc từng property của object:
                var properties = customerGroup.GetType().GetProperties(); ;

                // Duyệt từng property:
                foreach (var prop in properties)
                {
                    // Lấy tên của prop: 
                    var propName = prop.Name;

                    // Lấy value của prop:
                    var propValue = prop.GetValue(customerGroup);

                   // Lấy kiểu dữ liệu của prop:
                    var propType = prop.PropertyType;
                    if (propName != "CustomerGroupId")
                    {
                        // Thêm param tương ứng với mỗi property của đối tượng:
                        dynamicParam.Add($"@{propName}", propValue);

                        columnsUpdate += $"{propName} = @{propName},";
                    }
                }

                columnsUpdate = columnsUpdate.Remove(columnsUpdate.Length - 1, 1);

                var sqlCommand = $"UPDATE CustomerGroup SET {columnsUpdate} WHERE CustomerGroupId = @CustomerGroupIdParam";
                
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
        /// Xoá một nhóm khách hàng theo customerGroupId
        /// </summary>
        /// CreatedBy: NTDUNG (12/08/2021)
        /// ModifiedBy: NTDUNG (12/08/2021)
        /// <param name="customerGroupId">Id của khách hàng</param>
        /// <returns>Trả về mã code và số dòng bị ảnh hưởng (0 không thành công, 1 đã tạo thành công)</returns>
        [HttpDelete("{customerGroupId}")]
        public IActionResult DELETECustomerGroup(string customerGroupId)
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
                dynamicParam.Add("@CustomerGroupIdCheck", customerGroupId);

                var sqlCheckCustomerGroupId = @"SELECT * FROM CustomerGroup WHERE CustomerGroupId = @CustomerGroupIdCheck";
               
                var searchCustomerGroupId = dbConnection.Query<Object>(sqlCheckCustomerGroupId, param: dynamicParam);

                if (searchCustomerGroupId.Count() <= 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.Dev_CustomerGroupId_NonExist_ErrorMsg,
                        userMsg = Properties.Resources.CustomerGroupId_NonExist_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return StatusCode(500, errorObj);
                }
                #endregion

                // 3. Truy vấn dữ liệu

                // Gán CustomerId vào dynamicParam
                dynamicParam.Add("@CustomerGroupIdParam", customerGroupId);

                var sqlCommand = $"DELETE FROM CustomerGroup WHERE CustomerGroupId = @CustomerGroupIdParam";

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
