using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class CategoriaController : ApiController
    {
        // GET: api/Categoria
        public List<Categorias> Get()
        {
            List<Categorias> categorias = new List<Categorias>();
              
            using(sistemas2_webEntities db = new sistemas2_webEntities())
            {
                categorias = db.Categorias.ToList();
            }

            return categorias;
        }

        // GET: api/Categoria/5
        public Categorias Get(int id)
        {
            Categorias categoria = new Categorias();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                categoria = db.Categorias.Find(id);
            }

            return categoria;
        }

        // POST: api/Categoria
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Categoria/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Categoria/5
        public void Delete(int id)
        {
        }
    }
}
