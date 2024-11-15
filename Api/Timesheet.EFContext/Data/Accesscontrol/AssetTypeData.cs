using Timesheet.EFContext.Configuration;
using Timesheet.EFContext.Data;
using Timesheet.Entities;
using Timesheet.Entities.Accesscontrol;
using Timesheet.Interfaces;
using Timesheet.Specifications;

namespace Timesheet.EFContext.Data.Accesscontrol
{
    public class AssetTypeData : GenericRepository<AssetType>, IAssetTypeData
    {
        private readonly TimesheetDBContext _context;
        private readonly UnitOfWork _dataAccess;
        public AssetTypeData(TimesheetDBContext ctx) : base(ctx)
        {
            _context = ctx;
            _dataAccess = new UnitOfWork(_context);
        }

        public async Task<BasePager<AssetType>> SearchByFilter(ParamsBase param)
        {
            var spec = new AssetTypeWithPaginatorSpecification(param);
            var result = await _dataAccess.Repository<AssetType>().GetAllWithSpec(spec);

            var specCount = new AssetTypeForCountingSpecification(param);
            var total = await _dataAccess.Repository<AssetType>().CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(total / param.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            return new BasePager<AssetType>
            {
                Count = total,
                Items = result,
                PageCount = totalPages,
                PageIndex = param.PageIndex,
                PageSize = param.PageSize
            };
        }

        public bool VerifyIfExist(AssetType entity)
        {
            var isExists = _context.AssetType.Any(o => o.Name.ToUpper() == entity.Name.ToUpper().Trim() && o.Id != entity.Id);
            return isExists;
        }
    }
}
