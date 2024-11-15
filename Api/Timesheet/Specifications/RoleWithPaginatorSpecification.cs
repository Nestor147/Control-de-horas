using Timesheet.Entities.Accesscontrol;

namespace Timesheet.Specifications
{
    public class RoleWithPaginatorSpecification : BaseSpecification<Role>
    {
        public RoleWithPaginatorSpecification(ParamsEntity param)
        : base(x => (string.IsNullOrEmpty(param.Filter) || x.Name.Contains(param.Filter)) ||
        (string.IsNullOrEmpty(param.Filter) || x.Description.Contains(param.Filter)))
        {
            ApplyPaging(param.PageSize * (param.PageIndex), param.PageSize);
        }
        public RoleWithPaginatorSpecification(int id) : base(x => x.Id == id)
        {
        }
        public RoleWithPaginatorSpecification() : base()
        {
        }
    }
}
