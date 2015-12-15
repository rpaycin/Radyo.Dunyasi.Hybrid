using System.IO;
using System.Web;
using System.Xml.Serialization;

namespace Radyo.Dunyasi.WebApi.Helper
{
    public class XmlOperations
    {
        public static T ReadXml<T>(string fileName)
        {
            string fullPath = string.Format(@"{0}/{1}", HttpContext.Current.Server.MapPath("~/App_Data"), fileName);

            var serializer = new XmlSerializer(typeof(T));
            var readFileStream = new FileStream(fullPath, FileMode.Open, FileAccess.Read, FileShare.Read);

            T loadedObj = (T)serializer.Deserialize(readFileStream);

            readFileStream.Close();

            return loadedObj;
        }
    }
}