using Radyo.Dunyasi.WebApi.CustomFilters;
using System.Web.Http;
using System.Web.Http.Filters;

namespace Radyo.Dunyasi.WebApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RegisterWebApiFilters(GlobalConfiguration.Configuration.Filters);
        }

        public static void RegisterWebApiFilters(HttpFilterCollection filters)
        {
            filters.Add(new CustomExceptionsAttribute());
        }
    }
}
