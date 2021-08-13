using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Core.Entities
{
    public class ServiceResult
    {
        #region Property
        /// <summary>
        /// Service có trả về hợp lệ hay không
        /// </summary>
        public bool IsValid { get; set; }
        /// <summary>
        /// Dữ liệu trả về của service
        /// </summary>
        public object Data { get; set; }
        /// <summary>
        /// Thông điệp mô tả
        /// </summary>
        public string Messenger { get; set; }
        #endregion
    }
}
