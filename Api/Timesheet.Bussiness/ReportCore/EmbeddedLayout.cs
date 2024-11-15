namespace Timesheet.Business.ReportCore
{
    [AttributeUsage(AttributeTargets.All)]
    public class EmbeddedLayout : System.Attribute
    {
        private readonly string layoutResource;
        public string LayoutResource
        {
            get { return layoutResource; }
        }

        public EmbeddedLayout(string layoutResource)
        {
            this.layoutResource = layoutResource;
        }
    }
}
