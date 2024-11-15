using Microsoft.EntityFrameworkCore;
using Timesheet.EFContext.Configuration;
using Timesheet.EFContext.Data;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.EFContext.Data.Accesscontrol
{
    public class RoleData : GenericRepository<Role>, IRoleData
    {
        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;
        public RoleData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public async Task<Role> GetRoleById(int id)
        {
            var specEntity = new RoleWithPaginatorSpecification(id);
            var entity = await _dataAccess.Repository<Role>().GetByIdWithSpec(specEntity);
            return entity;
        }

        public async Task<IReadOnlyList<Role>> GetRoleAll()
        {
            var specEntity = new RoleWithPaginatorSpecification();
            var entity = await _dataAccess.Repository<Role>().GetAllWithSpec(specEntity);
            return entity;
        }
        public async Task<IReadOnlyList<Role>> GetAllByRole(int EmployeeId)
        {
            var cmd = @$"
Declare @RoleCurrentId int = 0
Select top 1 @RoleCurrentId = RoleId
From Employee 
Where EmployeeId = {EmployeeId}

IF (@RoleCurrentId != 6)
Begin 
	select * from AccessControlRole where RoleId != 6 
End
ELSE
Begin 
	select * from AccessControlRole 
End
";

            var result = await _context.Role.FromSqlRaw(cmd).ToListAsync();
            return result;
        }

        public async Task<BasePager<Role>> SearchByFilter(ParamsEntity param)
        {
            var spec = new RoleWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<Role>().GetAllWithSpec(spec);

            var specCount = new RoleForCountingSpecification(param);
            var total = await _dataAccess.Repository<Role>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<Role>
            {
                Count = total,
                Items = result,
                PageCount = totalPages,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
        }

        public bool VerifyIfExist(Role entity)
        {
            var isExists = _context.Role.Any(o => o.Name.ToUpper() == entity.Name.ToUpper().Trim()
                        && o.Id != entity.Id);
            return isExists;
        }
    }
}
