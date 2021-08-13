using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.Core.Entities;
using MISA.Core.Interfaces.Repository;
using MISA.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCukAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        /// <summary>
        /// Lấy toàn bộ dữ liệu khách hàng
        /// </summary>
        /// <returns>Trả về mã code, thành công - trả về dữ liệu, thất bại - trả về lỗi</returns>  
        /// CreatedBy: NTDUNG (13/08/2021)
        /// ModifiedBy: NTDUNG (13/08/2021)
        [HttpGet]
        public IActionResult GETCustomers()
        {
            try
            {
                // Gọi đến service add của customer service:
                var serviceResult = _customerService.Get();

                // Trả về cho client:
                if (serviceResult.IsValid == true)
                {
                    return StatusCode(201, serviceResult.Data);
                }
                else
                {
                    return BadRequest(serviceResult);
                }
            }
            catch (Exception ex)
            {
                var errorObj = new
                {
                    devMsg = ex.Message,
                    userMsg = MISA.Core.Resources.ResourceVN.Exception_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return StatusCode(500, errorObj);
            }
        }

        /// <summary>
        /// Tạo mới một khách hàng
        /// </summary>
        /// <returns>Trả về mã code, số hàng ảnh hưởng hoặc lỗi </returns>  
        /// CreatedBy: NTDUNG (13/08/2021)
        /// ModifiedBy: NTDUNG (13/08/2021)
        [HttpPost]
        public IActionResult POSTCustomer(Customer customer)
        {
            try
            {
                // Gọi đến service add của customer service:
                var serviceResult = _customerService.Add(customer);
                
                // Trả về cho client:
                if (serviceResult.IsValid == true)
                {
                    return StatusCode(201, serviceResult.Data);
                }
                else
                {
                    return BadRequest(serviceResult);
                }
            } 
            catch(Exception ex)
            {
                var errorObj = new
                {
                    devMsg = ex.Message,
                    userMsg = MISA.Core.Resources.ResourceVN.Exception_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                return StatusCode(500, errorObj);
            }
        }
    }
}
