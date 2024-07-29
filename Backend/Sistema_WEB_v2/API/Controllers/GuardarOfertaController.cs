using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class GuardarOfertaController : ApiController
    {
        // GET: api/GuardarOferta
        public List<Guardar_Ofertas> Get()
        {
            List<Guardar_Ofertas> lista = new List<Guardar_Ofertas>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                lista = db.Guardar_Ofertas.ToList();
            }

            return lista;
        }

        public List<Guardar_Ofertas> GetByDoc(string Codigo_Usu)
        {
            List<Guardar_Ofertas> lista = new List<Guardar_Ofertas>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                lista = db.Guardar_Ofertas
                    .Where(oferta => oferta.Codigo_Usu == Codigo_Usu)
                    .OrderByDescending(oferta => oferta.Fecha_Guardado)
                    .ThenBy(oferta => oferta.Id_Oferta)
                    .ToList();

            }

            return lista;
        }

        // GET: api/GuardarOferta/5
        public Guardar_Ofertas Get(string Codigo_Usu, int Id_Oferta)
        {
            Guardar_Ofertas oferta = new Guardar_Ofertas();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                oferta = db.Guardar_Ofertas.Find(Codigo_Usu, Id_Oferta);
            }
            return oferta;
        }

        // POST: api/GuardarOferta
        public void Post([FromBody] Guardar_Ofertas value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                db.Guardar_Ofertas.Add(value);
                db.SaveChanges();
            }
        }

        // PUT: api/GuardarOferta/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/GuardarOferta/5
        public void Delete(string CodUsu, int IdOfer)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                Guardar_Ofertas oferta = db.Guardar_Ofertas.Find(CodUsu, IdOfer);
                db.Guardar_Ofertas.Remove(oferta);
                db.SaveChanges();
            }
        }
    }
}
