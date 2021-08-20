using MISA.CukCuk.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.CukCuk.Core.Interfaces.Services
{
    public interface IBaseService<MISAEntity>
    {
        #region Lấy dữ liệu
        /// <summary>
        /// Lấy toàn bộ 
        /// </summary>
        /// <returns> Kết quả nghiệp vụ lấy toàn bộ dữ liệu</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        ServiceResult Get();

        /// <summary>
        /// Lấy theo id
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns> Kết quả nghiệp vụ lấy dữ liệu 1 bản ghi</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        ServiceResult GetById(Guid entityId);

        #endregion

        #region Thêm mới dữ liệu
        /// <summary>
        /// Thêm mới
        /// </summary>
        /// <param name="entity"> Dữ liệu thêm mới</param>
        /// <returns> Kết quả nghiệp vụ thêm mới dữ liệu</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        ServiceResult Add(MISAEntity entity);

        #endregion

        #region Cập nhật dữ liệu
        /// <summary>
        /// Cập nhật
        /// </summary>
        /// <param name="entity"> Dữ liệu cập nhật</param>
        /// <param name="entityId"> Id của entity</param> 
        /// <returns> Kết quả nghiệp vụ chỉnh sửa dữ liệu</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        ServiceResult Update(MISAEntity entity, Guid entityId);

        #endregion

        #region Xoá một bản ghi
        /// <summary>
        /// Xóa một bản ghi theo id
        /// </summary>
        /// <param name="entityId"> Id của entity</param>
        /// <returns> Kết quả nghiệp vụ xoá một bản ghi</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        ServiceResult DeleteOne(Guid entityId);

        #endregion

        #region Xoá nhiều bản ghi
        /// <summary>
        /// Xóa nhiều bản ghi
        /// </summary>
        /// <param name="entityIds"> Danh sách các id của entity</param>
        /// <returns> Kết quả nghiệp vụ xoá nhiều bản ghi</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        ServiceResult DeleteMany(List<Guid> entityIds);

        #endregion
    }
}
