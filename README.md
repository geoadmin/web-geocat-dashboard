# geocat dashboard
Dashboard to show geocat.ch stats and KPI

[Dashboard](https://geoadmin.github.io/web-geocat-dashboard/)

## Set up development environment
To test the dashboard locally, you need an http server running (to be able to make http call from `javascript`). You can use the following python package inside the project root directory.

at swisstopo (using powershell)
```
& "C:\Program Files\ArcGIS\Pro\bin\Python\envs\arcgispro-py3\python" -m http.server 8000
```
Then visit http://localhost:8000