using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class CredencialesController : ApiController
    {
        // GET: api/Credenciales
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Credenciales/5
        public Credenciales Get(int id1, int id2, string id3)
        {
            Credenciales cred = new Credenciales();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                cred = db.Credenciales.Find(id1, id2, id3);
            }
            return cred;
        }

        public Credenciales GetByUserAndPassword(string user, string password)
        {
            Credenciales cred;
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                cred = db.Credenciales.FirstOrDefault(c => c.Usuario == user && c.Contra == password);
            }
            return cred;
        }


        // POST: api/Credenciales
        public void Post([FromBody]Credenciales value)
        {
            using(sistemas2_webEntities db = new sistemas2_webEntities())
            {
                db.Credenciales.Add(value);
                db.SaveChanges();
            }
        }

        // PUT: api/Credenciales/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Credenciales/5
        public void Delete(int id)
        {
        }
    }
}
