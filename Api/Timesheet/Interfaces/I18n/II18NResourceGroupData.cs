using Timesheet.Entities.I18n;

namespace Timesheet.Interfaces.I18n

{
    public interface II18NResourceGroupData : IGenericRepository<I18NResourceGroup>
    {
        I18NResourceItem GetResourceItem(string groupName, string resourceName);
        I18NResourceItem GetResourceItem(string groupName, string resourceName, string language);
    }
}
