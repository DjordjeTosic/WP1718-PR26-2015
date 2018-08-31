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
    public class VoznjaController : ApiController
    {
        [HttpGet]
        public List<Voznja> Get()
        {
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            if (user.KorisnickoIme != "" && user.KorisnickoIme != null && user.Uloga == Enums.Uloga.Dispecer)
                return voznje.list;

            return new List<Voznja>();
        }
    }
}
