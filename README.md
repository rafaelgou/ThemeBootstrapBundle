Theme Boostrap Bundle
=====================

A Twitter Bootstrap implementation for Symfony2

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

