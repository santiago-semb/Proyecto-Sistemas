using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class UsuarioController : ApiController
    {
        // GET: api/Usuario
        public List<DUS01> Get()
        {
            List<DUS01> listaUsuarios = new List<DUS01>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaUsuarios = db.DUS01.ToList();
            }

            return listaUsuarios;
        }

        // GET: api/Usuario/5
        public DUS01 Get(int Pais, int Tdoc, string Ndoc)
        {
            DUS01 persona = new DUS01();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                persona = db.DUS01.Find(Pais, Tdoc, Ndoc);
            }
            return persona;
        }

        // POST: api/Usuario
        public void Post([FromBody] DUS01 value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                db.DUS01.Add(value);
                db.SaveChanges();
            }
        }

        // PUT: api/Usuario/5
        [Route("api/Usuario/{Pais}/{Tdoc}/{Ndoc}")]
        public void Put(int Pais, int Tdoc, string Ndoc, [FromBody]DUS01 value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                DUS01 usu = db.DUS01.Find(Pais, Tdoc, Ndoc);
                usu.Foto = value.Foto;
                usu.Presentacion = value.Presentacion;

                db.Entry(usu).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }

        // DELETE: api/Usuario/5
        public void Delete(int id)
        {
        }
    }
}
