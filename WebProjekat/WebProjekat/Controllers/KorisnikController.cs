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
    public class KorisnikController : ApiController
    {
        public string Get()
        {
            Korisnik user = HttpContext.Current.Session["user"] as Korisnik;
            if(user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }
            return user.KorisnickoIme;
        }

        [HttpPost]
        public Korisnik Post([FromBody]Korisnik korisnik)
        {
            Dispeceri dispeceri = (Dispeceri)HttpContext.Current.Application["dispeceri"];
            Korisnici users = (Korisnici)HttpContext.Current.Application["korisnici"];
            Vozaci vozaci = (Vozaci)HttpContext.Current.Application["vozaci"];
            Voznje voznje = (Voznje)HttpContext.Current.Application["voznje"];

            foreach (var item in users.list)
            {
                if (korisnik.KorisnickoIme == item.KorisnickoIme)
                {
                    return item;
                }
            }

            foreach (var item in dispeceri.list)
            {
                if (korisnik.KorisnickoIme == item.KorisnickoIme)
                {
                    return item;
                }
            }

            foreach (var item in vozaci.list)
            {
                if (korisnik.KorisnickoIme == item.KorisnickoIme)
                    return item;
            }

            return null;
        }
    }
}
