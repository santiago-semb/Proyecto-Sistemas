using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
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
                // Si la foto no es nula, conviértela a base64 y asigna a una nueva propiedad
                if (cliente.Foto != null)
                {
                    // Usar una propiedad temporal para almacenar la cadena base64
                    cliente.FotoBase64 = Convert.ToBase64String(cliente.Foto);
                }
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

        [HttpPut]
        [Route("api/Cliente/updatePhoto/{Pais}/{Tdoc}/{Ndoc}")]
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
                var usuario = db.DCL01.Find(Pais, Tdoc, Ndoc);
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

        // DELETE: api/Cliente/5
        public void Delete(int id)
        {
        }
    }
}
