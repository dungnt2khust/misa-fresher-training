using MISA.Cukcuk.Core.Entities;
using MISA.Cukcuk.Core.Interfaces.Repository;
using MISA.Cukcuk.Core.Interfaces.Services;
using MISA.CukCukApi.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Cukcuk.Core.Services
{
    public class CustomerService : ICustomerService
    {
        ICustomerRepository _customerRepository;
        ServiceResult _serviceResult;

        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
            _serviceResult = new ServiceResult();
        }

        public ServiceResult Add(Customer customer)
        {
            // Xử lý nghiệp vụ:

            // Tương tác kết nối với Database:
            _serviceResult.Data = _customerRepository.Add(customer);
            return _serviceResult;
        }

        public ServiceResult Update(Customer customer)
        {
            throw new NotImplementedException();
        }
    }
}
