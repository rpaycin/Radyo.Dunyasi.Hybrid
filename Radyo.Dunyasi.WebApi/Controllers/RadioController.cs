using Radyo.Dunyasi.WebApi.BusinessLayer;
using Radyo.Dunyasi.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.OutputCache.V2;

namespace Radyo.Dunyasi.WebApi.Controllers
{
    public class RadioController : ApiController
    {
        RadioBusinessLayer _business;
        public RadioController()
        {
            if (_business == null)
                _business = new RadioBusinessLayer();
        }

        [CacheOutput(ClientTimeSpan = 86400, ServerTimeSpan = 86400)]
        public Response<List<Category>> GetCategories()
        {
            var result = _business.GetCategories();
            return result;
        }

        [CacheOutput(ClientTimeSpan = 86400, ServerTimeSpan = 86400)]
        public Response<List<Radio>> GetRadios()
        {
            var result = _business.GetRadios();
            return result;
        }


        public Response<List<Radio>> GetRadiosByCategoryId(int categoryId)
        {
            var result = _business.GetRadios(categoryId);
            return result;
        }
    }
}
