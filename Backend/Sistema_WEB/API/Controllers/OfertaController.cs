using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class OfertaController : ApiController
    {
        // GET: api/Oferta
        public List<Ofertas> Get()
        {
            List<Ofertas> ofertas = new List<Ofertas>();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                ofertas = db.Ofertas.ToList();
            }
            return ofertas;
        }

        // GET: api/Oferta/5
        public Ofertas Get(int id)
        {
            Ofertas oferta = new Ofertas();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                oferta = db.Ofertas.Find(id);
            }
            return oferta;
        }

        // POST: api/Oferta
        public void Post([FromBody]Ofertas value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                db.Ofertas.Add(value);
                db.SaveChanges();
            }
        }

        // PUT: api/Oferta/5
        public void Put(int id, [FromBody]Ofertas value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                Ofertas oferta = db.Ofertas.Find(id);
                oferta.Tipo_Oferta = value.Tipo_Oferta;
                oferta.Nombre = value.Nombre;
                oferta.Descripcion = value.Descripcion;
                oferta.Categoria = value.Categoria;
                oferta.Foto = value.Foto;
                oferta.Precio = value.Precio;
                oferta.Estado = value.Estado;

                db.Entry(oferta).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }

        // DELETE: api/Oferta/5
        public void Delete(int id)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                Ofertas persona = db.Ofertas.Find(id);
                db.Ofertas.Remove(persona);
                db.SaveChanges();
            }
        }
    }
}
