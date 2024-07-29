using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class PJController : ApiController
    {
        // GET: api/PJ
        public List<DPJ01> Get()
        {
            List<DPJ01> listaPersonasJuridicas = new List<DPJ01>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaPersonasJuridicas = db.DPJ01.ToList();
            }

            return listaPersonasJuridicas;
        }

        // GET: api/PJ/5
        public DPJ01 Get(int Pais, int Tdoc, string Ndoc)
        {
            DPJ01 persona = new DPJ01();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                persona = db.DPJ01.Find(Pais, Tdoc, Ndoc);
            }
            return persona;
        }

        // POST: api/PJ
        public void Post([FromBody]DPJ01 value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                db.DPJ01.Add(value);
                db.SaveChanges();
            }
        }

        // PUT: api/PJ/5
        public void Put(int Pais, int Tdoc, string Ndoc, [FromBody]DPJ01 value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                DPJ01 pj = db.DPJ01.Find(Pais, Tdoc, Ndoc);
                pj.RazSoc = value.RazSoc;
                pj.TipoEnt = value.TipoEnt;
                pj.PagWeb = value.PagWeb;

                db.Entry(pj).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }

        // DELETE: api/PJ/5
        public void Delete(int id)
        {
        }
    }
}
