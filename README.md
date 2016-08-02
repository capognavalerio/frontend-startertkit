FSK - Frontend starter kit
=========

FSK is a Frontend starterkit to help you getting started with a new HTML5 project in few minutes.

BOWER
-----

The bower file is very minimal and contains default dependencies for a website project.

```
    bower install
```

GRUNT
-----
Before to use grunt you need to install all packages that are defined in package.json file to run all tasks defined into Gruntfile.js
```
    npm update --save
```
After that you have to launch the default grunt task to create minify vendors and project css and js files.
```
    grunt default
```
Remember to launch the watch task
```
    grunt watch
```
before to start coding.

LESS Atomic design
------------------

Take a look to https://github.com/capognavalerio/atomic-less

MODERNIZR
---------
Take a look to https://github.com/Modernizr/customiz for configuration.
Modernizr has a lot of tests. The best practice is to create own configuration using the modernizr builder https://modernizr.com/download?setclasses. Choose what you need and download the configuration file that you will integrate in grunt file.
Actually FSK has tests for a website project.

FONTAWESOME
-----------
Include Font Awesome in FSK. It gives you scalable vector icons that can instantly be customized — size, color, drop shadow, and anything that can be done with the power of CSS.

TWITTER BOOTSTRAP
-----------
FSK include twitter bootstrap with his atomic components. You can be more rapid to develop your website.
