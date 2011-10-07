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
        $this->setflashDemo();
        return $this->render('ThemeBootstrapBundle:Default:form.html.twig');
    }

    public function listGridAction()
    {
        $this->setflashDemo();
        return $this->render('ThemeBootstrapBundle:Default:listGrid.html.twig');
    }

    public function listStackedAction()
    {
        $this->setflashDemo();
        return $this->render('ThemeBootstrapBundle:Default:listStacked.html.twig');
    }

    protected function setflashDemo()
    {
        $flashes = array(
            'notice'  => 'Maybe you could be in trouble, but yet. You\'re warned.',
            'error'   => 'Something really bad happens',
            'success' => 'Well done! Everything seems to be all right',
            'info'    => 'Just an information for you, stay cool and pay atention',
        );
        $flashKeys   = array_keys($flashes);
        $flashRandom = $flashKeys[rand(0, 3)];
        $this->get('session')->setFlash($flashRandom, $flashes[$flashRandom]);
    }

}
