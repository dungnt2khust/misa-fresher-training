using MISA.CukCuk.Core.Entities;
using MISA.CukCuk.Core.Responses;
using System;
using System.Collections.Generic;

namespace MISA.CukCuk.Core.Interfaces.Repositiories
{
    public interface ICustomerRepository : IBaseRepository<Customer>
    {
        #region Phân trang và lọc dữ liệu khách hàng
        /// <summary>
        /// Lấy data và lọc
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageNumber"></param>
        /// <param name="filterString"></param>
        /// <param name="customerGroupId"></param>
        /// <returns> Trả về thông tin của filter</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        /// ModifiedBy: NTDUNG (20/08/2021)
        FilterResponse GetByFilter(int pageSize, int pageNumber, string filterString, Guid? customerGroupId);

        #endregion
    }
}
