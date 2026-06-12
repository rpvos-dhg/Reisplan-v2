var CACHE='reisgids-v1';
var ASSETS=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png'];
var IMGS=["https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Balea_lake_and_chalet.JPG/1200px-Balea_lake_and_chalet.JPG", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Transalpina,_drumul_regelui_2.JPG/1200px-Transalpina,_drumul_regelui_2.JPG", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Tereziamijn_Salina_Turda.jpg/1200px-Tereziamijn_Salina_Turda.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/BisericaEpiscopalaCurteaDeArges.JPG/1200px-BisericaEpiscopalaCurteaDeArges.JPG", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Avenida_de_la_Uni%C3%B3n,_Bucarest,_Ruman%C3%ADa,_2016-05-29,_DD_57.jpg/1200px-Avenida_de_la_Uni%C3%B3n,_Bucarest,_Ruman%C3%ADa,_2016-05-29,_DD_57.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Viscri_fortified_church.jpg/1200px-Viscri_fortified_church.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Clock_Tower,_Stundturm,_Sighisoara_(Sch%C3%A4%C3%9Fburg),_Romania,_Rum%C3%A4nien20120922.jpg/1200px-Clock_Tower,_Stundturm,_Sighisoara_(Sch%C3%A4%C3%9Fburg),_Romania,_Rum%C3%A4nien20120922.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Hurezi_(14409373470).jpg/1200px-Hurezi_(14409373470).jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Wide_view_over_the_northern_Transfagarasan.jpg/1200px-Wide_view_over_the_northern_Transfagarasan.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Biertan_-_Ansamblul_bisericii_evanghelice_fortificate_-_vedere_panoramica_2.jpg/1200px-Biertan_-_Ansamblul_bisericii_evanghelice_fortificate_-_vedere_panoramica_2.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Sala_Dietei_-_Castelul_Corvinilor.JPG/1200px-Sala_Dietei_-_Castelul_Corvinilor.JPG", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Castelul_Bran_-_2018.jpg/1200px-Castelul_Bran_-_2018.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Fortified_church_in_Prejmer,_Bra%C8%99ov_01.jpg/1200px-Fortified_church_in_Prejmer,_Bra%C8%99ov_01.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Sibiu_panorama.jpg/1200px-Sibiu_panorama.jpg"];
self.addEventListener('install',function(e){
 e.waitUntil(caches.open(CACHE).then(function(c){
  return Promise.all(
   ASSETS.concat(IMGS).map(function(u){
    return c.add(new Request(u,{mode:u.indexOf('http')===0?'cors':'same-origin'})).catch(function(){});
   })
  );
 }).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(e){
 e.waitUntil(caches.keys().then(function(ks){
  return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
 }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
 if(e.request.method!=='GET')return;
 e.respondWith(
  caches.match(e.request,{ignoreSearch:false}).then(function(hit){
   if(hit)return hit;
   return fetch(e.request).then(function(res){
    if(res&&res.ok){
     var copy=res.clone();
     caches.open(CACHE).then(function(c){c.put(e.request,copy);});
    }
    return res;
   }).catch(function(){
    if(e.request.mode==='navigate')return caches.match('./index.html');
   });
  })
 );
});
