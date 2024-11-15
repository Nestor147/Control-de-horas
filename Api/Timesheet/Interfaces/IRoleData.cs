using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Specifications;

namespace Timesheet.Interfaces

{
    public interface IRoleData : IGenericRepository<Role>
    {
        Task<Role> GetRoleById(int id);
        Task<IReadOnlyList<Role>> GetRoleAll();
        Task<IReadOnlyList<Role>> GetAllByRole(int EmployeeId);
        Task<BasePager<Role>> SearchByFilter(ParamsEntity param);
        bool VerifyIfExist(Role entity);
    }
}
