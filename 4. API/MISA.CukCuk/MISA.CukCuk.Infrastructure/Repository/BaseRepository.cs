﻿using Dapper;
using MISA.CukCuk.Core.Interfaces.Repositiories;
using MISA.CukCuk.Core.Resources;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace MISA.CukCuk.Infrastructure.Repository
{
    public class BaseRepository<MISAEntity> : IBaseRepository<MISAEntity>
    {
        #region Fields        

        protected readonly string _connectionString;

        protected readonly IDbConnection _dbConnection;

        protected readonly string _entityName;

        #endregion

        #region Constructors

        public BaseRepository()
        {
            // Lấy thông tin truy cập db
            _connectionString = ResourceVN.ConnectionString;

            // Khởi tạo đối tượng kết nối db
            _dbConnection = new MySqlConnection(_connectionString);

            _entityName = typeof(MISAEntity).Name;
        }

        #endregion

        #region Các phương thức GET

        /// <summary>
        /// Lấy tất cả data
        /// </summary>
        /// <returns>Trả về danh sách dữ liệu</returns>
        /// CreatedBy: NTDUNG (17/08/2020)
        public virtual List<MISAEntity> Get()
        {
            // Lấy dữ liệu
            var sqlQuery = $"SELECT * FROM {_entityName}";
            return (List<MISAEntity>)_dbConnection.Query<MISAEntity>(sqlQuery);
        }

        /// <summary>
        /// Lấy theo Id
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns>Dữ liệu của một entity</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        public virtual MISAEntity GetById(Guid entityId)
        {
            
            var sqlQuery = $"SELECT * FROM {_entityName} WHERE {_entityName}Id = @entityId";
            var parameters = new DynamicParameters();

            parameters.Add("@entityId", entityId);

            // Lấy dữ liệu và phản hồi cho client
            return _dbConnection.QueryFirstOrDefault<MISAEntity>(sqlQuery, param: parameters);
        }

        #endregion

        #region Thêm mới

        /// <summary>
        /// Thêm mới khách hagnf
        /// </summary>
        /// <param name="entity"> Data thêm mới</param>
        /// <returns>Số dòng bị ảnh hưởng trong database</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        public virtual int Add(MISAEntity entity)
        {
            var columnsName = new List<string>();
            var columnsParam = new List<string>();
            var parameters = new DynamicParameters();

            // Tạo id mới
            //entity.entityId = Guid.NewGuid();

            // Đọc từng property của object
            var properties = entity.GetType().GetProperties();

            foreach (var prop in properties)
            {
                // Tên thuộc tính
                var propName = prop.Name;

                // Giá tri thuộc tính
                var propValue = prop.GetValue(entity);
                if (propName.Equals($"{_entityName}Id") && prop.PropertyType == typeof(Guid))
                {
                    propValue = Guid.NewGuid();
                }

                columnsName.Add(propName);
                columnsParam.Add($"@{propName}");
                parameters.Add($"@{propName}", propValue);
            }

            var sqlQuery = $"INSERT INTO {_entityName} ({String.Join(", ", columnsName.ToArray())}) " +
                            $"VALUES({String.Join(", ", columnsParam.ToArray())})";

            return _dbConnection.Execute(sqlQuery, param: parameters);
        }

        #endregion

        #region Cập nhật

        /// <summary>
        /// Cập nhật thông tin khách hàng
        /// </summary>
        /// <param name="entity">Data</param>
        /// <param name="entityId">Id</param>
        /// <returns>Số dòng bị ảnh hưởng</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        public virtual int Update(MISAEntity entity, Guid entityId)
        {
            var queryLine = new List<string>();
            var parameters = new DynamicParameters();

            // Đọc từng property của object
            var properties = entity.GetType().GetProperties();

            foreach (var prop in properties)
            {
                // Tên thuộc tính
                var propName = prop.Name;

                // Giá tri thuộc tính
                var propValue = prop.GetValue(entity);
                if (propName.Equals($"{_entityName}Id"))
                {
                    propValue = entityId;
                }

                queryLine.Add($"{propName} = @{propName}");
                parameters.Add($"@{propName}", propValue);
            }

            parameters.Add("@oldEntityId", entityId);
            var sqlQuery = $"UPDATE {_entityName} SET {String.Join(", ", queryLine.ToArray())} " +
                            $"WHERE {_entityName}Id = @oldEntityId";

            return _dbConnection.Execute(sqlQuery, param: parameters);
        }
        #endregion

        #region Xóa

        /// <summary>
        /// Xóa nhiều khách hàng
        /// </summary>
        /// <param name="entityIds">List id của các entity cần xóa</param>
        /// <returns>Số dòng bị ảnh hưởng</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        public virtual int DeleteMany(List<Guid> entityIds)
        {
            var parameters = new DynamicParameters();
            var paramName = new List<string>();

            for (int i = 0; i < entityIds.Count; i++)
            {
                var id = entityIds[i];
                paramName.Add($"@id{i}");
                parameters.Add($"@id{i}", id.ToString());
            }

            var sql = $"Delete from {_entityName} where {_entityName}Id In ({String.Join(", ", paramName.ToArray())})";

            return _dbConnection.Execute(sql, param: parameters);
        }


        /// <summary>
        /// Xóa một KH với id tương ứng
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        public virtual int DeleteOne(Guid entityId)
        {
            var sqlQuery = $"DELETE FROM {_entityName} WHERE {_entityName}Id = @entityId";
            var parameters = new DynamicParameters();

            parameters.Add("@entityId", entityId);

            return _dbConnection.Execute(sqlQuery, param: parameters);
        }

        #endregion

        #region Check trùng
        /// <summary>
        /// Kiểm tra trùng giá trị 
        /// </summary>
        /// <param name="fieldValue"></param>
        /// <param name="fieldName"></param>
        /// <returns> Boolean: true - không trùng, false - trùng</returns>
        /// CreatedBy: NTDUNG (17/08/2021)
        /// ModifiedBy: NTDUNG (20/08/2021)
        public bool CheckDuplicate(string fieldValue, string fieldName)
        {
            // Query check trùng
            var sqlQuery = $"SELECT * FROM {_entityName} WHERE {fieldName} = @fieldValue";
            var parameters = new DynamicParameters();

            parameters.Add("@fieldValue", fieldValue);

            // Lấy dữ liệu và phản hồi cho client
            var queryField = _dbConnection.Query<MISAEntity>(sqlQuery, param: parameters);
            return queryField.Count() < 1;
        }
        #endregion
    }
}
