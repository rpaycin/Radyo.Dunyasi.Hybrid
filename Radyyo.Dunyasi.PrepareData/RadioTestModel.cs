using System;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace Radyyo.Dunyasi.PrepareData
{
    [XmlRoot("ArrayOfRadio")]
    public class ArrayOfRadio
    {
        [XmlElement("Radio")]
        public List<RadioTestModel> ListRadioTest { get; set; }
    }

    public class RadioTestModel
    {
        [XmlAttribute]
        public int ID { get; set; }
        [XmlAttribute]
        public string Name { get; set; }
        [XmlAttribute]
        public string Link { get; set; }
    }
}
