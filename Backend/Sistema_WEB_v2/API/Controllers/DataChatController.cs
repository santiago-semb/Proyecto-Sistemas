using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class DataChatController : ApiController
    {
        // GET: api/DataChat
        public List<data_chat> Get()
        {
            List<data_chat> chats = new List<data_chat>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                chats = db.data_chat.ToList();
            }

            return chats;
        }

        [HttpGet]
        public data_chat GetByPearson(int pEmi, int tEmi, string nEmi, int pRec, int tRec, string nRec)
        {
            data_chat chat = new data_chat();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                // Buscar el registro que coincide con las condiciones
                chat = db.data_chat
                             .Where(c => c.PaisEmisor == pEmi &&
                                         c.TdocEmisor == tEmi &&
                                         c.NdocEmisor == nEmi &&
                                         c.PaisReceptor == pRec &&
                                         c.TdocReceptor == tRec &&
                                         c.NdocReceptor == nRec)
                             .FirstOrDefault();

            }
            return chat;
        }

        // GET: api/DataChat/5
        public data_chat Get(int id)
        {
            data_chat chat = new data_chat();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                chat = db.data_chat.Find(id);
            }
            return chat;
        }

        // POST: api/DataChat
        public void Post([FromBody]data_chat value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                db.data_chat.Add(value);
                db.SaveChanges();
            }
        }

        // PUT: api/DataChat/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DataChat/5
        public void Delete(int id)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                data_chat chat = db.data_chat.Find(id);
                db.data_chat.Remove(chat);
                db.SaveChanges();
            }
        }
    }
}
