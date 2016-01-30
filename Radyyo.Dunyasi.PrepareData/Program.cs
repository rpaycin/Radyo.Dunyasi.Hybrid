using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
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
            //SaveRadios();
            var list = ReadXml<List<Radio>>("radiosFull.xml");

            int counter = 1;
            foreach (var radio in list)
            {
                radio.RadioId = counter;
                counter++;
            }
            SaveRadios(list);

            RadioUrlTest();

        }

        private static void SaveRadios(List<Radio> radios)
        {
            var SerializerObj = new XmlSerializer(typeof(List<Radio>));
            
            SaveXml(SerializerObj, @"C:\radios.xml", radios);
        }

        private void SaveCategories()
        {
            XmlSerializer SerializerObj = new XmlSerializer(typeof(List<Category>));
            var categories = new List<Category>();

            var listCategoryNames = new List<string>
            {
                "80'ler","Akustik","Altenatif","Arabesk","Dini","Dünya Müzikleri","Elektronik","Görme Engelli","Haber","Halk Müziği","Hip-Hop","Jazz","Klasik Müzik",
                "Lounge","Metal","Nostaljik","Pop","Popüler","Rock","Slow","Spor","TSM","Türkçe Pop"
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

        private static void RadioUrlTest()
        {
            XmlSerializer SerializerObj = new XmlSerializer(typeof(List<Radio>));

            var list = ReadXml<ArrayOfRadio>("radyourl-2015-08.xml");

            var listWhite = new List<Radio>();

            var listWhiteTest = RadioTestFromXml(list);
            var listWhiteTest2 = RadioTestFromXml(list, true);

            foreach (var commaRadio in listWhiteTest2)
            {
                if (!listWhiteTest.Any(r => r.Name == commaRadio.Name))
                {
                    listWhiteTest.Add(commaRadio);
                }
            }

            foreach (var item in listWhiteTest)
            {
                listWhite.Add(new Radio
                {
                    RadioName = item.Name,
                    IsImageLocal = true,
                    IsShow = true,
                    StreamUrl = item.Link,
                    IconUrl = string.Format("{0}.png", item.Name.Replace(" ", "")),
                    RadioId = item.ID
                });
            }

            SaveXml(SerializerObj, @"C:\radiosTest1.xml", listWhite);
        }

        private static List<RadioTestModel> RadioTestFromXml(ArrayOfRadio list, bool isContainExtraUrl = false)
        {
            int i = 1;
            var wb = new MyWebClient();

            var listWhite = new List<RadioTestModel>();
            var listBlack = new List<RadioTestModel>();

            foreach (var radioTest in list.ListRadioTest)
            {
                try
                {
                    radioTest.Link = isContainExtraUrl ? string.Format("{0};", radioTest.Link) : radioTest.Link;
                    Console.WriteLine(radioTest.Link);
                    var response2 = wb.DownloadString(radioTest.Link);

                    listWhite.Add(radioTest);
                }
                catch (Exception wex)
                {
                    listBlack.Add(radioTest);
                    //set flag if there was a timeout or some other issues
                }
                finally
                {
                    Console.WriteLine(i.ToString());
                    i++;
                }
            }

            return listWhite;
        }
    }

    public class MyWebClient : WebClient
    {
        protected override WebRequest GetWebRequest(Uri uri)
        {
            try
            {
                WebRequest w = base.GetWebRequest(uri);
                w.Timeout = 3000;
                return w;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }


}
