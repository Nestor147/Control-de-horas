using Timesheet.Entities.Accesscontrol;

namespace Timesheet.Specifications
{
    public class RoleForCountingSpecification : BaseSpecification<Role>
    {
        public RoleForCountingSpecification(ParamsEntity param)
        : base(x => (string.IsNullOrEmpty(param.Filter) || x.Name.Contains(param.Filter)) ||
        (string.IsNullOrEmpty(param.Filter) || x.Description.Contains(param.Filter)))
        {
        }
    }
}
