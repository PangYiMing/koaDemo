const { Client } = require('pg');
const formatDate = require('./formatDate');

const client = new Client({
  user: 'postgres',
  //   host: 'localhost',
  database: 'postgres',
  password: 'P23Qas..',
  port: 5432
});

/**
 * 根据Headers Accept返回内容
 */
const Koa = require('koa');
const app = new Koa();
client.connect();

const main = async ctx => {
  ctx.response.type = 'html';

  let res = await client.query('SELECT * FROM test.mytable order by date');
  // console.log(err, res);
  for (let index = 0; index < res.rows.length; index++) {
    const element = res.rows[index];
    element.serie = 'London';
    element.x = '20' + formatDate(new Date(element.date), 'mm-dd');
    element.y = parseInt(element.val);
  }
  let data = JSON.stringify(res.rows);
  console.log(res.rows);

  ctx.response.body = `
     <!DOCTYPE html>
     <html lang="en">
       <head>
         <meta charset="UTF-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
         <meta http-equiv="X-UA-Compatible" content="ie=edge" />
         <title>ChartCube</title>
         <script src="https://gw.alipayobjects.com/os/lib/antv/g2plot/0.11.3/dist/g2plot.js"></script>
       </head>
       <body>
       <div id="app"></div>
       <script>
         const container = document.getElementById('app');
         const data = ${data};
         const config = {
           "title": {
             "visible": true,
             "text": "折线图"
           },
           "description": {
             "visible": true,
             "text": "一个简单的折线图"
           },
           "padding": "auto",
           "legend": {
             "visible": true,
             "position": "top-left",
             "wordSpacing": 4,
             "flipPage": false
           },
           "tooltip": {
             "visible": false,
             "shared": true,
             "crosshairs": {
               "type": "y"
             }
           },
           "xAxis": {
             "visible": true,
             "autoHideLabel": false,
             "autoRotateLabel": false,
             "autoRotateTitle": false,
             "grid": {
               "visible": false
             },
             "line": {
               "visible": false
             },
             "tickLine": {
               "visible": true
             },
             "label": {
               "visible": true
             },
             "title": {
               "visible": false,
               "offset": 12,
               "title": "日期"
             }
           },
           "yAxis": {
             "visible": true,
             "autoHideLabel": false,
             "autoRotateLabel": false,
             "autoRotateTitle": true,
             "grid": {
               "visible": true
             },
             "line": {
               "visible": false
             },
             "tickLine": {
               "visible": false
             },
             "label": {
               "visible": true
             },
             "title": {
               "visible": false,
               "offset": 12,
               "title": "数值"
             }
           },
           "label": {
             "visible": false,
             "type": "point"
           },
           "connectNulls": false,
           "smooth": false,
           "lineSize": 2,
           "lineStyle": {
             "lineJoin": "round",
             "lineCap": "round"
           },
           "point": {
             "visible": false,
             "size": 3,
             "shape": "circle",
             "style": {
               "stroke": "#fff"
             }
           },
           "forceFit": false,
           "animation": true,
           "width": 560,
           "height": 376,
           "xField": "x",
           "yField": "y",
           "seriesField": "serie",
           "color": null
         }
         const plot = new g2plot.Line(container, {
           data,
           ...config,
         });
         plot.render();
       </script>
       </body>
     </html>
 
     `;
  // client.end();
};

app.use(main);
app.listen(3000);
