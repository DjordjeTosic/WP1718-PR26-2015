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
    public class BanController : ApiController
    {
        [HttpPut]
        [Route("api/ban/putban")]
        public bool PutBan([FromBody] Korisnik k)
        {
            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            foreach (Korisnik korisnik in users.list)
            {
                if (korisnik.KorisnickoIme == k.KorisnickoIme)
                {
                    if (korisnik.Ban == Enums.Banovan.NE || korisnik.Ban == Enums.Banovan.IGNORE)
                    {
                        korisnik.Ban = Enums.Banovan.DA;
                        string path = "~/App_Data/Korisnici.txt";
                        path = HostingEnvironment.MapPath(path);

                        string line = String.Empty;
                        line = korisnik.Id.ToString() + ':' + korisnik.KorisnickoIme + ':' + korisnik.Lozinka + ':' + korisnik.Ime + ':'
                                + korisnik.Prezime + ':' + korisnik.Pol + ':' + korisnik.JMBG + ':' + korisnik.KontaktTelefon + ':'
                                + korisnik.Email + ':' + korisnik.Uloga + ':' + korisnik.Ban;


                        string[] arrLine = File.ReadAllLines(path);
                        arrLine[korisnik.Id] = line;
                        File.WriteAllLines(path, arrLine);
                        //File.WriteAllLines(path, File.ReadAllLines(path).Where(l => !string.IsNullOrWhiteSpace(l)));

                        users = new Korisnici(@"~/App_Data/Korisnici.txt");
                        HttpContext.Current.Application["korisnici"] = users;

                        return true;
                    }
                }
            }

            return false;
        }


        [HttpPut]
        [Route("api/ban/putunban")]
        public bool PutUnban([FromBody] Korisnik k)
        {
            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            foreach (Korisnik korisnik in users.list)
            {
                if (korisnik.KorisnickoIme == k.KorisnickoIme)
                {
                    if (korisnik.Ban == Enums.Banovan.DA || korisnik.Ban == Enums.Banovan.IGNORE)
                    {
                        korisnik.Ban = Enums.Banovan.NE;
                        string path = "~/App_Data/Korisnici.txt";
                        path = HostingEnvironment.MapPath(path);

                        string line = String.Empty;
                        line = korisnik.Id.ToString() + ':' + korisnik.KorisnickoIme + ':' + korisnik.Lozinka + ':' + korisnik.Ime + ':'
                                + korisnik.Prezime + ':' + korisnik.Pol + ':' + korisnik.JMBG + ':' + korisnik.KontaktTelefon + ':'
                                + korisnik.Email + ':' + korisnik.Uloga + ':' + korisnik.Ban;


                        string[] arrLine = File.ReadAllLines(path);
                        arrLine[korisnik.Id] = line;
                        File.WriteAllLines(path, arrLine);
                        //File.WriteAllLines(path, File.ReadAllLines(path).Where(l => !string.IsNullOrWhiteSpace(l)));

                        users = new Korisnici(@"~/App_Data/Korisnici.txt");
                        HttpContext.Current.Application["korisnici"] = users;

                        return true;
                    }
                }
            }

            return false;
        }
    }
}
