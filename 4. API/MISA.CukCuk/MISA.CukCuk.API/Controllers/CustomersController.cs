using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.CukCuk.Core.Entities;
using MISA.CukCuk.Core.Interfaces.Services;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;

namespace MISA.CukCuk.API.Controllers
{
    [Route("api/v1/customers")]
    [ApiController]
    public class CustomersController : BaseController<Customer>
    {
        #region Fields

        private readonly ICustomerService _customerService;

        #endregion

        #region Constructors

        public CustomersController(ICustomerService customerService) : base(customerService)
        {
            _customerService = customerService;
        }

        #endregion

        #region Phân trang và lọc dữ liệu khách hàng

        /// <summary>
        /// Lọc danh sách khách hàng theo các tiêu chí: phân trang, tìm kiếm, lọc theo nhóm khách hàng
        /// </summary>
        /// <param name="pageSize">Số bản ghi trên một trang</param>
        /// <param name="pageNumber">Chỉ số trang cần xem</param>
        /// <param name="filterString">Chuỗi cần tìm kiếm</param>
        /// <returns> Mã code trả về và dữ liệu hoặc mã lỗi của request</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        [HttpGet("customerFilter")]
        public IActionResult GetCustomerFilter(int pageSize, int pageNumber, string filterString, Guid? customerGroupId)
        {
            try {
                _serviceResult = _customerService.GetByFilter(pageSize, pageNumber, filterString, customerGroupId);

                if (_serviceResult.IsValid == false)
                {
                    _serviceResult.Msg = MISA.CukCuk.Core.Resources.ResourceVN.MISA_No_Content_Msg;
                }
                // Trả dữ liệu về cho client
                return StatusCode(200, _serviceResult.Data);
            }
            catch (Exception e)
            {
                var response = new
                {
                    devMsg = e.Message,
                    userMsg = MISA.CukCuk.Core.Resources.ResourceVN.MISA_Exception_Error_Msg,
                    errorCode = "MISA_003",
                    traceId = Guid.NewGuid().ToString()
                };
                return StatusCode(500, response);
            }
        }

        #endregion

        /// <summary>
        /// Import dữ liệu khách hàng từ file excel
        /// </summary>
        /// <param name="formFile"></param>
        /// <param name="cancellationToken"></param>
        /// <returns> Mã code trả về và dữ liệu hoặc mã lỗi của request</returns>
        /// CreatedBy: NTDUNG (20/08/2021)
        [HttpPost("import")]
        #region Import dữ liệu
        public IActionResult ImportData(IFormFile formFile, CancellationToken cancellationToken)
        {
            if (formFile == null || formFile.Length <= 0)
            {
                return BadRequest(MISA.CukCuk.Core.Resources.ResourceVN.MISA_Delete_Success_Msg);
            }

            var customers = new List<Customer>();

            using (var stream = new MemoryStream())
            {
                formFile.CopyToAsync(stream, cancellationToken);
                
                using (var package = new ExcelPackage(stream))
                {
                    ExcelWorksheet workSheet = package.Workbook.Worksheets[0];
                    var rowCount = workSheet.Dimension.Rows;

                    for (int row = 3; row <= rowCount; row++)
                    {
                        var customer = new Customer
                        {
                            CustomerCode = workSheet.Cells[row, 1].Value.ToString().Trim(),
                            FullName = workSheet.Cells[row, 2].Value.ToString().Trim(),
                            MemberCardCode = workSheet.Cells[row, 3].Value.ToString().Trim(),
                            CustomerGroupName = workSheet.Cells[row, 4].Value.ToString().Trim(),
                            PhoneNumber = workSheet.Cells[row, 5].Value.ToString().Trim(),
                            CompanyName = workSheet.Cells[row, 7].Value.ToString().Trim(),
                            CompanyTaxCode = workSheet.Cells[row, 8].Value.ToString().Trim(),
                            Email = workSheet.Cells[row, 9].Value.ToString().Trim(),
                            //Address = workSheet.Cells[row, 10].Value.ToString().Trim()
                        };

                        customers.Add(customer);
                    }
                }
            }
            return Ok(customers);
        }
        #endregion
    }
}
