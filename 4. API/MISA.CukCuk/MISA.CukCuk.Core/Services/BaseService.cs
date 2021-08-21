using MISA.CukCuk.Core.Attributes;
using MISA.CukCuk.Core.Entities;
using MISA.CukCuk.Core.Interfaces.Repositiories;
using MISA.CukCuk.Core.Interfaces.Services;
using MISA.CukCuk.Core.Resources;
using System;
using System.Collections.Generic;
namespace MISA.CukCuk.Core.Services
{
    public class BaseService<MISAEntity> : IBaseService<MISAEntity>
    {
        #region Fields

        IBaseRepository<MISAEntity> _repository;
        ServiceResult _serviceResult;

        #endregion

        #region Constructors

        public BaseService(IBaseRepository<MISAEntity> repository)
        {
            _repository = repository;
            _serviceResult = new ServiceResult();
        }
        #endregion

        #region Các phương thức GET

        /// <summary>
        /// Lấy toàn bộ data
        /// </summary>
        /// <returns> Kết quả nghiệp vụ lấy tất cả dữ liệu</returns>
        /// CreatedBy: NTDUNG (17/08/2021)  
        public virtual ServiceResult Get()
        {
            _serviceResult.Data = _repository.Get();
            _serviceResult.IsValid = _serviceResult.Data != null;
            return _serviceResult;
        }

        /// <summary>
        /// Lấy theo id
        /// </summary>
        /// <param name="entityId">Id của entity</param>
        /// <returns> Kết quả nghiệp vụ lấy theo id</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        public virtual ServiceResult GetById(Guid entityId)
        {
            _serviceResult.Data = _repository.GetById(entityId);
            _serviceResult.IsValid = _serviceResult.Data != null;
            return _serviceResult;
        }

        #endregion

        #region Thêm mới

        /// <summary>
        /// Thêm bản ghi mới vào bảng khách hàng
        /// </summary>
        /// <param name="entity">Dữ liệu thêm mới</param>
        /// <returns>Kết quả nghiệp vụ thêm mới</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        public virtual ServiceResult Add(MISAEntity entity)
        {
            // Validate dữ liệu
            var validData = ValidateData(entity, "ADD");

            if (!validData)
                return _serviceResult;

            // Kết nối infrastructure service làm việc với db
            _serviceResult.Data = _repository.Add(entity);
            if ((int)_serviceResult.Data > 0)
            {
                _serviceResult.IsValid = true;
            }
            else
            {
                _serviceResult.IsValid = false;
                _serviceResult.Msg = ResourceVN.MISA_Exception_Error_Msg;
            }
            return _serviceResult;
        }

        #endregion

        #region Cập nhật

        /// <summary>
        /// Cập nhật dữ liệu khách hàng
        /// </summary>
        /// <param name="entity">     Dữ liệu cập nhật</param>
        /// <param name="entityId">   Id của khác hàng</param>
        /// <returns> Kết quả nghiệp vụ chỉnh sửa</returns>
        /// CreatedBy: NTDUNG (18/08/2021)
        public virtual ServiceResult Update(MISAEntity entity, Guid entityId)
        {
            // Validate dữ liệu
            var validData = ValidateData(entity, "UPDATE");

            if (!validData)
                return _serviceResult;

            // Kết nối infrastructure service làm việc với db
            _serviceResult.Data = _repository.Update(entity, entityId);

            if ((int)_serviceResult.Data > 0)
            {
                _serviceResult.IsValid = true;
            }
            else
            {
                _serviceResult.IsValid = false;
                _serviceResult.Msg = ResourceVN.MISA_Exception_Error_Msg;
            }
            return _serviceResult;
        }

        #endregion

        #region Các phương thức xóa

        /// <summary>
        /// Xóa một bản ghi với id tương ứng
        /// </summary>
        /// <param name="entityId">id của khách hàng cần xóa</param>
        /// <returns> Kết quả nghiệp vụ xoá 1 entity</returns>
        /// CreatedBy: NTDUNG (18/08/2021)
        public virtual ServiceResult DeleteOne(Guid entityId)
        {
            _serviceResult.Data = _repository.DeleteOne(entityId);
            _serviceResult.IsValid = (int)_serviceResult.Data > 0;

            return _serviceResult;
        }

        /// <summary>
        /// Xóa nhiều khách hàng
        /// </summary>
        /// <param name="entityIds">List id cần xóa</param>
        /// <returns> Kết quả nghiệp vụ xoá nhiều entity</returns>
        /// CreatedBy: NTDUNG (18/08/2021)
        public virtual ServiceResult DeleteMany(List<Guid> entityIds)
        {
            _serviceResult.Data = _repository.DeleteMany(entityIds);
            _serviceResult.IsValid = (int)_serviceResult.Data > 0;
            return _serviceResult;
        }

        #endregion

        #region Validate dữ liệu
        /// <summary>
        /// Validate dữ liệu 
        /// </summary>
        /// <param name="entity"> Dữ liệu nhập vào</param>
        /// <param name="mode"> Các trường hợp validate khác nhau (ADD, UPDATE)</param>
        /// <returns> Boolean: true - đữ liệu hợp lý, false - dữ liệu không hợp lệ</returns>
        /// CreatedBy: NTDUNG (21/08/2021)
        public bool ValidateData(MISAEntity entity, string mode)
        {
            // Validate dữ liệu
            var className = typeof(MISAEntity).Name;
            var properties = entity.GetType().GetProperties();

            foreach (var prop in properties)
            {
                var propMISArequired = prop.GetCustomAttributes(typeof(MISARequired), true);
                if (propMISArequired.Length > 0)
                {
                    var propValue = prop.GetValue(entity);
                    var propDisplayName = prop.GetCustomAttributes(typeof(MISADisplayName), true);
                    var propMISAUnique = prop.GetCustomAttributes(typeof(MISAUnique), true);
                    var fieldName = (propDisplayName[0] as MISADisplayName).FieldName;

                    if (propValue == null || propValue.ToString() == "")
                    {
                        _serviceResult.IsValid = false;
                        _serviceResult.Msg = string.Format(ResourceVN.MISA_Field_Emply_Msg, fieldName);
                        return false;
                    }
                    else
                    {
                        if (propMISAUnique.Length > 0)
                        {
                            var checkDuplicate = _repository.CheckDuplicate(entity, prop.Name, mode);
                            if (!checkDuplicate)
                            {
                                _serviceResult.IsValid = false;
                                _serviceResult.Msg = string.Format(ResourceVN.MISA_Field_Duplicate_Msg, fieldName);
                                return false;
                            }
                        }
                    }
                }                
            }
            return true; 
        }
        #endregion

        #region Validate dữ liệu import
        /// <summary>
        /// Validate dữ liệu được import lên so với dữ liệu trong DB
        /// </summary>
        /// <param name="entity"> Dữ liệu một bản ghi</param>
        /// <returns> Trả về danh sách lỗi</returns>
        /// CreatedBy: NTDUNG (21/08/2021)
        public List<string> ValidateImportData(MISAEntity entity)
        {
            // Validate dữ liệu
            List<string> listError = new List<string>();
            var className = typeof(MISAEntity).Name;
            var properties = entity.GetType().GetProperties();

            foreach (var prop in properties)
            {
                var propMISArequired = prop.GetCustomAttributes(typeof(MISARequired), true);
                if (propMISArequired.Length > 0)
                {
                    var propValue = prop.GetValue(entity);
                    var propDisplayName = prop.GetCustomAttributes(typeof(MISADisplayName), true);
                    var propMISAUnique = prop.GetCustomAttributes(typeof(MISAUnique), true);
                    var fieldName = (propDisplayName[0] as MISADisplayName).FieldName;

                    if (propValue == null || propValue.ToString() == "")
                    {
                        listError.Add(string.Format(ResourceVN.MISA_Field_Emply_Msg, fieldName));
                    }
                    else
                    {
                        if (propMISAUnique.Length > 0)
                        {
                            var checkDuplicate = _repository.CheckDuplicate(entity, prop.Name, "ADD");
                            if (!checkDuplicate)
                            {
                                listError.Add(string.Format(ResourceVN.MISA_Field_Duplicate_Msg, fieldName));
                            }
                        }
                    }
                }
            }
            return listError;
        }
        #endregion
    }
}
