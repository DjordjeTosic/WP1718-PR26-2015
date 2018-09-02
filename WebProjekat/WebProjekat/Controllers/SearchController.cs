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
    public class SearchController : ApiController
    {
        [HttpGet]
        [Route("api/search/getfiltracija/{id}")]
        public List<Voznja> GetFiltracija(string id)
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

            
            foreach (Voznja v in search)
            {
                if (v.StatusVoznje.ToString() == id)
                {
                    retVal.Add(v);
                }
            }

            //HttpContext.Current.Session["search"] = retVal;

            return retVal;
        }

        [HttpGet]
        [Route("api/search/getsearch/{from}/{to}")]
        public List<Voznja> GetSearch(DateTime from, DateTime to)
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
            int result1;
            int result2;

           

            foreach (Voznja v in search)
            {
                result1 = DateTime.Compare(from, v.DatumVreme);
                result2 = DateTime.Compare(to, v.DatumVreme);

                if (result1 < 0 && result2 > 0)
                {
                    retVal.Add(v);
                }
            }

            //HttpContext.Current.Session["search"] = retVal;

            return retVal;
        }

        [HttpGet]
        [Route("api/search/getsearchprice/{from}/{to}")]
        public List<Voznja> GetSearchPrice(double from, double to)
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

            bool flag1 = true;
            bool flag2 = true;

            if (from == -1)
                flag1 = false;

            if (to == -1)
                flag2 = false;


            List<Voznja> retVal = new List<Voznja>();

            foreach (Voznja v in search)
            {
                if (!flag1)
                    from = v.Iznos;

                if (!flag2)
                    to = v.Iznos;

                if (v.Iznos >= from && v.Iznos <= to)
                {
                    retVal.Add(v);
                }
            }

            //HttpContext.Current.Session["search"] = retVal;

            return retVal;
        }

    }
}
