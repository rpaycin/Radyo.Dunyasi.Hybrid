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
            //tüm kategoriler
            var listFullCategories = XmlOperations.ReadXml<List<Category>>("categories.xml");

            //tüm radyolar
            var listFullRadios = XmlOperations.ReadXml<List<Radio>>("radios.xml");

            //kategoriye göre filtreleme
            if (categoryId > 0)
            {
                var categoryRadioList = new List<Radio>();
                listFullRadios.ForEach(r =>
                {
                    if (r.ListCategories.Contains(categoryId))
                        categoryRadioList.Add(r);
                });
                listFullRadios = categoryRadioList;
            }

            //kategori isimlerini alma
            listFullRadios.ForEach(r =>
            {
                if (r.ListCategories != null && r.ListCategories.Count > 0)
                {
                    r.ListCategories.ForEach(cr => {
                        Category category = listFullCategories.FirstOrDefault(c => c.Id == cr);
                        if (category != null)
                            r.ListCategoryNames.Add(category.Name);
                    });
                }
            });

            return CreateResponse(listFullRadios);
        }
    }
}