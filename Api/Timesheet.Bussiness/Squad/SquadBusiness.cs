using System.Text.Json;
using Timesheet.Entities;
using Timesheet.Entities.Attendance;
using Timesheet.Entities.Squad;
using Timesheet.Interfaces;

namespace Timesheet.Business.Attendance
{
    public class SquadBusiness
    {
        private readonly HttpClient _httpClient;
        private const string SquadApiUrl = "https://aasinet.sdasystems.org/wit/api/users/getSquads"; 
        private readonly IEmployeeData _dataEmployees;

        public SquadBusiness(HttpClient httpClient, IEmployeeData dataEmployees)
        {
            _httpClient = httpClient;
            _dataEmployees = dataEmployees;
        }

        public async Task<List<Squad>> GetSquads()
        {
            HttpResponseMessage response = await _httpClient.GetAsync(SquadApiUrl);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Error al obtener squads: {response.StatusCode}");
            }

            var jsonString = await response.Content.ReadAsStringAsync();
            var squads = JsonSerializer.Deserialize<List<Squad>>(jsonString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return squads;
        }

        public async Task<List<SquadGroup>> GetSquadNames()
        {
            var squads = await GetSquads();

            var squadGroups = new List<SquadGroup>();

            foreach (var item in squads)
            {

                var emails = string.Join(",", item.Members.Select(m => m.ToString()));

                var employeeIds = await GetIdsByEmails(emails);
                var memberCount = string.IsNullOrEmpty(employeeIds)
                    ? 0 
                    : employeeIds.Count(c => c == ',') + 1; 

                squadGroups.Add(new SquadGroup
                {
                    SquadName = item.Name,
                    EmployeeIds = employeeIds, 
                    MemberCount = memberCount  
                });
            }

            return squadGroups; 
        }

        public async Task<string> GetIdsByEmails(string emails)
        {
            var emailList = emails.Split(',')
                                  .Select(email => email.Trim())
                                  .ToList();

            var employeeIds = new List<string>();

            foreach (var email in emailList)
            {
                var employee = await Task.Run(() => _dataEmployees.VerifyAccessEmployeeByEmail(email)); 
                if (employee != null)
                {
                    employeeIds.Add(employee.Id.ToString());
                }
            }

            return string.Join(",", employeeIds);
        }
    }
}
