<?php

namespace Theme\BootstrapBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:index.html.twig');
    }

    public function demoAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:demo.html.twig');
    }

    public function docsAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:docs.html.twig');
    }

    public function jqueryuiAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:jqueryui.html.twig');
    }

    public function xhtmlTestPageAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:xhtmlTestPage.html.twig');
    }

    public function formAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:form.html.twig');
    }

    public function listGridAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:listGrid.html.twig');
    }

    public function listStackedAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:listStacked.html.twig');
    }

}
