using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Azure;
using Azure.Search.Documents;
using Azure.Search.Documents.Models;
using CoreWebApplication.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace CoreWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration configuration;
        public ProductController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        [HttpGet]
        public List<product> ProductResult(string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                query = "dress";
            }
            string searchServiceEndPoint = configuration["searchServiceEndPoint"];
            string queryApiKey = configuration["ApiKey"];
            string indexName = configuration["productIndex"];
            List<product> productList = new List<product>();
            SearchClient searchClient = new SearchClient(new Uri(searchServiceEndPoint), indexName, new AzureKeyCredential(queryApiKey));
            SearchResults<product> results;

            SearchOptions options = new SearchOptions();
            //options.Select.Add("product_name");
            options.SearchFields.Add("product_name");
            results = searchClient.Search<product>(query, options);
            foreach (SearchResult<product> result in results.GetResults())
            {
                Console.WriteLine(result.Document);
                productList.Add(result.Document);
            }
            return productList;
        }

    }
}