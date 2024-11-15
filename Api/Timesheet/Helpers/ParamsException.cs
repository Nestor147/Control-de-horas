namespace Timesheet.Helpers
{
    public class ParamsException : Exception
    {
        public string DefaultMessage { get; set; }
        public object[] Parameters { get; set; }

        public ParamsException(string message, params object[] parameters)
        {
            Parameters = parameters;
            DefaultMessage = message;
        }

        public ParamsException(string message)
        {
            DefaultMessage = message;
        }

        public override string Message
        {
            get { return Parameters != null ? string.Format(DefaultMessage, Parameters) : DefaultMessage; }
        }
    }
}
