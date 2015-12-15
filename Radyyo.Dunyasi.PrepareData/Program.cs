using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Radyyo.Dunyasi.PrepareData
{
    class Program
    {
        static void Main(string[] args)
        {
            // Create a new file stream for reading the XML file

            var list = ReadXml<List<Radio>>("radios.xml");

        }

        private static void SaveRadios()
        {
            XmlSerializer SerializerObj = new XmlSerializer(typeof(List<Radio>));
            var radios = new List<Radio>()
            {
                new Radio { RadioName = "Akdeniz FM", ListCategories = new List<int> { 4, 23 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Arabesk Radyo", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Arabesk Türkiye", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Arabesk Vadisi", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Aşk FM", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Damar FM", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Damla FM", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Efkar", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Gurbetçi FM", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "İmbat FM", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "İstanbul'un Sesi", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Kral FM", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Kral Türk FM", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Lokum FM", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Metropol FM Arabesk", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Radyo 2000", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Radyo 34", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Radyo Ahenk", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" },
                new Radio { RadioName = "Radyo Dermam", ListCategories = new List<int> { 4 }, IconUrl = "a.png", StreamUrl = "www.google.com" }
            };

            for (int i = 0; i < radios.Count; i++)
                radios[i].RadioId = i + 1;

            SaveXml(SerializerObj, @"C:\radios.xml", radios);
        }

        private void SaveCategories()
        {
            XmlSerializer SerializerObj = new XmlSerializer(typeof(List<Category>));
            var categories = new List<Category>();

            var listCategoryNames = new List<string>
            {
                "80'ler","Akustik","Altenatif","Arabesk","Dini","Dünya Müzikleri","Elektronik","Görme Engelli","Haber","Halk Müziği","Hip-Hop","Jazz","Klasik Müzik",
                "Lounge","Metal","Nostaljik","Pop","Popüler","Rock","Slow","Spor","Türk Sanat Müziği","Türkçe Pop"
            };

            for (int i = 0; i < listCategoryNames.Count; i++)
            {
                categories.Add(new Category
                {
                    Id = i + 1,
                    Name = listCategoryNames[i]
                });
            }

            SaveXml(SerializerObj, @"C:\categories.xml", categories);
        }

        private static void SaveXml(XmlSerializer serializerObj, string fullPath, object serialize)
        {
            TextWriter WriteFileStream = new StreamWriter(fullPath);
            serializerObj.Serialize(WriteFileStream, serialize);
        }

        private static T ReadXml<T>(string fileName)
        {
            string mainPath = @"C:\Users\resit\Documents\Visual Studio 2015\Projects\Radyo.Dunyasi.Hybrid\Radyyo.Dunyasi.PrepareData\App_Data";
            string fullPath = string.Format(@"{0}\{1}", mainPath, fileName);

            var serializer = new XmlSerializer(typeof(T));
            var readFileStream = new FileStream(fullPath, FileMode.Open, FileAccess.Read, FileShare.Read);

            // Load the object saved above by using the Deserialize function
            T loadedObj = (T)serializer.Deserialize(readFileStream);

            // Cleanup
            readFileStream.Close();

            return loadedObj;
        }
    }
}
