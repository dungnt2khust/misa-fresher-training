using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MISA.CukCukApi.Model;
using MISA.Cukcuk.Core.Interfaces.Services;
using MISA.Cukcuk.Core.Resources;

namespace MISA.Cukcuk.MF936.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
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
                    userMsg = MISA.CukCuk.Core.Resources.ResouceVN.Exception_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };

            }
        }
    }
}
