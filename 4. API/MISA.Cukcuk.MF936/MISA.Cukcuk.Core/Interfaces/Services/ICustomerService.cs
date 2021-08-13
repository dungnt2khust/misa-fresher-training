using MISA.Cukcuk.Core.Entities;
using MISA.CukCukApi.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Cukcuk.Core.Interfaces.Services
{
    public interface ICustomerService
    {
        /// <summary>
        /// Thêm mới khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng</param>
        /// <returns>ServiceResult - kết quả xử lý qua nghiệp vụ</returns>
        /// CreatedBy: NTDUNG (13/08/2021)
        ServiceResult Add(Customer customer);

        /// <summary>
        /// Chỉnh sửa khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng</param>
        /// <returns>ServiceResult - kết quả xử lý qua nghiệp vụ</returns>
        /// CreatedBy: NTDUNG (13/08/2021)
        ServiceResult Update(Customer customer);
        object Add(object customer);
    }
}
