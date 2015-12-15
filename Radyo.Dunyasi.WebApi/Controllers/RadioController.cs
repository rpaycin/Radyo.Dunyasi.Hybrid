using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Radyo.Dunyasi.WebApi.Controllers
{
    public class RadioController : ApiController
    {
        [HttpPost]
        public string Test()
        {
            return "test";
        }
    }
}
