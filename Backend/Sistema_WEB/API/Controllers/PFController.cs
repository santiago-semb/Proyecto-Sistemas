using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class PFController : ApiController
    {
        // GET: api/PF
        public List<DPF01> GetAll()
        {
            List<DPF01> listaPersonasFisicas = new List<DPF01>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaPersonasFisicas = db.DPF01.ToList();
            }

            return listaPersonasFisicas;
        }

        // GET: api/PF/5
        public DPF01 Get(int Pais, int Tdoc, string Ndoc)
        {
            DPF01 persona = new DPF01();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                persona = db.DPF01.Find(Pais, Tdoc, Ndoc);
            }
            return persona;
        }

        // POST: api/PF
        public void Post([FromBody]DPF01 value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                db.DPF01.Add(value);
                db.SaveChanges();
            }
        }

        // PUT: api/PF/5
        [Route("api/PF/{Pais}/{Tdoc}/{Ndoc}")]
        public void Put(int Pais, int Tdoc, string Ndoc, [FromBody] DPF01 value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                DPF01 pf = db.DPF01.Find(Pais, Tdoc, Ndoc);
                pf.Nom1 = value.Nom1;
                pf.Nom2 = value.Nom2;
                pf.Ape1 = value.Ape1;
                pf.Ape2 = value.Ape2;
                pf.FecNac = value.FecNac;
                pf.Sexo = value.Sexo;

                db.Entry(pf).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }

        // DELETE: api/PF/5
        public void Delete(int id)
        {
        }
    }
}
