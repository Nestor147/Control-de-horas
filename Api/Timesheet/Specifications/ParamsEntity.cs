using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Timesheet.Specifications
{
    public class ParamsEntity : ParamsBase
    {
        public int EntityId { get; set; }
        public EntityType? EntityType { get; set; }
        public string Field { get; set; }
    }
}
