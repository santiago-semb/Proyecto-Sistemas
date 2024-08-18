using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class BlockChatController : ApiController
    {
        // GET: api/BlockChat
        public List<block_chat> Get()
        {
            List<block_chat> chats = new List<block_chat>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                chats = db.block_chat.ToList();
            }

            return chats;
        }

        // GET: api/BlockChat
        [HttpGet]
        [Route("api/BlockChat/list/{pais}/{tdoc}/{ndoc}")]
        public List<block_chat> GetChatsByDoc(int pais, int tdoc, string ndoc)
        {
            List<block_chat> chats = new List<block_chat>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                chats = db.block_chat
                                    .Where(m =>
                                          (m.PaisBloqueador == pais && m.TdocBloqueador == tdoc && m.NdocBloqueador == ndoc)
                                          )
                                    .ToList();
            }

            return chats;
        }

        // GET: api/BlockChat/5
        public block_chat Get(int id)
        {
            block_chat chat = new block_chat();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                chat = db.block_chat.Find(id);
            }
            return chat;
        }

        // GET: api/BlockChat
        [HttpGet]
        [Route("api/BlockChat/blocked/{pais}/{tdoc}/{ndoc}/{id_chat}")]
        public bool ChatBlocked(int pais, int tdoc, string ndoc, int id_chat)
        {
            block_chat chat = new block_chat();
            bool existe = false;
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                // Buscar el registro que coincide con las condiciones
                chat = db.block_chat
                             .Where(c => c.PaisBloqueador == pais &&
                                         c.TdocBloqueador == tdoc &&
                                         c.NdocBloqueador == ndoc &&
                                         c.Chat_Id == id_chat
                                    )
                             .FirstOrDefault();
                if(chat != null)
                {
                    existe = true;
                }
            }
            return existe;
        }

        // POST: api/BlockChat
        public void Post([FromBody] block_chat value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                db.block_chat.Add(value);
                db.SaveChanges();
            }
        }

        // PUT: api/BlockChat/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/BlockChat/5
        [HttpDelete]
        [Route("api/BlockChat/{id}/{chat_id}")]
        public void Delete(int id, int chat_id)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                block_chat chat = db.block_chat.Find(id, chat_id);
                db.block_chat.Remove(chat);
                db.SaveChanges();
            }
        }
    }
}
