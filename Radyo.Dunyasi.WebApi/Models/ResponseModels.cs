using System;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace Radyo.Dunyasi.WebApi.Models
{
    public class Response<T> : ExceptionResponse
    {
        public T Value { get; set; }
    }

    public class ExceptionResponse
    {
        public bool IsSuccess { get; set; }

        public string ErrorMessage { get; set; }
    }


    [XmlRoot("Category")]
    public class Category
    {
        [XmlElement("Id")]
        public int Id { get; set; }

        [XmlElement("Name")]
        public string Name { get; set; }
    }

    [XmlRoot("Radio")]
    public class Radio
    {
        [XmlElement("RadioId")]
        public int RadioId { get; set; }

        [XmlElement("RadioName")]
        public string RadioName { get; set; }

        [XmlElement("IconUrl")]
        public string IconUrl { get; set; }

        [XmlElement("StreamUrl")]
        public string StreamUrl { get; set; }

        [XmlElement("ListCategories")]
        public List<int> ListCategories { get; set; }
    }
}