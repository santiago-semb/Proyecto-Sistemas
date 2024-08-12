using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class MessageChatController : ApiController
    {
        // GET: api/MessageChat
        public List<message_chat> Get()
        {
            List<message_chat> msgs = new List<message_chat>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                msgs = db.message_chat.ToList();
            }

            return msgs;
        }

        [HttpGet]
        [Route("api/MessageChat/list/noread/{pais}/{tdoc}/{ndoc}")]
        public List<message_chat> GetChatsNoLeidos(int pais, int tdoc, string ndoc)
        {
            List<message_chat> msgs = new List<message_chat>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                msgs = db.message_chat
                            .Where(m => m.PaisReceptor2 == pais && m.TdocReceptor2 == tdoc && m.NdocReceptor2 == ndoc
                                    && m.Leido == false)
                            .ToList();
            }

            return msgs;
        }

        // GET: api/MessageChat
        [HttpGet]
        [Route("api/MessageChat/list/{id}")]
        public List<message_chat> GetByIdList(int id)
        {
            List<message_chat> msgs = new List<message_chat>();

            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                msgs = db.message_chat
                            .Where(m => m.Id_Chat == id)
                            .ToList();
            }

            return msgs;
        }

        // GET: api/MessageChat/5
        public message_chat Get(int id)
        {
            message_chat msg = new message_chat();
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                msg = db.message_chat.Find(id);
            }
            return msg;
        }

        // POST: api/MessageChat
        public void Post([FromBody] message_chat value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                db.message_chat.Add(value);
                db.SaveChanges();
            }
        }

        // PUT: api/MessageChat/5
        public void Put(int id, [FromBody] message_chat value)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                message_chat msg = db.message_chat.Find(id);
                msg.Leido = value.Leido;

                db.Entry(msg).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
        }

        // DELETE: api/MessageChat/5
        public void Delete(int id)
        {
            using (sistemas2_webEntities db = new sistemas2_webEntities())
            {
                message_chat msg = db.message_chat.Find(id);
                db.message_chat.Remove(msg);
                db.SaveChanges();
            }
        }
    }
}
