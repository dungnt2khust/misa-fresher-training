using MISA.Core.Entities;
using MISA.Core.Interfaces.Repository;
using MISA.Core.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace MISA.Core.Services
{
    public class CustomerService : ICustomerService
    {
        #region Field 
        ICustomerRepository _customerRepository;
        ServiceResult _serviceResult;
        #endregion

        #region Contructor
        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
            _serviceResult = new ServiceResult();
        }
        #endregion

        #region Method
        /// <summary>
        /// Lấy toàn bộ thông tin khách hàng
        /// </summary>
        /// <returns>ServiceResult - kết quả xử lý nghiệp vụ</returns>  
        /// CreatedBy: NTDUNG (13/08/2021)
        /// ModifiedBy: NTDUNG (13/08/2021)
        public ServiceResult Get()
        {
            // Xử lý nghiệp vụ:

            // Tương tác kết nối với Database:
            _serviceResult.Data = _customerRepository.Get();
            return _serviceResult;
        }

        /// <summary>
        /// Thêm mới một thông tin khách hàng 
        /// </summary>
        /// <returns>ServiceResult - kết quả xử lý nghiệp vụ</returns>  
        /// CreatedBy: NTDUNG (13/08/2021)
        /// ModifiedBy: NTDUNG (13/08/2021)
        public ServiceResult Add(Customer customer)
        {
            // Xử lý nghiệp vụ:
            #region CheckInfo
            // Kiểm tra thông tin của khách hàng đã hợp lệ hay chưa?
            // 1. MÃ KHÁCH HÀNG bắt buộc phải có
            if (customer.CustomerCode == "" || customer.CustomerCode == null)
            {
                var errorObj = new
                {
                    devMsg = Resources.ResourceVN.CustomerCode_Empty_ErrorMsg,
                    userMsg = Resources.ResourceVN.CustomerCode_Empty_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                _serviceResult.IsValid = false;
                _serviceResult.Data = errorObj;
                return _serviceResult;
            }

            // 2. EMAIL bắt buộc và phải đúng định dạng
            if (customer.Email == "" || customer.Email == null)
            {
                var errorObj = new
                {
                    devMsg = Resources.ResourceVN.CustomerEmail_Empty_ErrorMsg,
                    userMsg = Resources.ResourceVN.CustomerEmail_Empty_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                _serviceResult.IsValid = false;
                _serviceResult.Data = errorObj;
                return _serviceResult;
            }
            var emailFormat = @"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
            bool isValidEmail = Regex.IsMatch(customer.Email, emailFormat);

            if (!isValidEmail)
            {
                var errorObj = new
                {
                    devMsg = Resources.ResourceVN.CustomerEmail_Invalid_ErrorMsg,
                    userMsg = Resources.ResourceVN.CustomerEmail_Invalid_ErrorMsg,
                    errorCode = "misa-001",
                    moreInfo = "https://openapi.misa.com.vn/errorcode/misa-001",
                    traceId = "ba9587fd-1a79-4ac5-a0ca-2c9f74dfd3fb"
                };
                _serviceResult.IsValid = false;
                _serviceResult.Data = errorObj;
                return _serviceResult;
            } 
            #endregion

            // Tương tác kết nối với Database:
            _serviceResult.Data = _customerRepository.Add(customer);
            return _serviceResult;
        }

        /// <summary>
        /// Cập nhật thông tin khách hàng
        /// </summary>
        /// <param name="customer">Thông tin khách hàng</param>
        /// <param name="customerId">Id khách hàng</param>
        /// <returns>ServiceResult - kết quả xử lý nghiệp vụ</returns>  
        /// CreatedBy: NTDUNG (13/08/2021)
        /// ModifiedBy: NTDUNG (13/08/2021)
        public ServiceResult Update(Customer customer, Guid customerId)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Lấy thông tin khách hàng theo CustomerId
        /// </summary>
        /// <param name="customerId">Id khách hàng</param>
        /// <returns>ServiceResult - kết quả xử lý nghiệp vụ</returns>  
        /// CreatedBy: NTDUNG (13/08/2021)
        /// ModifiedBy: NTDUNG (13/08/2021)
        public ServiceResult GetById(Guid customerId)
        {
            throw new NotImplementedException();
        } 
        #endregion
    }
}
