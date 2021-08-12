using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.CukCukApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySqlConnector;
using Dapper;
using System.Data;
using Microsoft.AspNetCore.Cors;
using System.Text.RegularExpressions;

namespace MISA.CukCukApi.Controllers
{ 
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        /// <summary>
        /// Lấy toàn bộ dữ liệu khách hàng
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// ModifiedBy: NTDUNG (11/08/2021)
        /// <returns>Trả về mã code, thành công - trả về dữ liệu, thất bại - trả về lỗi</returns>  
        [HttpGet]
        public IActionResult GETCustomers()
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
                var sqlCommand = "SELECT * FROM Customer";
                var customers = dbConnection.Query<object>(sqlCommand);
                // 4. Trả về cho CLIENT:
                if (customers.Count() > 0)
                {  
                    return StatusCode(200, customers); 
                } 
                else
                {
                    return StatusCode(204, customers);
                }
            }
            catch (Exception ex)
            {
                var errorObj = new {
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
        /// Lấy dữ liệu một khách hàng với customerId
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021) 
        /// ModifiedBy: NTDUNG (11/08/2021)
        /// <param name="customerId">Là id của một khách hàng trong cơ sở dữ liệu</param>
        /// <returns>Trả về mã code, thành công - trả về dữ liệu, thất bại - trả về lỗi</returns> 
        [HttpGet("{customerId}")]
        public IActionResult GETCustomer(string customerId)
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


                DynamicParameters parameters = new DynamicParameters();
                // 3. Lấy dữ liệu:
                var sqlCommand = "SELECT * FROM Customer WHERE CustomerId = @CustomerIdParam";
                parameters.Add("@CustomerIdParam", customerId);
                var customer = dbConnection.QueryFirstOrDefault<object>(sqlCommand, param:parameters);

                // 4. Trả về cho CLIENT: 
                var response = StatusCode(200, customer);
                return response;
            }
            catch (Exception ex)
            {
                var errorObj = new {
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
        /// Tạo thông tin một khách hàng mới trong DATABASE
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// ModifiedBy: NTDUNG (11/08/2021)
        /// <param name="customer">Dữ liệu của khách hàng mới</param>
        /// <returns>Trả về mã code, số dòng bị ảnh hưởng (0 không thành công, 1 đã tạo thành công), hoặc trả về lỗi</returns>
        [HttpPost]
        public IActionResult POSTCustomer([FromBody]Customer customer)
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
                // Kiểm tra thông tin của khách hàng đã hợp lệ hay chưa?
                // 1. MÃ KHÁCH HÀNG bắt buộc phải có
                if (customer.CustomerCode == "" || customer.CustomerCode == null)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.CustomerCode_Empty_ErrorMsg,
                        userMsg = Properties.Resources.CustomerCode_Empty_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                // 2. EMAIL bắt buộc và phải đúng định dạng
                if (customer.Email == "" || customer.Email == null)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.CustomerEmail_Empty_ErrorMsg,
                        userMsg = Properties.Resources.CustomerEmail_Empty_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }
                var emailFormat = @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
                bool isValidEmail = Regex.IsMatch(customer.Email, emailFormat);

                if (!isValidEmail)
                {
                    var errorObj = new {
                      devMsg = Properties.Resources.CustomerEmail_Invalid_ErrorMsg,
                      userMsg = Properties.Resources.CustomerEmail_Invalid_ErrorMsg,
                      errorCode = "misa-001",  
                      moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                      traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }

                // 3. MÃ KHÁCH HÀNG không được phép trùng
                dynamicParam.Add("@CustomerCodeCheck", customer.CustomerCode);

                var sqlCheckCustomerCode = @"SELECT * FROM Customer WHERE CustomerCode = @CustomerCodeCheck";

                var searchCustomerCode = dbConnection.Query<Object>(sqlCheckCustomerCode, param: dynamicParam);

                if (searchCustomerCode.Count() > 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.CustomerCode_Duplicate_ErrorMsg,
                        userMsg = Properties.Resources.CustomerCode_Duplicate_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return BadRequest(errorObj);
                }
                #endregion

                // 3. Truy vấn dữ liệu
                customer.CustomerId = Guid.NewGuid();
                var columnsName = string.Empty;
                var columnsParam = string.Empty;

                // Đọc từng property của object:
                var properties = customer.GetType().GetProperties(); ;

                // Duyệt từng property:
                foreach (var prop in properties)
                {
                    // Lấy tên của prop: 
                    var propName = prop.Name;

                    // Lấy value của prop:
                    var propValue = prop.GetValue(customer);

                    // Lấy kiểu dữ liệu của prop:
                    var propType = prop.PropertyType;
                    
                    // Thêm param tương ứng với mỗi property của đối tượng:
                    dynamicParam.Add($"@{propName}", propValue);

                    columnsName += $"{propName},";
                    columnsParam += $"@{propName},";
                }
                columnsName = columnsName.Remove(columnsName.Length - 1, 1);
                columnsParam = columnsParam.Remove(columnsParam.Length - 1, 1);
                var sqlCommand = $"INSERT INTO Customer({columnsName}) VALUES ({columnsParam})";

                var rowEffects = dbConnection.Execute(sqlCommand, param: dynamicParam);

                // 4. Trả về cho CLIENT
                var response = StatusCode(201, rowEffects);
                return response;
            }
            catch (Exception ex)
            {
                var errorObj = new {
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
        /// Chỉnh sửa thông tin một khách hàng theo customerId
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// <param name="customer"> Dữ liệu mới cập nhật cho một khách hàng</param>
        /// <param name="customerId"> Id của khách hàng</param>
        /// <returns>Trả về mã code và số dòng bị ảnh hưởng (0 không thành công, 1 đã tạo thành công)</returns>
        [HttpPut("{customerId}")]
        public IActionResult PUTCustomer([FromBody]Customer customer, string customerId)
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
            if (customer.CustomerCode == "" || customer.CustomerCode == null)
            {
                var errorObj = new
                {
                    devMsg = Properties.Resources.CustomerCode_Empty_ErrorMsg,
                    userMsg = Properties.Resources.CustomerCode_Empty_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return BadRequest(errorObj);
            }

            // 2. EMAIL bắt buộc và phải đúng định dạng
            if (customer.Email == "" || customer.Email == null)
            {
                var errorObj = new
                {
                    devMsg = Properties.Resources.CustomerEmail_Empty_ErrorMsg,
                    userMsg = Properties.Resources.CustomerEmail_Empty_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return BadRequest(errorObj);
            }
            var emailFormat = @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
            bool isValidEmail = Regex.IsMatch(customer.Email, emailFormat);

            if (!isValidEmail)
            {
                var errorObj = new
                {
                    devMsg = Properties.Resources.CustomerEmail_Invalid_ErrorMsg,
                    userMsg = Properties.Resources.CustomerEmail_Invalid_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return BadRequest(errorObj);
            }

            // 3. MÃ KHÁCH HÀNG không được phép trùng
            dynamicParam.Add("@CustomerCodeCheck", customer.CustomerCode);

            var sqlCheckCustomerCode = @"SELECT * FROM Customer WHERE CustomerCode = @CustomerCodeCheck";

            var searchCustomerCode = dbConnection.Query<Object>(sqlCheckCustomerCode, param: dynamicParam);

            if (searchCustomerCode.Count() > 0)
            {
                var errorObj = new
                {
                    devMsg = Properties.Resources.CustomerCode_Duplicate_ErrorMsg,
                    userMsg = Properties.Resources.CustomerCode_Duplicate_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return BadRequest(errorObj);
            }
            #endregion

            // 3. Truy vấn dữ liệu
            var columnsUpdate = string.Empty;

            // Đọc từng property của object:
            var properties = customer.GetType().GetProperties(); ;

            // Gán CustomerId vào dynamicParam
            dynamicParam.Add("@CustomerIdParam", customerId);

            // Duyệt từng property:
            foreach (var prop in properties)
            {
                // Lấy tên của prop: 
                var propName = prop.Name;

                // Lấy value của prop:
                var propValue = prop.GetValue(customer);

                // Lấy kiểu dữ liệu của prop:
                var propType = prop.PropertyType;
                if (propName != "CustomerId")
                {
                    // Thêm param tương ứng với mỗi property của đối tượng:
                    dynamicParam.Add($"@{propName}", propValue);

                    columnsUpdate += $"{propName} = @{propName},";
                } 
            }
            columnsUpdate = columnsUpdate.Remove(columnsUpdate.Length - 1, 1);

            var sqlCommand = $"UPDATE Customer SET {columnsUpdate} WHERE CustomerId = @CustomerIdParam";

            var rowEffects = dbConnection.Execute(sqlCommand, param: dynamicParam);

            // 4. Trả về cho CLIENT
            var response = StatusCode(200, rowEffects);
            return response;
        }
        /// <summary>
        /// Xoá một khách hàng theo customerId
        /// </summary>
        /// CreatedBy: NTDUNG (07/08/2021)
        /// <param name="customerId">Id của khách hàng</param>
        /// <returns>Trả về mã code và số dòng bị ảnh hưởng (0 không thành công, 1 đã tạo thành công)</returns>
        [HttpDelete("{customerId}")]
        public IActionResult DELETECustomer(string customerId)
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
                dynamicParam.Add("@CustomerIdCheck", customerId);

                var sqlCheckCustomerId = @"SELECT * FROM Customer WHERE CustomerId = @CustomerIdCheck";

                var searchCustomerId = dbConnection.Query<Object>(sqlCheckCustomerId, param: dynamicParam);

                if (searchCustomerId.Count() <= 0)
                {
                    var errorObj = new
                    {
                        devMsg = Properties.Resources.Dev_CustomerId_NonExist_ErrorMsg,
                        userMsg = Properties.Resources.CustomerId_NonExist_ErrorMsg,
                        errorCode = "misa-001",
                        moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                        traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                    };
                    return StatusCode(500, errorObj);
                }    
                #endregion

                // 3. Truy vấn dữ liệu

                // Gán CustomerId vào dynamicParam
                dynamicParam.Add("@CustomerIdParam", customerId);
     
                var sqlCommand = $"DELETE FROM Customer WHERE CustomerId = @CustomerIdParam";

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
