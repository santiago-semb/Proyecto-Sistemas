using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class TipoDomicilioController : ApiController
    {
        // GET: api/TipoDomicilio
        public List<Tipos_Domicilios> GetAll()
        {
            List<Tipos_Domicilios> listaDomicilios = new List<Tipos_Domicilios>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaDomicilios = db.Tipos_Domicilios.ToList();
            }

            return listaDomicilios;
        }

        // GET: api/TipoDomicilio/5
        public Tipos_Domicilios Get(int id)
        {
            Tipos_Domicilios domicilio = new Tipos_Domicilios();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                domicilio = db.Tipos_Domicilios.Find(id);
            }
            return domicilio;
        }

        // POST: api/TipoDomicilio
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/TipoDomicilio/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/TipoDomicilio/5
        public void Delete(int id)
        {
        }
    }
}
