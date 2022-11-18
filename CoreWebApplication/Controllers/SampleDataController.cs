using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Azure;
using Azure.Search.Documents;
using Azure.Search.Documents.Models;
using CoreWebApplication.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace CoreWebApplication.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private string ApiUrl = "https://essie-eu-uat-searchservice-search-01-basic.search.windows.net/indexes/essie-productsandarticles-index-master/docs?api-version=2017-11-11-Preview&search='dress'&select='product_name,product_long_description,content__'&$filter=culture eq 'fr-FR'&$count=true";
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }
        string indexName = "essie-productsandarticles-index-master";
        [HttpGet("[action]")]
        public List<Products>  ProductResult(string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                query = "dress";
            }
            string searchServiceEndPoint = "https://essie-eu-uat-searchservice-search-01-basic.search.windows.net";
            string queryApiKey = "94384FBC3042FC8FB39CA52A4C1AD98D";
            List<Products> productList = new List<Products>();
            SearchClient searchClient = new SearchClient(new Uri(searchServiceEndPoint), indexName, new AzureKeyCredential(queryApiKey));
            SearchResults<Products> results;

            Console.WriteLine("Query 1: Search for 'motel'. Return only the HotelName in results:\n");

            SearchOptions options = new SearchOptions();
            //options.Select.Add("product_name");
            options.SearchFields.Add("product_name");
             results = searchClient.Search<Products>(query, options);
            foreach (SearchResult<Products> result in results.GetResults())
            {
                Console.WriteLine(result.Document);
                productList.Add(result.Document);
            }
             return productList;
        }



        private static SearchClient CreateSearchClientForQueries(string indexName, IConfigurationRoot configuration)
        {
            string searchServiceEndPoint = configuration["SearchServiceEndPoint"];
            string queryApiKey = configuration["SearchServiceQueryApiKey"];

            SearchClient searchClient = new SearchClient(new Uri(searchServiceEndPoint), indexName, new AzureKeyCredential(queryApiKey));
            return searchClient;
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        public class Products
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
}
