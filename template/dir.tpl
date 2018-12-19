
<!DOCTYPE html>
<html>
  <head>
    <title>{{title}}</title>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
    <style>
      body {
        margin: 30px;

      }
      a {
        display: block;
      }
    </style>
  </head>
  <body id="comments">
    {{#each files}}
    <a href="{{../dir}}/{{this}}">{{this}}</a>
    {{/each}}
  </body>
</html>
