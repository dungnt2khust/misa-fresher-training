using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.Core.Entities
{
    public class Position:BaseHistoryEntity
    {
        #region Property
        /// <summary>
        /// Khoá chính
        /// </summary>
        public Guid PositionId { get; set; }
        /// <summary>
        /// Mã chức vụ
        /// </summary>
        public string PositionCode { get; set; }
        /// <summary>
        /// Tên chức vụ
        /// </summary>
        public string PositionName { get; set; }
        /// <summary>
        /// Mô tả chi tiết
        /// </summary>
        public string Description { get; set; }
        #endregion
    }
}
