<?php

namespace Theme\BootstrapBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class DefaultController extends Controller
{

    public function indexAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:index.html.twig');
    }

    public function overviewAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:overview.html.twig');
    }

    public function scafoldingAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:scafolding.html.twig');
    }

    public function basecssAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:basecss.html.twig');
    }

    public function componentsAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:components.html.twig');
    }

    public function javascriptAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:javascript.html.twig');
    }

    public function lessAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:less.html.twig');
    }

    public function examplesAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:examples.html.twig');
    }

    public function customizeAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:customize.html.twig');
    }

    public function jqueryuiFullAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:jqueryuiFull.html.twig');
    }

    public function jqueryuiMinimalAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:jqueryuiMinimal.html.twig');
    }

    public function xhtmlTestPageAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:xhtmlTestPage.html.twig');
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
            'notice'  => 'Maybe you could be in trouble, but not yet. You\'re warned.',
            'error'   => 'Something really bad happens',
            'success' => 'Well done! Everything seems to be all right',
            'info'    => 'Just an information for you, stay cool and pay atention',
        );
        $flashKeys   = array_keys($flashes);
        $flashRandom = $flashKeys[rand(0, 3)];
        $this->get('session')->setFlash($flashRandom, $flashes[$flashRandom]);
    }

    public function formAction()
    {
        $this->setflashDemo();
        return $this->render('ThemeBootstrapBundle:Default:form.html.twig');
    }

    public function examplesHeroAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:examplesHero.html.twig');
    }

    public function examplesFluidAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:examplesFluid.html.twig');
    }

    public function examplesStarterAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:examplesStarter.html.twig');
    }

    public function jqchosenAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:jqchosen.html.twig');
    }

    public function datatablesAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:datatables.html.twig');
    }

    public function cleditorAction()
    {
        return $this->render('ThemeBootstrapBundle:Default:cleditor.html.twig');
    }

}
