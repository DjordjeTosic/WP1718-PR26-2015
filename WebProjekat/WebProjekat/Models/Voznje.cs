using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace Projekat.Models
{
    public class Voznje
    {
        public List<Voznja> list { get; set; }

        public Voznje(string path)
        {
            Korisnici korisnici = HttpContext.Current.Application["korisnici"] as Korisnici;
            Vozaci vozaci = HttpContext.Current.Application["vozaci"] as Vozaci;
            Dispeceri dispeceri = HttpContext.Current.Application["dispeceri"] as Dispeceri;

            foreach (Korisnik k in korisnici.list)
                k.voznjeKorisnika = new List<Voznja>();
            foreach (Dispecer k in dispeceri.list)
                k.voznjeKorisnika = new List<Voznja>();
            foreach (Vozac k in vozaci.list)
                k.voznjeKorisnika = new List<Voznja>();


            path = HostingEnvironment.MapPath(path);
            list = new List< Voznja>();
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamReader sr = new StreamReader(stream);
            string line = "";
            while ((line = sr.ReadLine()) != null)
            {
                string[] tokens = line.Split('|');
                Voznja p = new Voznja(Int32.Parse(tokens[0]), tokens[1], double.Parse(tokens[2]), double.Parse(tokens[3]), tokens[4], tokens[5], tokens[6], tokens[7], tokens[8],
                    double.Parse(tokens[9]), double.Parse(tokens[10]), tokens[11], tokens[12], tokens[13], tokens[14], tokens[15],
                    double.Parse(tokens[16]), tokens[17], tokens[18], tokens[19], tokens[20], tokens[21], tokens[22]);
                //p.Id = list.Count.ToString();
                list.Add(p);

                foreach (Korisnik k in korisnici.list)
                {
                    if (k.KorisnickoIme == tokens[8])
                    {
                        k.voznjeKorisnika.Add(p);
                    }
                }

                //tokens[15]
                foreach (Vozac vozac in vozaci.list)
                {
                    if (tokens[15] == vozac.KorisnickoIme)
                    {
                        vozac.voznjeKorisnika.Add(p);
                    }
                }

                //tokens[14]
                foreach (Dispecer dispecer in dispeceri.list)
                {
                    if (tokens[14] == dispecer.KorisnickoIme)
                    {
                        dispecer.voznjeKorisnika.Add(p);
                    }
                }

            }
            sr.Close();
            stream.Close();
        }
    }
}