using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class PaisController : ApiController
    {
        // GET: api/Pais
        public List<Paises> GetAll()
        {
            List<Paises> listaPaises = new List<Paises>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaPaises = db.Paises.ToList();
            }

            return listaPaises;
        }

        // GET: api/Pais/5
        [Route("api/Pais/{Codigo}")]
        public Paises Get(int Codigo)
        {
            Paises pais = new Paises();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                pais = db.Paises.Find(Codigo);
            }
            return pais;
        }

        // POST: api/Pais
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Pais/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Pais/5
        public void Delete(int id)
        {
        }
    }
}
