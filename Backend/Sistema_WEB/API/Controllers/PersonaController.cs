using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    public class PersonaController : ApiController
    {
        // GET: api/Persona
        public List<Personas> GetAll()
        {
            List<Personas> listaPersonas = new List<Personas>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                listaPersonas = db.Personas.ToList();
            }

            return listaPersonas;
        }

        // GET: api/Persona/5
        public Personas Get(int Pais, int Tdoc, string Ndoc)
        {
            Personas persona = new Personas();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                persona = db.Personas.Find(Pais, Tdoc, Ndoc);
            }
            return persona;
        }

        // POST: api/Persona
        public void Post([FromBody] Personas value)
        {
            if (Request.Method == HttpMethod.Options)
            {
                var response = new HttpResponseMessage(HttpStatusCode.OK);
                return;
            }

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                db.Personas.Add(value);
                db.SaveChanges();
            }
        }

        // PUT: api/Persona/5
        public void Put(int Pais, int Tdoc, string Ndoc, [FromBody] Personas value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                Personas persona = db.Personas.Find(Pais, Tdoc, Ndoc);
                persona.Tipo = value.Tipo;
                persona.Nombre = value.Nombre;
                persona.Rol = value.Rol;
                persona.Provincia = value.Provincia;
                persona.Localidad = value.Localidad;
                persona.Barrio = value.Barrio;
                persona.Tipo_Domicilio = value.Tipo_Domicilio;
                persona.Domicilio = value.Domicilio;
                persona.Telefono = value.Telefono;
                persona.Telefono_aux = value.Telefono_aux;
                persona.Email = value.Email;

                db.Entry(persona).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }

        // DELETE: api/Persona/5
        public void Delete(int Pais, int Tdoc, string Ndoc)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                Personas persona = db.Personas.Find(Pais, Tdoc, Ndoc);
                db.Personas.Remove(persona);
                db.SaveChanges();
            }
        }
    }
}
