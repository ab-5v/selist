You can download test styles from you favorite website
```
[].slice.apply(document.querySelectorAll('link[rel=stylesheet]')).map(a=>'wget ' + a.href).join(' && ')
```
