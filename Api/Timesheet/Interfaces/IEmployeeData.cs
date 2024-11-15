using Timesheet.Entities;
using Timesheet.Specifications;
namespace Timesheet.Interfaces

{
    public interface IEmployeeData : IGenericRepository<Employee>
    {
      
        Task<BasePager<Employee>> SearchByFilter(ParamsBase param);

        bool VerifyIfExist(Employee entity);
        Employee VerifyAccessEmployeeByEmail(string email);
        Task<Employee> GetEmployeeById(int id);
        Employee EmployeeValidateLogin(string email);
        Task<BasePager<EmployeeField>> SearchByFilterEmployeeField(ParamsBase param);

        bool emailAlreadyExists(Employee entity);
        bool nameAlreadyExists(Employee entity);
        Task<Employee> GetByCode(string code);




    }
}
