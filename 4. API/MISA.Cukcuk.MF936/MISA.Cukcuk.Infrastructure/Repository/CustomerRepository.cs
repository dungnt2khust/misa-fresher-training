using MISA.Cukcuk.Core.Interfaces.Repository;
using MISA.CukCukApi.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Cukcuk.Infrastructure.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        public int Add(Customer customer)
        {
            throw new NotImplementedException();
        }

        public int Delete(Guid customerId)
        {
            throw new NotImplementedException();
        }

        public List<Customer> Get()
        {
            throw new NotImplementedException();
        }

        public Customer GetById(Guid customerId)
        {
            throw new NotImplementedException();
        }

        public int Update(Customer customer, Guid customerId)
        {
            throw new NotImplementedException();
        }
    }
}
