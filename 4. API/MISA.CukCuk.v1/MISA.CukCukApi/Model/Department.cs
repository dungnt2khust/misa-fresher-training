using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCukApi.Model
{
    public class Department:BaseHistoryEntity
    {
        #region Property
        /// <summary>
        /// Khoá chính
        /// </summary>
        public Guid DepartmentId { get; set; }
        /// <summary>
        /// Mã phòng ban
        /// </summary>
        public string DepartmentCode { get; set; }
        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string DepartmentName { get; set; }
        /// <summary>
        /// Mô tả chi tiết
        /// </summary>
        public string Description { get; set; }
        #endregion
    }
}
