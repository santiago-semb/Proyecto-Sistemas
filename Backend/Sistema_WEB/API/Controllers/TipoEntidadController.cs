using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class TipoEntidadController : ApiController
    {
        // GET: api/TipoEntidad
        public List<Tipos_Entidades> Get()
        {
            List<Tipos_Entidades> listaTEnt = new List<Tipos_Entidades>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaTEnt = db.Tipos_Entidades.ToList();
            }

            return listaTEnt;
        }

        // GET: api/TipoEntidad/5
        public Tipos_Entidades Get(int Id)
        {
            Tipos_Entidades tent = new Tipos_Entidades();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                tent = db.Tipos_Entidades.Find(Id);
            }
            return tent;
        }

        // POST: api/TipoEntidad
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/TipoEntidad/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/TipoEntidad/5
        public void Delete(int id)
        {
        }
    }
}
