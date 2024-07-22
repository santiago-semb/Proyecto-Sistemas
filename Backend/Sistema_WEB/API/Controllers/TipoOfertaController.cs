using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class TipoOfertaController : ApiController
    {
        // GET: api/TipoOferta
        public List<Tipos_Ofertas> Get()
        {
            List<Tipos_Ofertas> list = new List<Tipos_Ofertas>();
            using(sistemas2_webEntities db = new sistemas2_webEntities())
            {
                list = db.Tipos_Ofertas.ToList();
            }
            return list;
        }

        // GET: api/TipoOferta/5
        public Tipos_Ofertas Get(int id)
        {
            Tipos_Ofertas oferta = new Tipos_Ofertas();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                oferta = db.Tipos_Ofertas.Find(id);
            }
            return oferta;
        }

        // POST: api/TipoOferta
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/TipoOferta/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/TipoOferta/5
        public void Delete(int id)
        {
        }
    }
}
