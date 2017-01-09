using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FinancingAPI.Startup))]
namespace FinancingAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
