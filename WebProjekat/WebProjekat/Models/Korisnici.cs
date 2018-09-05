using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;

namespace Projekat.Models
{
    public class Korisnici
    {
        public List<Korisnik> list { get; set; }

        public Korisnici(string path)
        {

            //var file = File.Open(path, FileMode.Open);
            path = HostingEnvironment.MapPath(path);
            list = new List<Korisnik>();
            FileStream stream = new FileStream(path, FileMode.Open);
            StreamReader sr = new StreamReader(stream);
            string line = "";
            while ((line = sr.ReadLine()) != null)
            {
                if(line=="" || line == null)
                {
                    break;
                }
                string[] tokens = line.Split(':');
                Korisnik p = new Korisnik(Int32.Parse(tokens[0]), tokens[1], tokens[2], tokens[3], tokens[4], tokens[5], tokens[6], tokens[7], tokens[8], tokens[9],tokens[10]);
                //p.Id = list.Count.ToString();
                list.Add(p);
            }
            sr.Close();
            stream.Close();
            //file.Close();
        }
    }
}