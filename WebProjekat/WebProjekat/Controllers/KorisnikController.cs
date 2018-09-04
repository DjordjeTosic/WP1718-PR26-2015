using Projekat.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Hosting;
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

        [HttpGet]
        [Route("api/Korisnik/GetKorisnik")]
        public List<Voznja> GetKorisnik()
        {
            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];
            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            foreach (Korisnik k in users.list)
            {
                if (user.KorisnickoIme != "" && user.KorisnickoIme != null && user.KorisnickoIme == k.KorisnickoIme)
                    return user.voznjeKorisnika;
            }

            return new List<Voznja>();
        }

        [HttpPost]
        public Korisnik Post([FromBody]Korisnik korisnik)
        {
            Dispeceri dispeceri = (Dispeceri)HttpContext.Current.Application["dispeceri"];
            Korisnici users = (Korisnici)HttpContext.Current.Application["korisnici"];
            Vozaci vozaci = (Vozaci)HttpContext.Current.Application["vozaci"];
            Voznje voznje = (Voznje)HttpContext.Current.Application["voznje"];

            List<Voznja> search = HttpContext.Current.Session["search"] as List<Voznja>;

            if (search == null)
            {
                search = new List<Voznja>();
                HttpContext.Current.Session["search"] = search;
            }

            List<Korisnik> searchUsers = HttpContext.Current.Session["searchUsers"] as List<Korisnik>;

            if (searchUsers == null)
            {
                searchUsers = new List<Korisnik>();
                HttpContext.Current.Session["searchUsers"] = searchUsers;
            }

            //*****************************************************************************************************************

            foreach (Korisnik k in users.list)
            {
                if (k.KorisnickoIme == korisnik.KorisnickoIme)
                {
                    HttpContext.Current.Session["search"] = k.voznjeKorisnika;
                }
            }


            foreach (Dispecer d in dispeceri.list)
            {
                if (d.KorisnickoIme == korisnik.KorisnickoIme)
                {
                    List<Voznja> retVal = new List<Voznja>();

                    foreach (Voznja v in voznje.list)
                        retVal.Add(v);

                    HttpContext.Current.Session["search"] = retVal;
                }
            }


            foreach (Vozac v in vozaci.list)
            {
                if (v.KorisnickoIme == korisnik.KorisnickoIme)
                {
                    List<Voznja> retVal = new List<Voznja>();
                    
                    retVal = v.voznjeKorisnika;
                    
                    
                    foreach (Voznja ride in voznje.list)
                    {
                        if (ride.StatusVoznje == Enums.StatusVoznje.Kreirana)
                        {
                            retVal.Add(ride);
                        }
                    }

                    HttpContext.Current.Session["search"] = retVal;
                }
            }

            foreach (Dispecer d in dispeceri.list)
            {
                if (d.KorisnickoIme == korisnik.KorisnickoIme)
                {
                    List<Korisnik> retVal = new List<Korisnik>();
                    foreach (Korisnik k in users.list)
                    {
                        retVal.Add(k);
                    }
                    foreach (Vozac v in vozaci.list)
                    {
                        retVal.Add(v);
                    }

                    HttpContext.Current.Session["searchUsers"] = retVal;
                }
            }


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


        [HttpPost]
        [Route("api/Korisnik/PostIzmena")]
        public bool PostIzmena([FromBody]Korisnik korisnik)
        {

            Korisnici users = (Korisnici)HttpContext.Current.Application["korisnici"];
            foreach (var item in users.list)
            {
                if (korisnik.KorisnickoIme == item.KorisnickoIme)
                {
                    item.Email = korisnik.Email;
                    item.Ime = korisnik.Ime;
                    item.JMBG = korisnik.JMBG;
                    item.KontaktTelefon = korisnik.KontaktTelefon;
                    item.Lozinka = korisnik.Lozinka;
                    item.Pol = korisnik.Pol;
                    item.Prezime = korisnik.Prezime;
                    item.Uloga = Enums.Uloga.Musterija;


                    string path = "~/App_Data/Korisnici.txt";
                    path = HostingEnvironment.MapPath(path);

                    string line = item.Id.ToString() + ':' + item.KorisnickoIme + ':' + item.Lozinka + ':' + item.Ime + ':'
                    + item.Prezime + ':' + item.Pol + ':' + item.JMBG + ':' + item.KontaktTelefon + ':'
                    + item.Email + ':' + item.Uloga + ':' +  item.Ban;


                    var file = File.Open(path, FileMode.Open);
                    file.Close();
                    string[] arrLine = File.ReadAllLines(path);
                    arrLine[item.Id] = line;
                    //File.WriteAllLines(path, arrLine);

                    //var file = File.Open(path)
                    //arrLine[item.Id] = Regex.Replace(arrLine[item.Id], @"^\s+$[\r\n]*", string.Empty, RegexOptions.Multiline);
                    File.WriteAllLines(path, arrLine);

                    file.Close();
                    


                    Korisnici korisnici2 = new Korisnici("~/App_Data/Korisnici.txt");
                    HttpContext.Current.Application["korisnici"] = korisnici2;
                    return true;
                }


            }
            return false;

        }
        [HttpPost]
        [Route("api/Korisnik/PostKomentar")]
        public bool PostKomentar([FromBody]Komentar komentar)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;

            foreach (Korisnik korisnik in users.list)
            {
                if (korisnik.KorisnickoIme == user.KorisnickoIme)
                {
                    foreach (Voznja ride in user.voznjeKorisnika)
                    {
                        if (ride.Komentar.Id == komentar.Id)
                        {
                            ride.Komentar.Id = komentar.Id;
                            ride.Komentar.DatumObjave = DateTime.UtcNow.ToString();
                            ride.Komentar.idKorisnik = user.KorisnickoIme;
                            ride.Komentar.Ocena = komentar.Ocena;
                            ride.Komentar.Opis = komentar.Opis;

                            string path = "~/App_Data/Voznje.txt";
                            path = HostingEnvironment.MapPath(path);

                            string line = String.Empty;

                            line = ride.Id.ToString() + '|' + ride.DatumVreme.ToString() + '|' + ride.Lokacija.X + '|' + ride.Lokacija.Y + '|' +
                                ride.Lokacija.Adresa.UlicaBroj + '|' + ride.Lokacija.Adresa.NaseljenoMesto + '|' + ride.Lokacija.Adresa.PozivniBrojMesta + '|' + ride.Automobil + '|' +
                                ride.idKorisnik + '|' + ride.Odrediste.X + '|' + ride.Odrediste.Y + '|' + ride.Odrediste.Adresa.UlicaBroj + '|' + ride.Odrediste.Adresa.NaseljenoMesto + '|' + ride.Odrediste.Adresa.PozivniBrojMesta + '|' +
                                ride.idDispecer + '|' + ride.idVozac + '|' + ride.Iznos + '|' + ride.Komentar.Opis + '|' + ride.Komentar.DatumObjave + '|' + ride.Komentar.idKorisnik + '|' + ride.Komentar.idVoznja + '|' +
                                ride.Komentar.Ocena + '|' + ride.StatusVoznje;

                            string[] arrLine = File.ReadAllLines(path);
                            arrLine[ride.Id] = line;
                            File.WriteAllLines(path, arrLine);

                            foreach (Korisnik kor in users.list)
                            {
                                if (kor.KorisnickoIme == ride.idKorisnik)
                                {
                                    foreach (Voznja voznja in kor.voznjeKorisnika)
                                    {
                                        if (voznja.Id == ride.Id)
                                        {
                                            voznja.Komentar = ride.Komentar;
                                        }
                                    }
                                }
                            }

                            Voznje voznje2 = new Voznje("~/App_Data/Voznje.txt");
                            HttpContext.Current.Application["voznje"] = voznje2;

                            HttpContext.Current.Application["korisnici"] = users;

                            return true;
                        }
                    }
                }
            }

            return false;
        }
        [HttpDelete]
        public bool Delete(string id)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;

            foreach (Voznja ride in user.voznjeKorisnika)
            {
                if (ride.StatusVoznje == Enums.StatusVoznje.Kreirana && ride.Id.ToString() == id)
                {
                    ride.StatusVoznje = Enums.StatusVoznje.Otkazana;

                    
                    string path = "~/App_Data/Voznje.txt";
                    path = HostingEnvironment.MapPath(path);

                    string line = String.Empty;

                    line = ride.Id.ToString() + '|' + ride.DatumVreme.ToString() + '|' + ride.Lokacija.X + '|' + ride.Lokacija.Y + '|' +
                                ride.Lokacija.Adresa.UlicaBroj + '|' + ride.Lokacija.Adresa.NaseljenoMesto + '|' + ride.Lokacija.Adresa.PozivniBrojMesta + '|' + ride.Automobil + '|' +
                                ride.idKorisnik + '|' + ride.Odrediste.X + '|' + ride.Odrediste.Y + '|' + ride.Odrediste.Adresa.UlicaBroj + '|' + ride.Odrediste.Adresa.NaseljenoMesto + '|' + ride.Odrediste.Adresa.PozivniBrojMesta + '|' +
                                ride.idDispecer + '|' + ride.idVozac + '|' + ride.Iznos + '|' + ride.Komentar.Opis + '|' + ride.Komentar.DatumObjave + '|' + ride.Komentar.idKorisnik + '|' + ride.Komentar.idVoznja + '|' +
                                ride.Komentar.Ocena + '|' + ride.StatusVoznje;

                    string[] arrLine = File.ReadAllLines(path);
                    arrLine[ride.Id] = line;
                    File.WriteAllLines(path, arrLine);
                    //File.WriteAllLines(path, File.ReadAllLines(path).Where(l => !string.IsNullOrWhiteSpace(l)));

                }
            }

            Voznje voznje2 = new Voznje("~/App_Data/Voznje.txt");
            HttpContext.Current.Application["voznje"] = voznje2;

            return true;
        }

        [HttpPost]
        [Route("api/Korisnik/PostVoznja")]
        public bool PostVoznja([FromBody]Voznja v)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }


            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;

            if (user.Uloga == Enums.Uloga.Musterija)
            {
                
                v.DatumVreme = DateTime.UtcNow;
                v.Id = voznje.list.Count;
                v.idDispecer = "";
                Adresa a = new Adresa();
                a.NaseljenoMesto = "";
                a.PozivniBrojMesta = "";
                a.UlicaBroj = "";
                Lokacija l = new Lokacija();
                l.X = 0.0;
                l.Y = 0.0;
                l.Adresa = a;
                v.Odrediste = l;

                Komentar k = new Komentar();
                k.DatumObjave = "";
                k.Id = 0;
                k.idKorisnik = "";
                k.idVoznja = "";
                k.Ocena = "";
                k.Opis = "";
                v.Ocena = 0;
                v.Komentar = k;
                //v.Komentar.Id = 0;
                //v.Komentar.DatumObjave = "";
                //v.Komentar.idKorisnik = "";
                //v.Komentar.idVoznja = "";
                //v.Komentar.Ocena = "";
                //v.Komentar.Opis = "";
                v.Iznos = 0;
                
                v.idVozac = "";
                v.idKorisnik = user.KorisnickoIme;
                v.StatusVoznje = Enums.StatusVoznje.Kreirana;



                //user.voznjeKorisnika.Add(v);
                voznje.list.Add(v);
                users.list[user.Id].voznjeKorisnika.Add(v);


                //string path = @"C:\Users\Coa\Desktop\NovaVerzija\WebAPI\WebAPI\App_Data\voznje.txt";
                string path = "~/App_Data/Voznje.txt";
                path = HostingEnvironment.MapPath(path);


                string line = String.Empty;
                line = v.Id.ToString() + '|' + v.DatumVreme.ToString() + '|' + v.Lokacija.X + '|' + v.Lokacija.Y + '|' +
                v.Lokacija.Adresa.UlicaBroj + '|' + v.Lokacija.Adresa.NaseljenoMesto + '|' + v.Lokacija.Adresa.PozivniBrojMesta + '|' + v.Automobil + '|' +
                v.idKorisnik + '|' + v.Odrediste.X + '|' + v.Odrediste.Y + '|' + v.Odrediste.Adresa.UlicaBroj + '|' + v.Odrediste.Adresa.NaseljenoMesto + '|' + v.Odrediste.Adresa.PozivniBrojMesta + '|' +
                v.idDispecer + '|' + v.idVozac + '|' + v.Iznos.ToString() + '|' + v.Komentar.Opis + '|' + v.Komentar.DatumObjave + '|' + v.Komentar.idKorisnik + '|' + v.Komentar.idVoznja + '|' +
                v.Komentar.Ocena + '|' + v.StatusVoznje + Environment.NewLine;

                if (!File.Exists(path))
                {
                    File.WriteAllText(path, line);
                }
                else
                {
                    File.AppendAllText(path, line);
                }

                Voznje voznje2 = new Voznje("~/App_Data/Voznje.txt");
                HttpContext.Current.Application["voznje"] = voznje2;
                //Korisnici korisnici2 = new Korisnici(@"~/App_Data/korisnici.txt");
                HttpContext.Current.Application["korisnici"] = users;

                return true;
            }

            return false;

        }

        [HttpPut]
        public bool Put(string id, [FromBody] Voznja v)
        {
            Korisnik user = (Korisnik)HttpContext.Current.Session["user"];

            if (user == null)
            {
                user = new Korisnik();
                HttpContext.Current.Session["user"] = user;
            }

            Korisnici users = HttpContext.Current.Application["korisnici"] as Korisnici;
            Voznje voznje = HttpContext.Current.Application["voznje"] as Voznje;

            foreach (Korisnik korisnik in users.list)
            {
                if (korisnik.KorisnickoIme == user.KorisnickoIme)
                {
                    foreach (Voznja ride in korisnik.voznjeKorisnika)
                    {
                        if (ride.StatusVoznje == Enums.StatusVoznje.Kreirana && ride.Id.ToString() == id)
                        {
                            ride.Id = Int32.Parse(id);
                            ride.DatumVreme = DateTime.UtcNow;
                            ride.idKorisnik = user.KorisnickoIme;
                            ride.Komentar = new Komentar();
                            ride.Komentar.Opis = "";
                            ride.Komentar.idKorisnik = "";
                            ride.Odrediste.X = 0;
                            ride.Odrediste = new Lokacija();
                            ride.Odrediste.Y = 0.0;
                            ride.Odrediste.Adresa = new Adresa();
                            ride.Odrediste.Adresa.NaseljenoMesto = "";
                            ride.Odrediste.Adresa.PozivniBrojMesta = "";
                            ride.Odrediste.Adresa.UlicaBroj = "";
                            ride.Lokacija.X = v.Lokacija.X;
                            ride.Lokacija.Y = v.Lokacija.Y;
                            ride.Lokacija.Adresa.NaseljenoMesto = v.Lokacija.Adresa.NaseljenoMesto;
                            ride.Lokacija.Adresa.PozivniBrojMesta = v.Lokacija.Adresa.PozivniBrojMesta;
                            ride.Lokacija.Adresa.UlicaBroj = v.Lokacija.Adresa.UlicaBroj;


                            //user.voznjeKorisnika[v.Id] = ride;
                            
                            string path = "~/App_Data/Voznje.txt";
                            path = HostingEnvironment.MapPath(path);
                            string line = String.Empty;

                            line = ride.Id.ToString() + '|' + ride.DatumVreme.ToString() + '|' + ride.Lokacija.X + '|' + ride.Lokacija.Y + '|' +
                                ride.Lokacija.Adresa.UlicaBroj + '|' + ride.Lokacija.Adresa.NaseljenoMesto + '|' + ride.Lokacija.Adresa.PozivniBrojMesta + '|' + ride.Automobil + '|' +
                                ride.idKorisnik + '|' + ride.Odrediste.X + '|' + ride.Odrediste.Y + '|' + ride.Odrediste.Adresa.UlicaBroj + '|' + ride.Odrediste.Adresa.NaseljenoMesto + '|' + ride.Odrediste.Adresa.PozivniBrojMesta + '|' +
                                ride.idDispecer + '|' + ride.idVozac + '|' + ride.Iznos + '|' + ride.Komentar.Opis + '|' + ride.Komentar.DatumObjave + '|' + ride.Komentar.idKorisnik + '|' + ride.Komentar.idVoznja + '|' +
                                ride.Komentar.Ocena + '|' + ride.StatusVoznje;

                            string[] arrLine = File.ReadAllLines(path);
                            arrLine[ride.Id] = line;
                            File.WriteAllLines(path, arrLine);
                            //File.WriteAllLines(path, File.ReadAllLines(path).Where(l => !string.IsNullOrWhiteSpace(l)));

                            Voznje voznje2 = new Voznje("~/App_Data/Voznje.txt");
                            HttpContext.Current.Application["voznje"] = voznje2;
                            Korisnici korisnici2 = new Korisnici(@"~/App_Data/Korisnici.txt");
                            HttpContext.Current.Application["korisnici"] = korisnici2;

                            return true;
                        }
                    }
                }

                
            }

            return false;
        }
    }
}
