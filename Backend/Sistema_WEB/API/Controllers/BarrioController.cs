using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class BarrioController : ApiController
    {
        // GET: api/Barrio
        public List<Barrios> GetAll()
        {
            List<Barrios> listaBarrios = new List<Barrios>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaBarrios = db.Barrios.ToList();
            }

            return listaBarrios;
        }

        // GET: api/Barrio/5
        [Route("api/Barrio/{Codigo}")]
        public Barrios Get(int Codigo)
        {
            Barrios barrio = new Barrios();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                barrio = db.Barrios.Find(Codigo);
            }
            return barrio;
        }

        // POST: api/Barrio
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Barrio/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Barrio/5
        public void Delete(int id)
        {
        }
    }
}
