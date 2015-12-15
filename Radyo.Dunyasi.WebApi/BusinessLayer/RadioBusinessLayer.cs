using Radyo.Dunyasi.WebApi.Helper;
using Radyo.Dunyasi.WebApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Radyo.Dunyasi.WebApi.BusinessLayer
{
    public class RadioBusinessLayer : BaseBusinessLayer
    {
        public Response<List<Category>> GetCategories()
        {
            var listCategories = XmlOperations.ReadXml<List<Category>>("categories.xml");
            return CreateResponse(listCategories);
        }

        public Response<List<Radio>> GetFullListRadios()
        {
            var listRadios = XmlOperations.ReadXml<List<Radio>>("radios.xml");
            return CreateResponse(listRadios);
        }
    }
}