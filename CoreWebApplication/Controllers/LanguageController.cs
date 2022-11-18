using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CoreWebApplication.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace CoreWebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private string connString;
        public LanguageController(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.connString = configuration.GetConnectionString("essieConn");
        }

        [HttpGet]
        public JsonResult GetLanguage()
        {
            string query = "select * from Languages";
            DataTable dt = new DataTable();
          
            SqlDataReader sqlDataReader;

            using (SqlConnection conn = new SqlConnection(connString))
            {
                conn.Open();
                using (SqlCommand sql= new SqlCommand(query,conn))
                {
                    sqlDataReader = sql.ExecuteReader();
                    dt.Load(sqlDataReader);
                    sqlDataReader.Close();
                    conn.Close();
                }

            }
            return new JsonResult(dt);
        }
        [HttpPut]
        public string UpadateLanguage(language language)
        {
            string query = "Update Languages set Language ='" + language.Language + "', Country_Language='" + language.Country_Language + "'where LangID ="+language.LangID;
            DataTable dt = new DataTable();
            try
            {
                SqlDataReader sqlDataReader;
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(query, conn))

                    using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                    {
                        cmd.CommandType = CommandType.Text;
                        adapter.Fill(dt);
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;   
            }
            return "Item added successfully";
        }
        [HttpPost]
        public string AddLanguage(language language)
        {
            string query = "insert into Languages values ('" + language.Language + "','" + language.Country_Language + "')";
            DataTable dt = new DataTable();
            try
            {
                SqlDataReader sqlDataReader;
                using (SqlConnection conn = new SqlConnection(connString))
                {
                    conn.Open();
                    using (SqlCommand cmd = new SqlCommand(query, conn))

                    using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                    {
                        cmd.CommandType = CommandType.Text;
                        adapter.Fill(dt);
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return "Item Updated successfully";
        }
    }
}