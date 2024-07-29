using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class ClienteController : ApiController
    {
        // GET: api/Cliente
        public List<DCL01> Get()
        {
            List<DCL01> listaClientes = new List<DCL01>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaClientes = db.DCL01.ToList();
            }

            return listaClientes;
        }

        // GET: api/Cliente/5
        [Route("api/Cliente/{Pais}/{Tdoc}/{Ndoc}")]
        public DCL01 Get(int Pais, int Tdoc, string Ndoc)
        {
            DCL01 cliente = new DCL01();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                cliente = db.DCL01.Find(Pais, Tdoc, Ndoc);
            }
            return cliente;
        }

        // POST: api/Cliente
        public void Post([FromBody] DCL01 value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                db.DCL01.Add(value);
                db.SaveChanges();
            }
        }

        // PUT: api/Cliente/5
        public void Put(int Pais, int Tdoc, string Ndoc, [FromBody] DCL01 value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                DCL01 cl = db.DCL01.Find(Pais, Tdoc, Ndoc);
                cl.Foto = value.Foto;
                cl.Presentacion = value.Presentacion;
                cl.CantCon = value.CantCon;
                cl.Score = value.Score;

                db.Entry(cl).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }

        // DELETE: api/Cliente/5
        public void Delete(int id)
        {
        }
    }
}
