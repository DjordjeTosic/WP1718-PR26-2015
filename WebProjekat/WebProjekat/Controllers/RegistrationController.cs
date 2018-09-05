using Projekat.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;

namespace WebProjekat.Controllers
{
    public class RegistrationController : ApiController
    {
        [HttpGet]
        public IEnumerable<Korisnik> GetRegistred()
        {
            Korisnici korisnici = HttpContext.Current.Application["korisnici"] as Korisnici;

            return korisnici.list;
        }


        [HttpPost]
        public bool Post([FromBody] Korisnik korisnik)
        {
            Korisnici korisnici = HttpContext.Current.Application["korisnici"] as Korisnici;
            foreach(Korisnik k in korisnici.list)
            {
                if (k.KorisnickoIme.Equals(korisnik.KorisnickoIme))
                    return false;
            }

            korisnik.Id = korisnici.list.Count;
            korisnici.list.Add(korisnik);

            string path = "~/App_Data/Korisnici.txt";
            path = HostingEnvironment.MapPath(path);

            string line = String.Empty;
            line = korisnik.Id.ToString() + ':' + korisnik.KorisnickoIme + ':' + korisnik.Lozinka + ':' + korisnik.Ime + ':'
                + korisnik.Prezime + ':' + korisnik.Pol + ':' + korisnik.JMBG + ':' + korisnik.KontaktTelefon + ':'
                + korisnik.Email + ':' + korisnik.Uloga + ':' + korisnik.Ban + Environment.NewLine; 
            if(!File.Exists(path))
            {
                File.WriteAllText(path, line);
            }
            else
            {
                File.AppendAllText(path, line);
            }

            korisnici = new Korisnici(@"~/App_Data/Korisnici.txt");

            HttpContext.Current.Application["korisnici"] = korisnici;
            return true;


        }
    }
}
