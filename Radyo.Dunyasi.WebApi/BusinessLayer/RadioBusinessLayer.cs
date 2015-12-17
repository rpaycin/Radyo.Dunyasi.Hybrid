using Radyo.Dunyasi.WebApi.Helper;
using Radyo.Dunyasi.WebApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace Radyo.Dunyasi.WebApi.BusinessLayer
{
    public class RadioBusinessLayer : BaseBusinessLayer
    {
        public Response<List<Category>> GetCategories()
        {
            var listCategories = XmlOperations.ReadXml<List<Category>>("categories.xml");
            return CreateResponse(listCategories);
        }

        public Response<List<Radio>> GetRadios(int categoryId = -1)
        {
            var listRadios = XmlOperations.ReadXml<List<Radio>>("radios.xml");
            if (categoryId > 0)
            {
                var categoryRadioList = new List<Radio>();
                listRadios.ForEach(r =>
                {
                    if (r.ListCategories.Contains(categoryId))
                        categoryRadioList.Add(r);
                });
                listRadios = categoryRadioList;
            }
            return CreateResponse(listRadios);
        }
    }
}