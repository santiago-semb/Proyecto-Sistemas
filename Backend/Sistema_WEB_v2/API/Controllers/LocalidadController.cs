using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class LocalidadController : ApiController
    {
        // GET: api/Localidad
        public List<Localidades> GetAll()
        {
            List<Localidades> listaLocalidades = new List<Localidades>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaLocalidades = db.Localidades.ToList();
            }

            return listaLocalidades;
        }

        // GET: api/Localidad/5
        [Route("api/Localidad/{Codigo}")]
        public Localidades Get(int Codigo)
        {
            Localidades localidad = new Localidades();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                localidad = db.Localidades.Find(Codigo);
            }
            return localidad;
        }

        // POST: api/Localidad
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Localidad/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Localidad/5
        public void Delete(int id)
        {
        }
    }
}
