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
    public class UserDataController : Controller
    {
      

        [HttpGet("[action]")]
        public IEnumerable<UserData> GetUserData()
        {
       

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

        public IEnumerable<UserData> Authenticate([FromBody] UserData ud)
        {


            string[] result = System.IO.File.ReadAllLines("./ClientApp/src/components/UserData.json");
                      
            var users = Enumerable.Range(1, result.Length).Select(index => new UserData
            {
                ID = index + 1,
                Name = (string)JObject.Parse(result[index - 1]).SelectToken("Name"),
                Phone = (string)JObject.Parse(result[index - 1]).SelectToken("Phone"),
                Email = (string)JObject.Parse(result[index - 1]).SelectToken("Email"),
                Pass = (string)JObject.Parse(result[index - 1]).SelectToken("Pass")
            });

            var userfound = users
            .Where(user => user.Email == ud.Email && user.Pass == ud.Pass)
            .Select(u => new UserData
            {
                Status = "Success",
                Name = u.Name,
                Phone = u.Phone,
                Email = u.Email,
            }).ToList();

      
            if (userfound.Count() > 0)
            {
                return userfound;
            }
            else
            {

                return Enumerable.Range(1, 1).Select(index => new UserData
                {
                    Status = "Error",
                    Message = "Username or password is incorrect"
                });
              

            }



        }

        [HttpPost("[action]")]
        public IActionResult CreateUserData([FromBody] UserData ud)
        
        {

            var checkpre = GetUserData();

            var userfound = checkpre
           .Where(user => user.Email == ud.Email)
           .Select(u => new UserData
           {
               Status = "found",
             
           }).ToList();


            if (userfound.Count() > 0)
            {
                return BadRequest();

            }

            string json = JsonConvert.SerializeObject(ud);

            //write string to file
            System.IO.File.AppendAllText("./ClientApp/src/components/UserData.json", json + Environment.NewLine);
            //using (StreamWriter file = File.CreateText(@"D:\path.txt"))
      
            return Ok();
            
        }
    
    }
}
