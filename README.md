Theme Boostrap Bundle
=====================

A Twitter Bootstrap implementation for Symfony2, with some usefull jQuery plugins
also include.

With this bundle you have:

- [jQuery](http://jquery.org/) 1.7.2
- [jQuery UI](http://jqueryui.com/) full 1.8.21
- [jQuery UI](http://jqueryui.com/) minimal 1.8.21 for bootstrap with datepicker, autocomplete and slider(this last for timepicker plugin only)
- [jQuery UI autocomplete extensions](http://github.com/scottgonzalez/jquery-ui-extensions)
- jQuery UI timepicker plugin](http://trentrichardson.com/examples/timepicker/)
- [bootstrap-bootbox](http://bootboxjs.com/)
- [chosen](http://harvesthq.github.com/chosen/)
- [cleditor](http://premiumsoftware.net/cleditor/)
- [datatables](http://datatables.net/) (with bootstrap theme)
- [loadmask](http://code.google.com/p/jquery-loadmask/)
- [treeview](http://docs.jquery.com/Plugins/Treeview)
- [validation](http://docs.jquery.com/Plugins/Validation)
- [bootstrap JS plugins](http://twitter.github.com/bootstrap/javascript.html)

## Install

### deps

    [ThemeBootstrapBundle]
        git=git://github.com/rafaelgou/ThemeBootstrapBundle.git
        target=bundles/Theme/BootstrapBundle

(add to deps file and run `./bin/vendors install`)

### AppKernel

      //...

      new Theme\BootstrapBundle\ThemeBootstrapBundle(),

      //...


### autoload

      //...

      'Theme'              => __DIR__.'/../vendor/bundles',

      //...

### Routing (for demo pages)

On *app/config/routing_dev.yml* (recommended, only in dev enviroment) or *app/config/routing.yml*

    ThemeBootstrapBundle:
        resource: "@ThemeBootstrapBundle/Resources/config/routing.yml"
        prefix:   /themebootstrap

### Instaling Assets

    app/console assets:install web

or, if you want to symlink the assets

    app/console assets:install web --symlink

## Testing

Go to http://yourdomain.com/themeboostrap and enjoy!

## Basic Usage

In any template you want extend the main layout. The basic usage is:

    {# This uses the theme, ou for fluid: layout-fluid.html.twig #}
    {% extends ThemeBootstrapBundle::layout.html.twig %}

    {# Override the browser title #}
    {% block title %}Page Title - in browser's window{% endblock %}

    {# Any extra stylesheet you to put inside 'head' html tag #}
    {% block add_stylesheet %}
            <link rel="stylesheet" href="{{ asset('bundles/blabla/css/main.css') }}" type="text/css" media="screen" />
    {% endblock %}

    {# Any extra stylesheet you to put inside 'head' html tag #}
    {% block add_javascript %}
            <script type="text/javascript" src="{{ asset('bundles/blabla/js/scrtipt.js') }}"></script>
    {% endblock %}

    {# The content #}
    {% block content %}
        <h1>My Content</h1>

    {% endblock %}

## Advanced Usage

### Using your own layout

Copy *Resources/views/layout.html.twig* or *Resources/views/layout-fluid.html.twig*
to your bundle as a start, and extend your templates from it.

it looks like below:

    <!DOCTYPE html>
    <html>

        <head>
            <title>{% block title %}{% endblock %}Your Demo App</title>

            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" />

            <!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
            <!--[if lt IE 9]>
              <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
            <![endif]-->

    {% include 'ThemeBootstrapBundle::_assets_full.html.twig' %}

    {% block add_stylesheet %}{% endblock %}
    {% block add_javascript %}{% endblock %}

        </head>

      <body>

        <div id="loading" style="display:none">Loading...</div>

    {% include 'ThemeBootstrapBundle::_nav.html.twig' %}

        <div id="main_container" class="container">

            <header>
    {% include 'ThemeBootstrapBundle::_flashes.html.twig' %}
            </header>

    {% block content %}{% endblock %}

    {% include "ThemeBootstrapBundle::_footer.html.twig" %}

        </div>

        <div id="dialog_form"></div>

      </body>
    </html>

The most important customization is to override de includes. You'd like to do that
with *nav* and *footer* to your application needs. In case you have a bundle called
"MyOwnBundle", do the changes:

    (...)
    {% include 'MyOwnBundle::_nav.html.twig' %}
    (...)
    {% include "MyOwnBundle::_footer.html.twig" %}
    (...)

So copy *Resources/views/_nav.html.twig* and *Resources/views/_footer.html.twig*
to your bundle, and change as you need.

### Using assetic

In production you'd like to use assetic for combined and minized JS and CSS assets.

Just copy *Resources/views/layout.html.twig* or *Resources/views/layout-fluid.html.twig*
to your bundle and change the assets includes from :

    {% include 'ThemeBootstrapBundle::_assets_full.html.twig' %}

to

    {% include 'ThemeBootstrapBundle::_assets_assetic.html.twig' %}

Now you're able to compile the assets from the symfony project directory:

    app/console assetic:dump --env=prod

### Customizing what javascripts/stylesheets you want to load

Just copy *Resources/views/_assets_full.html.twig* or *Resources/views/_assets_assetic.html.twig*
to your bundle and point in your layout the assets to this location, as below:

    {% include 'MyOwnBundle::_assets_full.html.twig' %}

or

    {% include 'MyOwnBundle::_assets_assetic.html.twig' %}

Then you can customize javascripts and stylesheets to load individualy.
Pay attention in the order of javascripts loading.

### Using full jQuery UI

Customize as explained on the before topic and alter the jQueryUI file from:

    (...)
    <link rel="stylesheet" href="{{ asset('bundles/themebootstrap/js/jquery-ui-minimal/css/bootstrap-minimal/jquery-ui-1.8.21.custom.css') }}" type="text/css" media="screen" />
    (...)
    <script type="text/javascript" src="{{ asset('bundles/themebootstrap/js/jquery-ui-minimal/js/jquery-ui-1.8.21.custom.min.js') }}"></script>
    (...)

to

    (...)
    <link rel="stylesheet" href="{{ asset('bundles/themebootstrap/js/jquery-ui-full/css/bootstrap/jquery-ui-1.8.21.custom.css') }}" type="text/css" media="screen" />
    (...)
    <script type="text/javascript" src="{{ asset('bundles/themebootstrap/js/jquery-ui-full/js/jquery-ui-1.8.21.custom.min.js') }}"></script>
    (...)

Pay attention at comments ending on twig!

### Using jQuery and jQueryUI CDN sources

Just like the same, just change jQuery and jQueryUI lines to your prefered CDN. From:

    (...)
    <link rel="stylesheet" href="{{ asset('bundles/themebootstrap/js/jquery-ui-minimal/css/bootstrap-minimal/jquery-ui-1.8.21.custom.css') }}" type="text/css" media="screen" />
    (...)
    <script type="text/javascript" src="{{ asset('bundles/themebootstrap/js/jquery-ui-minimal/js/jquery-ui-1.8.21.custom.min.js') }}"></script>
    (...)

to

    (...)
    <link rel="stylesheet" href="{{ asset('bundles/themebootstrap/js/jquery-ui-full/css/bootstrap/jquery-ui-1.8.21.custom.css') }}" type="text/css" media="screen" />
    (...)
    <script src=”http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js”></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js"></script>
    (...)
