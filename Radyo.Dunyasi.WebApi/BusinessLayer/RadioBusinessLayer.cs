using Radyo.Dunyasi.WebApi.Helper;
using Radyo.Dunyasi.WebApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace Radyo.Dunyasi.WebApi.BusinessLayer
{
    public class RadioBusinessLayer : BaseBusinessLayer
    {
        private List<Category> GetCategoriesFromXml()
        {
            return XmlOperations.ReadXml<List<Category>>("categories.xml");
        }
        private List<Radio> GetRadiosFromXml()
        {
            return XmlOperations.ReadXml<List<Radio>>("radiosFull.xml");
        }

        public Response<List<Category>> GetCategories()
        {
            //tüm kategoriler
            var listCategories = GetCategoriesFromXml();

            //radyo kategori sayısı
            var listRadios = GetRadiosFromXml();
            listCategories.ForEach(c =>
            {
                foreach (var radio in listRadios)
                {
                    if (radio.ListCategories.Any(cr => cr == c.Id))
                        c.RadioCount++;
                }
            });
            return CreateResponse(listCategories);
        }

        public Response<List<Radio>> GetRadios(int categoryId = -1)
        {
            //tüm kategoriler
            var listFullCategories = GetCategoriesFromXml();

            //tüm radyolar
            var listFullRadios = GetRadiosFromXml();

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
                    r.ListCategories.ForEach(cr =>
                    {
                        Category category = listFullCategories.FirstOrDefault(c => c.Id == cr);
                        if (category != null)
                            r.ListCategoryNames.Add(category.Name);
                    });
                }
            });

            listFullRadios = listFullRadios.OrderBy(r => r.RadioName).ToList();
            return CreateResponse(listFullRadios);
        }
    }
}