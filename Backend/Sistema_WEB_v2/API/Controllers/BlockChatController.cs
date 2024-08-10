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
        public void Delete(int id)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                block_chat chat = db.block_chat.Find(id);
                db.block_chat.Remove(chat);
                db.SaveChanges();
            }
        }
    }
}
