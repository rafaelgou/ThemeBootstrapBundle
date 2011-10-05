<?php

namespace Theme\BootstrapBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class DefaultController extends Controller
{
    
    public function indexAction($name)
    {
        return $this->render('ThemeBootstrapBundle:Default:index.html.twig', array('name' => $name));
    }
}
