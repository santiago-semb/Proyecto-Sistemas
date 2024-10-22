using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Net.Http.Formatting; // Asegúrate de que este está presente

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
        [Route("api/Usuario/{Pais}/{Tdoc}/{Ndoc}")]
        public DUS01 Get(int Pais, int Tdoc, string Ndoc)
        {
            DUS01 usu = new DUS01();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                usu = db.DUS01.Find(Pais, Tdoc, Ndoc);

                if(usu != null)
                {
                    // Si la foto no es nula, conviértela a base64 y asigna a una nueva propiedad
                    if (usu.Foto != null)
                    {
                        // Usar una propiedad temporal para almacenar la cadena base64
                        usu.FotoBase64 = Convert.ToBase64String(usu.Foto);
                    }
                }


            }
            return usu;
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

        [HttpPut]
        [Route("api/Usuario/updatePhoto/{Pais}/{Tdoc}/{Ndoc}")]
        public async Task<IHttpActionResult> UpdateFoto(int Pais, int Tdoc, string Ndoc)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return BadRequest("Unsupported media type.");
            }

            var provider = new MultipartFormDataStreamProvider(Path.GetTempPath());
            await Request.Content.ReadAsMultipartAsync(provider);

            byte[] nuevaFoto = null;

            // Procesar el archivo enviado
            foreach (var file in provider.FileData)
            {
                // Leer la nueva imagen como bytes
                nuevaFoto = File.ReadAllBytes(file.LocalFileName);
            }

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                // Buscar el usuario existente
                var usuario = db.DUS01.Find(Pais,Tdoc,Ndoc);
                if (usuario == null)
                {
                    return NotFound(); // Si no se encuentra el usuario
                }

                // Actualizar solo el campo Foto
                usuario.Foto = nuevaFoto;
                db.Entry(usuario).State = System.Data.Entity.EntityState.Modified;
                await db.SaveChangesAsync();
            }

            return Ok("Foto actualizada con éxito.");
        }

        // DELETE: api/Usuario/5
        public void Delete(int id)
        {
        }
    }
}
