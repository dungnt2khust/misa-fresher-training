using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Repository;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.Infrastructure.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        #region Field

        IConfiguration _configuration;

        #endregion

        #region Contructor
        public CustomerRepository(IConfiguration configuration)
        {
            _configuration = configuration; 
        }

        #endregion

        #region Method

        /// <summary>
        /// Tạo mới một khách hàng 
        /// </summary>
        /// <param name="customer">Thông tin khách hàng</param>
        /// <returns>RowEffects - Số dòng bị ảnh hưởng khi truy vấn</returns>  
        /// CreatedBy: NTDUNG (13/08/2021)
        /// ModifiedBy: NTDUNG (13/08/2021)
        public int Add(Customer customer)
        {
            // 1. Khai báo thông tin kết nối DATABASE:
            var connectionString = _configuration.GetConnectionString("MisaCukCukConnection");

            // 2. Khởi tạo đối tượng kết nối với DATABASE:
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // Khai báo dynamicParam:
            var dynamicParam = new DynamicParameters();

            // 3. Truy vấn dữ liệu
            customer.CustomerId = Guid.NewGuid();
            customer.CreatedDate = DateTime.Now;
            customer.CreatedBy = "NTDUNG";
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

            return rowEffects;
        }

        /// <summary>
        /// Xoá một khách hàng
        /// </summary>
        /// <param name="customerId">Id khách hàng</param>
        /// <returns>RowEffects - Số dòng bị ảnh hưởng khi truy vấn</returns>  
        /// CreatedBy: NTDUNG (13/08/2021)
        /// ModifiedBy: NTDUNG (13/08/2021)
        public int Delete(Guid customerId)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Lấy thông tin toàn bộ khách hàng
        /// </summary>
        /// <returns>ListCustomer - Danh sách thông tin khách hàng</returns>  
        /// CreatedBy: NTDUNG (13/08/2021)
        /// ModifiedBy: NTDUNG (13/08/2021)
        public List<Customer> Get()
        {
            // 1. Khai báo thông tin kết nối DATABASE:
            var connectionString = _configuration.GetConnectionString("MisaCukCukConnection");

            // 2. Khởi tạo đối tượng kết nối với DATABASE:
            IDbConnection dbConnection = new MySqlConnection(connectionString);

            // 3. Lấy dữ liệu:
            var sqlCommand = "SELECT * FROM Customer";
            var customers = dbConnection.Query<Customer>(sqlCommand);

            // 4. Trả về:
            return customers.ToList();
        }

        /// <summary>
        /// Lấy thông tin khách hàng theo CustomerId
        /// </summary>
        /// <param name="customerId">Id khách hàng</param>
        /// <returns>Customer - Thông tin khách hàng</returns>  
        /// CreatedBy: NTDUNG (13/08/2021)
        /// ModifiedBy: NTDUNG (13/08/2021)
        public Customer GetById(Guid customerId)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Chỉnh sửa thông tin khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng</param>
        /// <param name="customerId">Id khách hàng</param>
        /// <returns>RowEffects - Số dòng bị ảnh hưởng khi truy vấn</returns>  
        /// CreatedBy: NTDUNG (13/08/2021)
        /// ModifiedBy: NTDUNG (13/08/2021)
        public int Update(Customer customer, Guid customerId)
        {
            throw new NotImplementedException();
        }
        #endregion 
    }
}
