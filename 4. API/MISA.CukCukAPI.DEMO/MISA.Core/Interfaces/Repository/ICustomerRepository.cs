using MISA.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Core.Interfaces.Repository

{
    public interface ICustomerRepository
    {
        List<Customer> Get();
        Customer GetById(Guid customerId);
        int Add(Customer customer);
        int Update(Customer customer, Guid customerId);
        int Delete(Guid customerId);
    }
}
