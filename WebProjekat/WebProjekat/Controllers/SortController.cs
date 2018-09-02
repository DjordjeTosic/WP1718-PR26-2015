using Projekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace WebProjekat.Controllers
{
    public class SortController : ApiController
    {
        [HttpGet]
        [Route("api/sort/getsort/{id}")]
        public List<Voznja> GetSort(string id)
        {
            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }



            List<Voznja> search = HttpContext.Current.Session["search"] as List<Voznja>;

            if (search == null)
            {
                search = new List<Voznja>();
                HttpContext.Current.Session["search"] = search;
            }

            List<Voznja> retVal = new List<Voznja>();

            

            if (id == "Datum")
            {
                foreach (Voznja v in search)
                {
                    retVal.Add(v);
                }
                retVal = retVal.OrderByDescending(x => x.DatumVreme).ToList();
            }
            else if (id == "Ocena")
            {
                foreach (Voznja v in search)
                {
                    retVal.Add(v);
                }
                retVal = retVal.OrderByDescending(x => x.Komentar.Ocena).ToList();
            }

            //HttpContext.Current.Session["search"] = retVal;

            return retVal;
        }

    }
}
