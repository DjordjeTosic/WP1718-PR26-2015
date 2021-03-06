﻿using Projekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace WebProjekat
{
    public class WebApiApplication : System.Web.HttpApplication
    {

        protected void Application_PostAuthorizeRequest()
        {
            System.Web.HttpContext.Current.SetSessionStateBehavior(System.Web.SessionState.SessionStateBehavior.Required);
        }
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            Dispeceri dispeceri = new Dispeceri("~/App_Data/Dispeceri.txt");
            HttpContext.Current.Application["dispeceri"] = dispeceri as Dispeceri;

            Korisnici korisnici = new Korisnici("~/App_Data/Korisnici.txt");
            HttpContext.Current.Application["korisnici"] = korisnici as Korisnici;

            Vozaci vozaci = new Vozaci("~/App_Data/Vozaci.txt");
            HttpContext.Current.Application["vozaci"] = vozaci as Vozaci;

            Voznje voznje = new Voznje("~/App_Data/Voznje.txt");
            HttpContext.Current.Application["voznje"] = voznje;

            Korisnik user = new Korisnik();
            HttpContext.Current.Application["user"] = user as Korisnik;
        }
    }
}
