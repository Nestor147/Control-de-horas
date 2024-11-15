using Microsoft.Reporting.NETCore;
using System.Reflection;

namespace Timesheet.Business.ReportCore
{
    public class RepRender
    {
        public LocalReport localReport;
        public string RenderFormat;

        public RepRender()
        {
            RenderFormat = "PDF";
            if (localReport == null)
            {
                localReport = new LocalReport();
            }
            ReadAttributes();
        }

        public void ReadAttributes()
        {
            var attributes1 = this.GetType().GetCustomAttributes(false);
            var attribute = attributes1.FirstOrDefault(att => att is EmbeddedLayout);
            if (attribute == null)
                throw new Exception(string.Format("EmbeddedLayout attribute is needed", this.GetType().FullName));

            string attName = ((EmbeddedLayout)attribute).LayoutResource;
            
            var reportAssembly = Assembly.GetExecutingAssembly();
            Stream? reportStream = reportAssembly.GetManifestResourceStream(attName);
            
            localReport.LoadReportDefinition(reportStream);
        }
        public ByteContent Render()
        {
            Warning[] warnings;
            string[] streamids;
            string encoding;
            string extension;
            string mimeType;
            var result = new ByteContent();
            string deviceInfo = null;
            result.Content = localReport.Render(RenderFormat, deviceInfo, out mimeType, out encoding, out extension, out streamids, out warnings);
            result.MimeType = mimeType;
            result.Title = "Report";
            return result;
        }
        public string TransformResourceName(string resourceName)
        {
            return string.Concat(resourceName.Replace(".", "")
                .Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString())).ToUpper();
        }
    }
}
