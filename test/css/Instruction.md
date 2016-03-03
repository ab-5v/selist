Just fill this folder with css files and run `npm test`. You can download those from you favorite website:

```
[].slice.apply(document.querySelectorAll('link[rel=stylesheet]')).map(a=>'wget ' + a.href).join(' && ')
```
