using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Rolodex_App_React.Models;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;




namespace Rolodex_App_React.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private static string[] Names = new[]
     {
            "Jon", "Adam", "Jess", "Jeff", "Tom", "Don", "Kevin", "Zak", "Kell", "Steve"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 9).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpGet("[action]")]
        public IEnumerable<UserData> GetUserData()
        {
            //UserData movie1 = JsonConvert.DeserializeObject<UserData>(File.ReadAllText("./ClientApp/src/components/UserData.txt"));

            //// deserialize JSON directly from a file
            //using (StreamReader file = File.OpenText(@"c:\movie.json"))
            //{
            //    JsonSerializer serializer = new JsonSerializer();
            //    UserData movie2 = (UserData)serializer.Deserialize(file, typeof(UserData));
            //using (StreamReader r = new StreamReader("./ClientApp/src/components/UserData.txt"))
            //{
            //    string json = r.ReadToEnd();
            //    List<UserData> items = JsonConvert.DeserializeObject<List<UserData>>(json);
            //}
            //JObject o1 = JObject.Parse(System.IO.File.ReadAllText("./ClientApp/src/components/UserData.json"));

            // read JSON directly from a file
            //using (StreamReader file = System.IO.File.OpenText("./ClientApp/src/components/UserData.json"))
            //using (JsonTextReader reader = new JsonTextReader(file))
            //{
            //    JObject o2 = (JObject)JToken.ReadFrom(reader);

            //    var categories =
            //   from c in o2["ID"]              
            //   select new { Category = g.Key, Count = g.Count() };

            //    return o2.Select(index => new UserData
            //    {
            //        ID = index + 1,
            //        Name = Names[rng.Next(Names.Length)],
            //        Phone = rng.Next(1000000, 9999999).ToString(),
            //        Email = Summaries[rng.Next(Summaries.Length)]
            //    });
            //}

            //using (StreamReader r = new StreamReader("./ClientApp/src/components/UserData.json"))
            //{
            //    string json = r.ReadToEnd();

            //    UserData account = JsonConvert.DeserializeObject<UserData>(json);

            //    dynamic array = JsonConvert.DeserializeObject(json);
            //    foreach (var item in array)
            //    {
            //        Console.WriteLine("{0} {1}", item.temp, item.vcc);
            //    }
            //    List<UserData> items = JsonConvert.DeserializeObject<List<UserData>>(json);
            //    return items;
            //}

            string[] result = System.IO.File.ReadAllLines("./ClientApp/src/components/UserData.json");

            var rng = new Random();
            return Enumerable.Range(1, result.Length).Select(index => new UserData
            {
                ID = index + 1,
                Name = (string)JObject.Parse(result[index - 1]).SelectToken("Name"),
                Phone = (string)JObject.Parse(result[index - 1]).SelectToken("Phone"),
                Email = (string)JObject.Parse(result[index - 1]).SelectToken("Email")
            });

        }

        [HttpPost("[action]")]
        public IActionResult CreateUserData([FromBody] UserData ud)
        
        {
            //int newID = 0;

        
            //using (StreamReader r = new StreamReader("./ClientApp/src/components/UserData.txt"))
            //{
            //    string fjson = r.ReadToEnd();

            //    //JObject obj = JObject.Parse(fjson);

            //    JArray a = JArray.Parse(fjson);

            //    IList<UserData> userList = a.ToObject<IList<UserData>>();
            //    //List<UserData> userList = JsonConvert.DeserializeObject<List<UserData>>(obj);
            //    newID = userList.Count();
            //}

            //var udwid = new UserData();
            //udwid.ID = newID + 1;
            //udwid.Name = ud.Name;
            //udwid.Pass = ud.Pass;
            //udwid.Phone = ud.Phone;
            //udwid.Email = ud.Email;


            string json = JsonConvert.SerializeObject(ud);

            //write string to file
            System.IO.File.AppendAllText("./ClientApp/src/components/UserData.json", json + Environment.NewLine);
            //using (StreamWriter file = File.CreateText(@"D:\path.txt"))
      
            return Ok();

        }
    
    }
}
