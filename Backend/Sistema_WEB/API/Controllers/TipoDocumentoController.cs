using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class TipoDocumentoController : ApiController
    {
        // GET: api/TipoDocumento
        public List<Tipos_Documentos> GetAll()
        {
            List<Tipos_Documentos> listaTiposDocumentos = new List<Tipos_Documentos>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaTiposDocumentos = db.Tipos_Documentos.ToList();
            }

            return listaTiposDocumentos;
        }

        // GET: api/TipoDocumento/5
        public Tipos_Documentos Get(int id)
        {
            Tipos_Documentos tipoDocumento = new Tipos_Documentos();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                tipoDocumento = db.Tipos_Documentos.Find(id);
            }
            return tipoDocumento;
        }

        // POST: api/TipoDocumento
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/TipoDocumento/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/TipoDocumento/5
        public void Delete(int id)
        {
        }
    }
}
