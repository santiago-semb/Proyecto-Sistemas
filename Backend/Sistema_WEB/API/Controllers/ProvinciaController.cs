using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class ProvinciaController : ApiController
    {
        // GET: api/Provincia
        public List<Provincias> GetAll()
        {
            List<Provincias> listaProvincias = new List<Provincias>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaProvincias = db.Provincias.ToList();
            }

            return listaProvincias;
        }

        // GET: api/Provincia/5
        [Route("api/Provincia/{Codigo}")]
        public Provincias Get(int Codigo)
        {
            Provincias provincia = new Provincias();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                provincia = db.Provincias.Find(Codigo);
            }
            return provincia;
        }

        // POST: api/Provincia
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Provincia/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Provincia/5
        public void Delete(int id)
        {
        }
    }
}
