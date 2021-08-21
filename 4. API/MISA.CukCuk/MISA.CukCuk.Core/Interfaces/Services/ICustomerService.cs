using Microsoft.AspNetCore.Http;
using MISA.CukCuk.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading;

namespace MISA.CukCuk.Core.Interfaces.Services
{
    public interface ICustomerService : IBaseService<Customer>
    {
        #region Phân trang và lọc dữ liệu khách hàng
        /// <summary>
        /// Lấy và lọc dữ liệu
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageNumber"></param>
        /// <param name="filterString"></param>
        /// <param name="customerGroupId"></param>
        /// <returns> Kết quả nghiệp vụ phân trang và lọc dữ kiệu khách hàng</returns>
        /// CreatedBy: NTDUNG (21/08/2021)
        ServiceResult GetByFilter(int pageSize, int pageNumber, string filterString, Guid? customerGroupId);

        #endregion

        #region Import dữ liệu khách hàng
        /// <summary>
        /// Import dữ liệu khách hàng vào database
        /// </summary>
        /// <param name="formFile"></param>
        /// <param name="cancellationToken"></param>
        /// <returns> Kết quả nghiệp vụ import dữ liệu kháchh hàng</returns>
        /// CreatedBy: NTDUNG (21/08/2021)
        ServiceResult ImportData(IFormFile formFile, CancellationToken cancellationToken);

        #endregion
    }
}
