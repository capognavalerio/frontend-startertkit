FSK - Frontend starter kit
=========

FSK is a Frontend starterkit to help you getting started with a new HTML5 project in few minutes.

BOWER
-----

The bower file contains a great collection of js plugin and less utils that can help you to develope your project.
Include in dependencies array what do you need and launch

```
    bower install
```

GRUNT
-----
Before to use grunt you need to install pkgs to run all tasks.
```
    npm update --save
```
Take a look to default grunt file and change it if you need. After that you can launch your default task.
```
    grunt default
```
Remember to launch
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
