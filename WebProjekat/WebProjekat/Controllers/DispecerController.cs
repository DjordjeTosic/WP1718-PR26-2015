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
    public class DispecerController : ApiController
    {
        [HttpPost]
        public bool Post([FromBody]Vozac v)
        {
            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;
            Korisnik user = HttpContext.Current.Session["user"] as Korisnik;
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }
            foreach (Vozac vozac in vozaci.list)
            {
                if (v.KorisnickoIme == vozac.KorisnickoIme)
                    return false;
            }

            v.Id = vozaci.list.Count;
            v.Uloga = Enums.Uloga.Vozac;
            //v.KorisnickoIme = v.KorisnickoIme;
            v.Zauzet = Enums.Zauzet.NE;
            v.Automobil.Broj = vozaci.list.Count.ToString();
            v.Ban = Enums.Banovan.NE;

            vozaci.list.Add(v);

            //string path = @"C:\Users\Coa\Desktop\NovaVerzija\WebAPI\WebAPI\App_Data\vozaci.txt";
            string path = "~/App_Data/vozaci.txt";
            path = HostingEnvironment.MapPath(path);

            string line = String.Empty;
            line = v.Id.ToString() + ':' + v.KorisnickoIme + ':' + v.Lozinka + ':' + v.Ime + ':' +
            v.Prezime + ':' + v.Pol + ':' + v.JMBG + ':' + v.KontaktTelefon + ':' + v.Email + ':' + v.Uloga +
            ':' + v.Lokacija.X.ToString() + ':' + v.Lokacija.Y.ToString() + ':' + v.Lokacija.Adresa.UlicaBroj + ':' + v.Lokacija.Adresa.NaseljenoMesto +
            ':' + v.Lokacija.Adresa.PozivniBrojMesta + ':'  + v.Automobil.Broj + ':'+ v.Automobil.Godiste + ':' + v.Automobil.Registracija 
             + ':' + v.Automobil.Tip + ':' + v.Zauzet + ':' + v.Ban + Environment.NewLine;

            if (!File.Exists(path))
            {
                File.WriteAllText(path, line);
            }
            else
            {
                File.AppendAllText(path, line);
            }

            Vozaci vozaci2 = new Vozaci(@"~/App_Data/Vozaci.txt");
            HttpContext.Current.Application["vozaci"] = vozaci2;

            return true;
        
        }

        [HttpPost]
        [Route("api/Dispecer/PostIzmena")]
        public bool PostIzmena([FromBody]Dispecer dispecer)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            Dispeceri users = (Dispeceri)HttpContext.Current.Application["dispeceri"];
            foreach (var item in users.list)
            {
                if (dispecer.KorisnickoIme == item.KorisnickoIme)
                {
                    item.Email = dispecer.Email;
                    item.Ime = dispecer.Ime;
                    item.JMBG = dispecer.JMBG;
                    item.KontaktTelefon = dispecer.KontaktTelefon;
                    item.Lozinka = dispecer.Lozinka;
                    item.Pol = dispecer.Pol;
                    item.Prezime = dispecer.Prezime;
                    item.Uloga = Enums.Uloga.Dispecer;


                    string path = "~/App_Data/Dispeceri.txt";
                    path = HostingEnvironment.MapPath(path);

                    string line = item.Id.ToString() + ':' + item.KorisnickoIme + ':' + item.Lozinka + ':' + item.Ime + ':'
                    + item.Prezime + ':' + item.Pol + ':' + item.JMBG + ':' + item.KontaktTelefon + ':'
                    + item.Email + ':' + item.Uloga + Environment.NewLine;


                    var file = File.Open(path, FileMode.Open);
                    file.Close();
                    string[] arrLine = File.ReadAllLines(path);
                    arrLine[item.Id] = line;
                    //File.WriteAllLines(path, arrLine);

                    //var file = File.Open(path)
                    //arrLine[item.Id] = Regex.Replace(arrLine[item.Id], @"^\s+$[\r\n]*", string.Empty, RegexOptions.Multiline);
                    File.WriteAllLines(path, arrLine);

                    file.Close();



                    Dispeceri dispeceri2 = new Dispeceri("~/App_Data/Dispeceri.txt");
                    HttpContext.Current.Application["dispeceri"] = dispeceri2;
                    return true;
                }


            }
            return false;

        }
    }
}
