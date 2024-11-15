using Microsoft.EntityFrameworkCore;
using Timesheet.EFContext.Configuration;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.EFContext.Data
{
    public class EmployeeAttendanceData : GenericRepository<EmployeeAttendance>, IEmployeeAttendanceData
    {
        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;

        public EmployeeAttendanceData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }
        public async Task<DateTime?> GetLastRecordDateAsync()
        {
        
            return await _context.EmployeeAttendance
                .Select(e => (DateTime?)e.AttendanceDateTime) 
                .MaxAsync();
        }


        public async Task<EmployeeAttendance> GetByCodeAndDateAsync(int codeId, DateTime date)
        {
            return await _context.EmployeeAttendance
                .FirstOrDefaultAsync(ud => ud.Id == codeId && ud.AttendanceDateTime == date);
        }

        public async Task<EmployeeAttendance> GetByEmployeeAttendanceId(int id)
        {
            var spec = new EmployeeAttendanceWithPaginatorSpecification(id);
            var result = await _dataAccess.Repository<EmployeeAttendance>().GetAllWithSpec(spec);
            return result.FirstOrDefault();
        }
        public async Task<BasePager<EmployeeAttendance>> SearchByFilter(ParamsBase param)
        {
            var spec = new EmployeeAttendanceWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<EmployeeAttendance>().GetAllWithSpec(spec);

            var specCount = new EmployeeAttendanceForCountingSpecification(param);
            var total = await _dataAccess.Repository<EmployeeAttendance>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<EmployeeAttendance>
            {
                Count = total,
                Items = result,
                PageCount = totalPages,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
        }



        public async Task<ICollection<EmployeeAttendance>> GetByDateRangeAsync(DateTime? startDate, DateTime? endDate, string? employeeName)
        {
            var query = _context.EmployeeAttendance
                    .Include(e => e.Employee)
                    .AsQueryable();

       
            if (!string.IsNullOrWhiteSpace(employeeName))
            {
                query = query.Where(e => e.Employee.Name.Contains(employeeName));
            }


            if (startDate.HasValue && endDate.HasValue)
            {
                if (startDate.Value.Date == endDate.Value.Date)
                {
                    var startOfDay = startDate.Value.Date; 
                    var endOfDay = startDate.Value.Date.AddDays(1).AddTicks(-1); 

                    query = query.Where(e => e.AttendanceDateTime >= startOfDay && e.AttendanceDateTime <= endOfDay);
                }
                else
                {
                    var start = startDate.Value.Date;
                    var end = endDate.Value.Date.AddDays(1).AddTicks(-1);
                    query = query.Where(e => e.AttendanceDateTime >= start && e.AttendanceDateTime <= end);
                }
            }

            Console.WriteLine(query.ToQueryString());

            return await query.ToListAsync();

        }





    }
}
