using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCukApi.Model
{
    public class Customer:BasePersonEntity
    {
        #region Property
        /// <summary>
        /// Khoá chính
        /// </summary>
        public Guid CustomerId { get; set; }
        /// <summary>
        /// Mã code
        /// </summary>
        public string CustomerCode { get; set; }
        /// <summary>
        /// Số nợ
        /// </summary>
        public int? DebitAmount { get; set; }

        /// <summary>
        /// Mã thẻ thành viên
        /// </summary>
        public string MemberCardCode { get; set; }
        /// <summary>
        /// Tên công ty
        /// </summary>
        public string CompanyName { get; set; }
        /// <summary>
        /// Mã số thuế công ty
        /// </summary>
        public string CompanyTaxCode { get; set; }
        /// <summary>
        /// Trạng thái theo dõi
        /// </summary>
        public int? IsStopFollow { get; set; }
        #endregion
    }
}
