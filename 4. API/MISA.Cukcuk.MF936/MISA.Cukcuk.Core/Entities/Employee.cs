using Dapper;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCukApi.Model
{
    public class Employee:BasePersonEntity
    {
        #region Property
        /// <summary>
        /// Khoá chính
        /// </summary>
        public Guid EmployeeId { get; set; }
        /// <summary>
        /// Mã code
        /// </summary>
        public string EmployeeCode { get; set; }
        /// <summary>
        /// Số CMT/CCCD
        /// </summary>
        public string IdentityNumber { get; set; }
        /// <summary>
        /// Ngày làm CMT/CCCD
        /// </summary>
        public DateTime? IdentityDate { get; set; }
        /// <summary>
        /// Nơi cấp CMT/CCCD
        /// </summary>
        public string IdentityPlace { get; set; }
        /// <summary>
        /// Ngày gia nhập công ty
        /// </summary>
        public DateTime? JoinDate { get; set; }
        /// <summary>
        /// Trạng thái Martial
        /// </summary>
        public int? MartialStatus { get; set; }
        /// <summary>
        /// Trình độ học vấn
        /// </summary>
        public string EducationalBackGround { get; set; }
        /// <summary>
        /// QualificationId
        /// </summary>
        public Guid? QualificationId { get; set; }
        /// <summary>
        /// Id phòng ban
        /// </summary>
        public Guid? DepartmentId { get; set; }
        /// <summary>
        /// Id chức vụ
        /// </summary>
        public Guid? PositionId { get; set; }
        /// <summary>
        /// Tình trạng công việc
        /// </summary>
        public int? WorkStatus { get; set; }
        /// <summary>
        /// Mã số thuế cá nhân
        /// </summary>
        public string PersonalTaxCode { get; set; }
        /// <summary>
        /// Mức lương cơ bản
        /// </summary>
        public double? Salary { get; set; }
        #endregion
    }
}
