using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class RolController : ApiController
    {
        // GET: api/Rol
        public List<Roles> GetAll()
        {
            List<Roles> listaRoles = new List<Roles>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaRoles = db.Roles.ToList();
            }

            return listaRoles;
        }

        // GET: api/Rol/5
        public Roles Get(int id)
        {
            Roles rol = new Roles();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                rol = db.Roles.Find(id);
            }
            return rol;
        }

        // POST: api/Rol
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Rol/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Rol/5
        public void Delete(int id)
        {
        }
    }
}
