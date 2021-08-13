using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Core.Interfaces.Services
{
    public interface ICustomerService
    {
        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng</param>
        /// <returns>ServiceResult - kết quả xử lý qua nghiệp vụ</returns>
        /// CreatedBy: NTDUNG (13/08/2021)
        ServiceResult Get();

        /// <summary>
        /// Lấy thông tin khách hàng theo CustomerId
        /// </summary>
        /// <param name="customerId">Id khách hàng</param>
        /// <returns>ServiceResult - kết quả xử lý qua nghiệp vụ</returns>
        /// CreatedBy: NTDUNG (13/08/2021)
        ServiceResult GetById(Guid customerId);

        /// <summary>
        /// Chỉnh sửa thông tin khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng</param>
        /// <param name="customerId">Id khách hàng</param>
        /// <returns>ServiceResult - kết quả xử lý qua nghiệp vụ</returns>
        /// CreatedBy: NTDUNG (13/08/2021)
        ServiceResult Update(Customer customer, Guid customerId);

        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng</param>
        /// <returns>ServiceResult - kết quả xử lý qua nghiệp vụ</returns>
        /// CreatedBy: NTDUNG (13/08/2021)
        ServiceResult Add(Customer customer); 
    }
}
