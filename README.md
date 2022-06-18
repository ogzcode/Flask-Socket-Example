<h1>CSS Position Özelliği</h1>
<p>
Nesneler genelde sayfa içeriside birbirlerinin konumlarına bağlı olarak normal akış içerisindedirler.
Css <strong>position</strong> özelliği ise nesneleri konumlandırmak için kullandığımız bir başka css özelliğidir.
Bu belgede <strong>position</strong> özelliğinin 4 değerini ve örneklerini vermeye çalışacağım.
</p>
<hr>
<h3><strong>position: absolute</strong></h3>
<p>
Absolute değeri bir nesneyi <strong>normal akıştan çıkmasını sağlar</strong> ve diğer nesneler uygulanan nesnenin yerini doldurur.top, left, bottom, right gibi özelliklerle de nesneyi konumlandırabiliriz.Bu özellik eğer position:relative değerine sabip bir üst nesnenin çocuk nesnesi ise üst nesneye göre konumlanır aksi halde body ye göre konumlanır. 
</p>
Örnek Çalışma =>
Absolute Link: https://codepen.io/ogzCode/pen/NWyJdPm<br>
<hr>
<h3><strong>position:fixed</strong></h3>
<p>
Sayfanın görünür alanı değişse dahi belli bir konumda sabit kalan nesneleri konumlandırmak için kullanılır.Yani kaydırma çubukları ile sayfayı kaydırsak dahi sabit kalmasını istediğimiz nesne yerinden hareket etmez.
</p>
Örnek Çalışma => 
Fixed Link: https://codepen.io/ogzCode/pen/OJQqWVr<br>
<hr>
<h3><strong>position: relative</strong></h3>
<p>
Bu değer sayesinde nesne sayfa içerisindeki normal akıştan çıkmaz ama top, left, right, bottom gibi değerler ile nesneyi normal akış içerisinde konumlandırabiliriz.Nesne normal akıştaki yerinden itibaren konumlandırılır.
</p>
Örnek Çalışma => 
Relative Link: https://codepen.io/ogzCode/pen/poaYRgv<br>
<hr>
<h3><strong>position: sticky</strong></h3>
<p>
Bu değer uygulanan nesnenin istenilen konuma geldiğinde nesnenin o konumda sabitlenmesini sağlar.Örneğin top: 0 olduğunda nesnenin sayfanın yukarısına sabitlenmesini sağlayabiliriz.
</p>
Örnek Çalışma => 
Sticky Link: https://codepen.io/ogzCode/pen/BaYbpjM<br>