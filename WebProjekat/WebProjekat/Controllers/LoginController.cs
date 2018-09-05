using Projekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.SessionState;
using System.Web.Http;
using System.Web;

namespace Projekat.Controllers
{
    public class LoginController : ApiController
    {
        public bool Post([FromBody]Korisnik korisnik)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }
            
            if(user.KorisnickoIme == korisnik.KorisnickoIme)
            {
                return false;
            }

            Dispeceri dispeceri = (Dispeceri)HttpContext.Current.Application["dispeceri"];
            Korisnici korisnici = (Korisnici)HttpContext.Current.Application["korisnici"];
            Vozaci vozaci = (Vozaci)HttpContext.Current.Application["vozaci"];
            foreach (var item in dispeceri.list)
            {
                if (item.KorisnickoIme == korisnik.KorisnickoIme && item.Lozinka == korisnik.Lozinka)
                {
                    HttpContext.Current.Session["user"] = item as Dispecer;
                    return true;
                }
            }
            foreach (var item in korisnici.list)
            {
                if (item.KorisnickoIme == korisnik.KorisnickoIme && item.Lozinka == korisnik.Lozinka)
                {
                    if(item.Ban == Enums.Banovan.DA)
                    {
                        return false;
                    }
                    HttpContext.Current.Session["user"] = item as Korisnik;
                    return true;
                }
                
            }
            foreach (var item in vozaci.list)
            {
                if (item.KorisnickoIme == korisnik.KorisnickoIme && item.Lozinka == korisnik.Lozinka)
                {
                    if (item.Ban == Enums.Banovan.DA)
                    {
                        return false;
                    }
                    HttpContext.Current.Session["user"] = item as Vozac;
                    return true;
                }
            }
            return false;
        }

        public void Get()
        {
            HttpContext.Current.Session.Abandon();

            Korisnik user = new Korisnik();
            HttpContext.Current.Session["user"] = user;
        }
    }
}
