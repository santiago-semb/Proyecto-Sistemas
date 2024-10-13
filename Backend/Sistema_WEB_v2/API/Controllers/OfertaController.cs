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
                ofertas = db.Ofertas
                    .OrderByDescending(oferta => oferta.FechaPubl)
                    .ThenBy(oferta => oferta.Id)
                    .ToList();
            }
            return ofertas;
        }

        // GET: api/Oferta
        [HttpGet]
        //[Route("api/Oferta/likeName/{name}")]
        public List<Ofertas> GetByFilterDesc(string nombre)
        {
            List<Ofertas> ofertas = new List<Ofertas>();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                ofertas = db.Ofertas
                    .Where(oferta => oferta.Nombre.Contains(nombre))
                    .OrderByDescending(oferta => oferta.FechaPubl)
                    .ThenBy(oferta => oferta.Id)
                    .ToList();
            }
            return ofertas;
        }

        // GET: api/Oferta
        [HttpGet]
        //[Route("api/Oferta/likeName/{category}")]
        public List<Ofertas> GetByFilterCategory(int categoria)
        {
            List<Ofertas> ofertas = new List<Ofertas>();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                ofertas = db.Ofertas
                    .Where(oferta => oferta.Categoria == categoria)
                    .OrderByDescending(oferta => oferta.FechaPubl)
                    .ThenBy(oferta => oferta.Id)
                    .ToList();
            }
            return ofertas;
        }

        // GET: api/Oferta
        [HttpGet]
        [Route("api/Oferta/byDoc/{pais}/{tdoc}/{ndoc}")]
        public List<Ofertas> GetOfferByDoc(int pais, int tdoc, string ndoc)
        {
            List<Ofertas> ofertas = new List<Ofertas>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                ofertas = db.Ofertas
                                    .Where(offer =>
                                          (offer.Pais == pais && offer.Tdoc == tdoc && offer.Ndoc == ndoc)
                                          )
                                    .OrderByDescending(offer => offer.FechaPubl)
                                    .ThenBy(offer => offer.Id)
                                    .ToList();
            }

            return ofertas;
        }

        // GET: api/Oferta/5
        [HttpGet]
        public Ofertas Get(int id)
        {
            Ofertas oferta = new Ofertas();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                oferta = db.Ofertas.Find(id);
                // Si la foto no es nula, conviértela a base64 y asigna a una nueva propiedad
                if (oferta.Foto != null)
                {
                    // Usar una propiedad temporal para almacenar la cadena base64
                    oferta.FotoBase64 = Convert.ToBase64String(oferta.Foto);
                }
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

        // Actualizar estado de oferta
        [HttpPut]
        [Route("api/Oferta/estadoUpd/{id}")]
        public void EstadoUpdate(int id)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                Ofertas oferta = db.Ofertas.Find(id);
                if(oferta.Estado == 1)
                {
                    oferta.Estado = 2;
                }
                else
                {
                    oferta.Estado = 1;
                }

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
