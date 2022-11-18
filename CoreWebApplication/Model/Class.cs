using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreWebApplication.Model
{
    public class product
    {
        public int ID { get; set; }
        public string product_name { get; set; }
        public string culture { get; set; }
        public string product_category_name { get; set; }
        public string product_sub_category { get; set; }
        public string finish { get; set; }
        public string hex { get; set; }
        public string color_family_id { get; set; }
        public string product_short_description { get; set; }
        public string product_long_description { get; set; }
    }
}
