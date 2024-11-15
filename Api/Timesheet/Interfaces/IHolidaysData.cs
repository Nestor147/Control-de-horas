using Timesheet.Entities;
using Timesheet.Specifications;

namespace Timesheet.Interfaces
{
    public interface IHolidaysData : IGenericRepository<Holidays>
    {
        Task<BasePager<Holidays>> SearchByFilter(ParamsBase param);
        Task<ICollection<Holidays>> FilterHolidaysByYearAndDescription(int? year, string description);

        bool IsExitsDescription(Holidays entity);
    }
}
