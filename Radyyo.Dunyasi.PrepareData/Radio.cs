using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Radyyo.Dunyasi.PrepareData
{
    [Serializable()]
    public class Radio
    {
        public int RadioId { get; set; }

        public string RadioName { get; set; }

        public string IconUrl { get; set; }

        public string StreamUrl { get; set; }

        public List<int> ListCategories { get; set; }
    }
}
