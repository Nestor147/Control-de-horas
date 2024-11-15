using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Xml.Linq;
using Timesheet.Bussiness.Modules;
using Timesheet.EFContext.Core;
using Timesheet.Entities.I18n;
using Timesheet.Interfaces.I18n;

namespace Timesheet.Bussiness.Exceptions
{
    public static class ExceptionMessageReader
    {
        private static readonly II18NResourceGroupData _dataAccess;

        static ExceptionMessageReader()
        {
            _dataAccess = ApplicationModule.service.BuildServiceProvider().GetService<II18NResourceGroupData>();
        }

        public static string ExceptionsGroupName = "EXCEPTIONS";

        public static string GetMessage(string name)
        {
            var transformedName = TransformResourceName(name);

            var globalSession = ApplicationModule.service.BuildServiceProvider().GetService<GlobalSession>();
            if (globalSession.IsEnableTranslation)
            {
                var defaultLanguage = globalSession.DefaultLanguage;
                var resource = GetI19nExceptionTranslationItem(transformedName, defaultLanguage);

                var result = resource == null
                    ? GetDefaultExceptionMessage(name)
                    : resource.ResourceValue;

                return result;
            }
            else
                return GetDefaultExceptionMessage(name);
        }

        public static string GetDefaultExceptionMessage(string name)
        {
            var globalSession = ApplicationModule.service.BuildServiceProvider().GetService<GlobalSession>();
            var defaultLanguage = globalSession.DefaultLanguage;
            string resourceName = "";
            resourceName = "Timesheet.Business.Exceptions.ExceptionMessages.xml";

            var xmlStream = GetResourceStreamFromExecutingAssembly(resourceName);
            using (var resourceStreamReader = new StreamReader(xmlStream))
            {
                string xml = resourceStreamReader.ReadToEnd();

                var document = XElement.Parse(xml);

                var item = from page in document.Elements("Message")
                           where name == page.Element("Name").Value
                           select page;

                var message = (item.Count()) > 0 ? item.First().Element("Value").Value : "";

                if (string.IsNullOrEmpty(message))
                    return string.Format("Message named {0} was not found on dictionary", name);
                else
                    return Regex.Unescape(message);
            }
        }

        public static I18NResourceItem GetI19nExceptionTranslationItem(string resourceName, string language)
        {
            var result = _dataAccess.GetResourceItem(ExceptionsGroupName, resourceName, language);
            return result;
        }

        private static string TransformResourceName(string resourceName)
        {
            return string.Concat(resourceName.Replace(".", "")
                .Select((x, i) => i > 0 && char.IsUpper(x) ? "_" + x.ToString() : x.ToString())).ToUpper();
        }

        public static Stream GetResourceStreamFromExecutingAssembly(string path)
        {
            var asm = Assembly.GetExecutingAssembly();
            var stream = asm.GetManifestResourceStream(path);

            return stream;
        }
    }
}
