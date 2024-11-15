using Microsoft.EntityFrameworkCore;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.EFContext.Data
{
    public class EmployeeData : GenericRepository<Employee>, IEmployeeData
    {
        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;
        public EmployeeData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public async Task<BasePager<Employee>> SearchByFilter(ParamsBase param)
        {
            var spec = new EmployeeWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<Employee>().GetAllWithSpec(spec);

            var specCount = new EmployeeForCountingSpecification(param);
            var total = await _dataAccess.Repository<Employee>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<Employee>
            {
                Count = total,
                Items = result,
                PageCount = totalPages,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
        }

        public bool EmployeeValidate(int idEmployee)
        {
            var isExists = _context.Employee.Any(o => o.Id == idEmployee && o.Role.Id == 6);
            return isExists;
        }
        public async Task<BasePager<Employee>> SearchByFilterEmployeeEntity(ParamsBase param, int idEmployee)
        {
            bool resultId = EmployeeValidate(idEmployee);

            string sqlString = @$" 
                                select
	                            distinct
                                e.EmployeeId,
	                            e.Email,
	                            e.Name,
                                e.active,
	                            e.RoleId
                            from
	                            Employee e";

            if (resultId) /// "IATEC ADMINISTRADOR"
            {
                sqlString += @$" inner join AccessControlRole acr on acr.RoleId  = e.RoleId 
                                   where
                                 e.Email like '%{param.Filter}%' or e.Name like '%{param.Filter}%'
                                ";
            }
            else /// "IATEC LOCAL"
            {
                sqlString += @$" inner join AccessControlRole acr on acr.RoleId  = e.RoleId 
                                   where (e.Email like '%{param.Filter}%' or e.Name like '%{param.Filter}%') and e.RoleId != 6";
            }
            var result = await _context.Employee.FromSqlRaw(sqlString).Include(x => x.Role).Skip(param.PageSize * param.PageIndex).Take(param.PageSize).OrderBy(x => x.Name).ToListAsync();
            var total = await _context.Employee.FromSqlRaw(sqlString).CountAsync();

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);
            return new BasePager<Employee>
            {
                Count = total,
                Items = result,
                PageCount = totalPages,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
        }

        public bool VerifyIfExist(Employee entity)
        {
            var isExists = _context.Employee.Any(o => o.Email.ToUpper() == entity.Email.ToUpper().Trim() && o.Id != entity.Id);
            return isExists;
        }
        public Employee VerifyAccessEmployeeByEmail(string email)
        {
            var entity = _context.Employee.Where(p => p.Email.Contains(email)).FirstOrDefault();

            return entity;
        }
        public async Task<Employee> GetEmployeeById(int id)
        {
            var specEmployee = new EmployeeWithPaginatorSpecification(id);
            var Field = await _dataAccess.Repository<Employee>().GetByIdWithSpec(specEmployee);
            return Field;
        }

        public Employee EmployeeValidateLogin(string email)
        {
            var entity = _context.Employee.Where(o => o.Email.ToUpper() == email.ToUpper() && o.Active).FirstOrDefault();
            return entity;
        }

        #region report Employee field
        public async Task<BasePager<EmployeeField>> SearchByFilterEmployeeField(ParamsBase param)
        {
            string sqlString = @$"SELECT
                                        acr.Name AS AccessControlRoleName,
                                        us.Name AS EmployeeName,
                                        us.Email AS EmployeeEmail,
                                        u.Name AS UnionName,
                                        f.Name AS FieldName,
                                        e.Code AS EntityCode,
                                        e.Name AS EntityName,
                                        ue.IsAssistant AS AcceptNotices,
                                        ue.IsCounter AS SendNotices,
		                                us.Active AS EmployeeActive
                                    FROM
                                        Entity e
                                    INNER JOIN
                                        Field f ON f.FieldId = e.FieldId
                                    INNER JOIN
                                        [union] u ON u.UnionId = f.UnionId
                                    INNER JOIN
                                        EmployeeEntity ue ON e.EntityId = ue.EntityId
                                    INNER JOIN
                                        Employee us ON ue.EmployeeId = us.EmployeeId
                                    INNER JOIN
                                        AccessControlRole acr ON acr.RoleId = us.RoleId
                                    WHERE
                                        (us.Email LIKE '%{param.Filter}%' OR e.Code LIKE '%{param.Filter}%' OR e.Name LIKE '%{param.Filter}%' OR u.Name LIKE '%{param.Filter}%')";


            var result = await _context.EmployeeField.FromSqlRaw(sqlString).Skip(param.PageSize * param.PageIndex).Take(param.PageSize).ToListAsync();
            var total = await _context.EmployeeField.FromSqlRaw(sqlString).CountAsync();

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);
            return new BasePager<EmployeeField>
            {
                Count = total,
                Items = result,
                PageCount = totalPages,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
        }
        #endregion
        public async Task<Employee> GetByCode(string code)
        {
            return await _context.Employee
                                 .FirstOrDefaultAsync(up => up.Id.ToString() == code);
        }

        public bool emailAlreadyExists(Employee entity)
        {
            var isExists = _context.Employee.Any(o => o.Email == entity.Email && o.Id != entity.Id);
            return isExists;
        }

        public bool nameAlreadyExists(Employee entity)
        {
            var isExists = _context.Employee.Any(o => o.Name == entity.Name && o.Id != entity.Id);
            return isExists;
        }

      




    }
}
